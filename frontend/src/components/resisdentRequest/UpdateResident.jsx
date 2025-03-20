import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function UpdateResident({ residentId, onBack }) {
  const [residentData, setResidentData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    bloodType: '',
    mobilityStatus: '',
    email: '',
    phone: '',
    healthConditions: [],
    allergies: [],
    dietaryPreferences: [],
    carePlan: {
      specialInstructions: '',
    },
    assigned_doctor: [],
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
        const fetchedData = response.data.data.resident;

        const formattedDateOfBirth = fetchedData.date_of_birth
          ? new Date(fetchedData.date_of_birth).toISOString().split('T')[0]
          : '';

        setResidentData({
          ...fetchedData,
          date_of_birth: formattedDateOfBirth,
        });
      } catch (error) {
        console.error('Failed to fetch resident data:', error);
      }
    };

    fetchResidentData();
  }, [residentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResidentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setResidentData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setResidentData((prev) => ({
      ...prev,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`, residentData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to update resident:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Update Resident</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Basic Information */}
        <label className="text-gray-700 font-medium">
          First Name
          <input
            type="text"
            name="first_name"
            value={residentData.first_name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Last Name
          <input
            type="text"
            name="last_name"
            value={residentData.last_name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Gender
          <select
            name="gender"
            value={residentData.gender}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="text-gray-700 font-medium">
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={residentData.date_of_birth}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Blood Type
          <input
            type="text"
            name="bloodType"
            value={residentData.bloodType}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Mobility Status
          <input
            type="text"
            name="mobilityStatus"
            value={residentData.mobilityStatus}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Contact Details */}
        <label className="text-gray-700 font-medium">
          Email
          <input
            type="email"
            name="email"
            value={residentData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Phone
          <input
            type="text"
            name="phone"
            value={residentData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Health Information */}
        <label className="text-gray-700 font-medium col-span-2">
          Health Conditions (comma-separated)
          <input
            type="text"
            value={residentData.healthConditions.join(', ')}
            onChange={(e) => handleArrayChange(e, 'healthConditions')}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium col-span-2">
          Allergies (comma-separated)
          <input
            type="text"
            value={residentData.allergies.join(', ')}
            onChange={(e) => handleArrayChange(e, 'allergies')}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium col-span-2">
          Dietary Preferences (comma-separated)
          <input
            type="text"
            value={residentData.dietaryPreferences.join(', ')}
            onChange={(e) => handleArrayChange(e, 'dietaryPreferences')}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Care Plan */}
        <label className="text-gray-700 font-medium col-span-2">
          Care Plan - Special Instructions
          <textarea
            value={residentData.carePlan.specialInstructions}
            onChange={(e) => handleNestedChange(e, 'carePlan', 'specialInstructions')}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md shadow-md"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-2 rounded-md shadow-md"
        >
          Back
        </button>
      </div>

      {isSuccess && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative">
          <span>Resident updated successfully!</span>
          <button
            className="absolute top-1 right-2 text-green-700"
            onClick={() => setIsSuccess(false)}
          >
            Close
          </button>
        </div>
      )}
    </form>
  );
}

UpdateResident.propTypes = {
  residentId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UpdateResident;
