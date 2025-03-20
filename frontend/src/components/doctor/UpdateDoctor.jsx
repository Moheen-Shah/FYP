import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function UpdateDoctor({ doctorId, onBack }) {
  const [doctorData, setDoctorData] = useState({
    name: '',
    gender: '',
    date_of_birth: '',
    contact_details: {
      email: '',
      phone: '',
      address: '',
    },
    professional_details: {
      specialization: '',
      qualifications: '',
      experience: '',
      availability: '',
    },
    system_details: {
      username: '',
      role: 'doctor',
    },
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`);
        const fetchedData = response.data.data.doctor;

        const formattedDateOfBirth = fetchedData.date_of_birth
          ? new Date(fetchedData.date_of_birth).toISOString().split('T')[0]
          : '';

        setDoctorData({
          ...fetchedData,
          date_of_birth: formattedDateOfBirth,
        });
      } catch (error) {
        console.error('Failed to fetch doctor data:', error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/doctors/update-doctor/${doctorId}`, doctorData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to update doctor:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Update Doctor</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Basic Information */}
        <label className="text-gray-700 font-medium">
          Name
          <input
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Gender
          <select
            name="gender"
            value={doctorData.gender}
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
            value={doctorData.date_of_birth}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Contact Details */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-800">Contact Details</h3>
        </div>
        <label className="text-gray-700 font-medium">
          Email
          <input
            type="email"
            value={doctorData.contact_details.email}
            onChange={(e) => handleNestedChange(e, 'contact_details', 'email')}
            placeholder="Email"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Phone
          <input
            type="text"
            value={doctorData.contact_details.phone}
            onChange={(e) => handleNestedChange(e, 'contact_details', 'phone')}
            placeholder="Phone"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium col-span-2">
          Address
          <input
            type="text"
            value={doctorData.contact_details.address}
            onChange={(e) => handleNestedChange(e, 'contact_details', 'address')}
            placeholder="Address"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Professional Details */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-800">Professional Details</h3>
        </div>
        <label className="text-gray-700 font-medium">
          Specialization
          <input
            type="text"
            value={doctorData.professional_details.specialization}
            onChange={(e) => handleNestedChange(e, 'professional_details', 'specialization')}
            placeholder="Specialization"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Qualifications
          <input
            type="text"
            value={doctorData.professional_details.qualifications}
            onChange={(e) => handleNestedChange(e, 'professional_details', 'qualifications')}
            placeholder="Qualifications"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Experience (years)
          <input
            type="number"
            value={doctorData.professional_details.experience}
            onChange={(e) => handleNestedChange(e, 'professional_details', 'experience')}
            placeholder="Experience (years)"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium col-span-2">
          Availability
          <input
            type="text"
            value={doctorData.professional_details.availability}
            onChange={(e) => handleNestedChange(e, 'professional_details', 'availability')}
            placeholder="Availability"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* System Details */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-800">System Details</h3>
        </div>
        <label className="text-gray-700 font-medium">
          Username
          <input
            type="text"
            value={doctorData.system_details.username}
            onChange={(e) => handleNestedChange(e, 'system_details', 'username')}
            placeholder="Username"
            required
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Role
          <input
            type="text"
            value={doctorData.system_details.role}
            readOnly
            className="mt-1 p-2 border rounded-lg w-full bg-gray-100"
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
          <span>Doctor updated successfully!</span>
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

UpdateDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UpdateDoctor;
