import { useEffect, useState } from 'react';
import axios from 'axios';

function AllActivities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/activities');
        setActivities(response.data.data.activity);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchActivities();
  }, []);

  const deleteActivity = async (activityId, staffId) => {
    try {
      // Delete the activity
      await axios.delete(`http://localhost:3000/api/v1/activities/delete-activity/${activityId}`);

      // After deletion, update the staff's activities field if necessary
      if (staffId) {
        await axios.patch(`http://localhost:3000/api/v1/staff/update-staff/${staffId}`, {
          activities: null
        });
      }

      // Update state to remove the deleted activity from the list
      setActivities((prevActivities) => prevActivities.filter((activity) => activity._id !== activityId));
    } catch (err) {
      setError(`Failed to delete activity: ${err.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-100 to-green-50 min-h-screen py-10 px-6">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-green-800 tracking-wide">All Activities</h2>

      {error && <p className="text-red-600 text-center mb-4 font-semibold">Error fetching activities: {error}</p>}

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {activities.map((activity) => (
          <div key={activity._id} className="bg-white shadow-xl rounded-xl p-6 flex flex-col space-y-4 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-semibold text-green-900">{activity.name}</h3>
              <p className="text-sm text-gray-500">ID: {activity._id}</p>
            </div>

            <div className="text-gray-700 space-y-2">
              <p className="font-semibold">Description:</p>
              <p>{activity.description}</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => deleteActivity(activity._id, activity.staffId)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 w-full"
              >
                Delete Activity
              </button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default AllActivities;
