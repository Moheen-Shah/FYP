import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function UpdateStaff({ staffId, onBack }) {
  const [staffData, setStaffData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    position: '',
    department: '',
    dateOfJoining: '',
    employmentType: '',
    shiftTiming: '',
    salary: '',
    qualifications: [''],
    yearsOfExperience: '',
    specializations: [''],
    nationalID: '',
    backgroundCheck: false,
    medicalClearance: false,
    emergencyContact: {
      name: '',
      relationship: '',
      contactNumber: '',
    },
    activities: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
        const fetchedData = response.data.data.staff;

        setStaffData({
          ...fetchedData,
          dateOfBirth: fetchedData.dateOfBirth
            ? new Date(fetchedData.dateOfBirth).toISOString().split('T')[0]
            : '',
          dateOfJoining: fetchedData.dateOfJoining
            ? new Date(fetchedData.dateOfJoining).toISOString().split('T')[0]
            : '',
        });
      } catch (error) {
        console.error('Failed to fetch staff data:', error);
      }
    };

    fetchStaffData();
  }, [staffId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // const handleCheckboxChange = (e, field) => {
  //   setStaffData((prev) => ({
  //     ...prev,
  //     [field]: e.target.checked,
  //   }));
  // };

  // const handleArrayChange = (e, field, index) => {
  //   const { value } = e.target;
  //   setStaffData((prev) => {
  //     const updatedArray = [...prev[field]];
  //     updatedArray[index] = value;
  //     return {
  //       ...prev,
  //       [field]: updatedArray,
  //     };
  //   });
  // };

  // const handleAddToArray = (field) => {
  //   setStaffData((prev) => ({
  //     ...prev,
  //     [field]: [...prev[field], ''],
  //   }));
  // };

  // const handleRemoveFromArray = (field, index) => {
  //   setStaffData((prev) => ({
  //     ...prev,
  //     [field]: prev[field].filter((_, i) => i !== index),
  //   }));
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/v1/staff/update-staff/${staffId}`, staffData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to update staff:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-10 bg-white shadow-md rounded-lg max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Update Staff</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Basic Information */}
        <label className="text-gray-700 font-medium">
          First Name
          <input
            type="text"
            name="firstName"
            value={staffData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Last Name
          <input
            type="text"
            name="lastName"
            value={staffData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Date of Birth
          <input
            type="date"
            name="dateOfBirth"
            value={staffData.dateOfBirth}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Gender
          <select
            name="gender"
            value={staffData.gender}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Contact Details */}
        <label className="text-gray-700 font-medium">
          Contact Number
          <input
            type="text"
            name="contactNumber"
            value={staffData.contactNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>
        <label className="text-gray-700 font-medium">
          Email
          <input
            type="email"
            name="email"
            value={staffData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Address */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-800">Address</h3>
          <label className="text-gray-700 font-medium">
            Street
            <input
              type="text"
              value={staffData.address.street}
              onChange={(e) => handleNestedChange(e, 'address', 'street')}
              className="mt-1 p-2 border rounded-lg w-full"
            />
          </label>
          <label className="text-gray-700 font-medium">
            City
            <input
              type="text"
              value={staffData.address.city}
              onChange={(e) => handleNestedChange(e, 'address', 'city')}
              className="mt-1 p-2 border rounded-lg w-full"
            />
          </label>
          <label className="text-gray-700 font-medium">
            State
            <input
              type="text"
              value={staffData.address.state}
              onChange={(e) => handleNestedChange(e, 'address', 'state')}
              className="mt-1 p-2 border rounded-lg w-full"
            />
          </label>
          <label className="text-gray-700 font-medium">
            Zip Code
            <input
              type="text"
              value={staffData.address.zipCode}
              onChange={(e) => handleNestedChange(e, 'address', 'zipCode')}
              className="mt-1 p-2 border rounded-lg w-full"
            />
          </label>
        </div>

        {/* Additional Information */}
        <label className="text-gray-700 font-medium">
          Position
          <input
            type="text"
            name="position"
            value={staffData.position}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full"
          />
        </label>

        {/* Emergency Contact */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-800">Emergency Contact</h3>
          <label className="text-gray-700 font-medium">
            Name
            <input
              type="text"
              value={staffData.emergencyContact.name}
              onChange={(e) => handleNestedChange(e, 'emergencyContact', 'name')}
              className="mt-1 p-2 border rounded-lg w-full"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md"
      >
        Update
      </button>
    </form>
  );
}

UpdateStaff.propTypes = {
  staffId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UpdateStaff;
