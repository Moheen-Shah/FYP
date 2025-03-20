import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

function AssignActivity({ staffId, onBack }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/activities');
        setActivities(response.data.data.activity);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Failed to load activities.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const handleAssign = async (activityId) => {
    try {
      // Fetch the staff details to check if they already have an assigned activity
      const responce = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
      const currentActivityId =responce.data.data.staff.activities;
      console.log(currentActivityId)

      // If the staff has an assigned activity, update that activity's staffId to null
      if (currentActivityId) {
        await axios.patch(`http://localhost:3000/api/v1/activities/update-activity/${currentActivityId}`, {
          staffId: null,
        });
      }
      await axios.patch(`http://localhost:3000/api/v1/activities/update-activity/${activityId}`, {
        staffId: null,
    });
      // Assign the new activity to the staff in both staff and activity collections
      await axios.post('http://localhost:3000/api/v1/staff/assign-activity', { staffId, activityId });
      await axios.patch(`http://localhost:3000/api/v1/activities/update-activity/${activityId}`, { staffId });

      alert("Activity successfully assigned to staff.");
    } catch (error) {
      console.error("Error assigning activity:", error);
      alert("Failed to assign activity.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <div className="flex items-center mb-6 cursor-pointer" onClick={onBack}>
        <ArrowLeftIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition duration-200" />
        <span className="text-gray-700 ml-2 font-semibold hover:text-gray-900 transition duration-200">Back</span>
      </div>

      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Assign Activity</h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center text-gray-500">Loading activities...</div>
      ) : (
        <div className="space-y-6 max-h-80 overflow-y-auto">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity._id} className="bg-gray-100 rounded-lg p-4 shadow-md transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <h3 className="text-lg font-bold text-gray-800">{activity.name}</h3>
                <p className="text-gray-600">Description: <span className="font-medium">{activity.description}</span></p>
                <p className="text-gray-600">Category: <span className="font-medium">{activity.category}</span></p>
                <p className="text-gray-600">Start Date: <span className="font-medium">{new Date(activity.startDate).toLocaleDateString()}</span></p>
                <p className="text-gray-600">End Date: <span className="font-medium">{new Date(activity.endDate).toLocaleDateString()}</span></p>
                <p className="text-gray-600">Time: <span className="font-medium">{activity.time}</span></p>
                <p className="text-gray-600">Staff ID: <span className="font-medium">{activity.staffId}</span></p>

                <button
                  onClick={() => handleAssign(activity._id)}
                  className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105"
                >
                  Assign
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No activities found.</p>
          )}
        </div>
      )}
    </div>
  );
}

// PropTypes validation
AssignActivity.propTypes = {
  staffId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AssignActivity;
