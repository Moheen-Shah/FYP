import { useEffect, useState } from 'react';
import axios from 'axios';

function StaffActivities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/activities'); // Adjust endpoint as needed
        setActivities(response.data.data.activity);
        console.log(response.data.data.activity)
      } catch (err) {
        setError(`Failed to fetch activities: ${err.message}`);
      }
    };
    fetchActivities();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center font-semibold mt-6">{error}</p>;
  }

  if (activities.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No Activities Available.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen py-10 px-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8 tracking-wide">Staff Activities</h2>
        
        {activities.map((activity) => (
          <div key={activity._id} className="bg-gray-50 shadow-md rounded-lg p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-blue-800">{activity.name}</h3>
              <p className="text-sm text-gray-500">ID: {activity._id}</p>
            </div>

            <div className="text-gray-700 space-y-2">
              <p><span className="font-semibold">Description:</span> {activity.description}</p>
              <p><span className="font-semibold">Category:</span> {activity.category}</p>
              <p><span className="font-semibold">Start Date:</span> {new Date(activity.startDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">End Date:</span> {new Date(activity.endDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Time:</span> {activity.time}</p>
              <p><span className="font-semibold">Staff ID:</span> {activity.staffId}</p>
            </div>

            <div className="text-gray-500 text-sm">
              <p><span className="font-semibold">Created At:</span> {new Date(activity.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold">Updated At:</span> {new Date(activity.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffActivities;
