import { useEffect, useState } from 'react';
import axios from 'axios';

function ResidentActivities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/activities');
        setActivities(response.data.data.activity);
      } catch (err) {
        setError(`Error fetching activities: ${err.message}`);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-8">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-12 tracking-tight">Resident Activities</h2>

      {error && (
        <p className="text-center text-red-600 font-semibold mb-8">{error}</p>
      )}

      {/* Full-Width Container */}
      <div className="w-full mx-auto grid gap-8 px-4 sm:px-6 lg:px-8">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="w-full bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
          >
            {/* Title Section */}
            <div className="border-b border-gray-300 pb-4 mb-6">
              <h3 className="text-2xl font-bold text-blue-900">{activity.name}</h3>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700">Description:</h4>
              <p className="text-gray-600 mt-2 bg-blue-50 p-4 rounded-md">{activity.description}</p>
            </div>

            {/* Category and Schedule Section */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700">Category:</h4>
              <p className="text-blue-700 font-medium mt-1">{activity.category}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700">Schedule:</h4>
              <p className="text-gray-600 mt-1">
                {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Time: {activity.time}</p>
            </div>

            {/* Timestamps */}
            <div className="text-sm text-gray-500 mt-4">
              <p>Created at: {new Date(activity.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(activity.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResidentActivities;
