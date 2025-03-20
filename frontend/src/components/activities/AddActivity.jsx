import { useState } from 'react';
import axios from 'axios';

function AddActivity() {
  const [activityData, setActivityData] = useState({
    name: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    time: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/activities/add-activity', activityData);
      setSuccess('Activity added successfully!');
      setError(null);
      setActivityData({ name: '', description: '', category: '', startDate: '', endDate: '', time: '' });
    } catch (err) {
      setError(`Failed to add activity: ${err.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Activity</h2>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
      {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={activityData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter activity name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter activity description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={activityData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Exercise">Exercise</option>
            <option value="Art & Craft">Art & Craft</option>
            <option value="Music">Music</option>
            <option value="Social Gathering">Social Gathering</option>
            <option value="Educational">Educational</option>
            <option value="Therapeutic">Therapeutic</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={activityData.startDate}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (optional)</label>
          <input
            type="date"
            name="endDate"
            value={activityData.endDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={activityData.time}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Activity
        </button>
      </form>
    </div>
  );
}

export default AddActivity;
