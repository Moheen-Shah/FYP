import  { useState } from 'react';
import axios from 'axios';
const AddStaff = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    password: '',
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/staff/signup', formData);
      console.log('Data submitted successfully:', response.data);
      alert('Staff member registered successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Staff Registration Form</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Street</label>
          <input
            type="text"
            value={formData.address.street}
            onChange={(e) => handleNestedChange(e, 'address', 'street')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => handleNestedChange(e, 'address', 'city')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            value={formData.address.state}
            onChange={(e) => handleNestedChange(e, 'address', 'state')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Zip Code</label>
          <input
            type="text"
            value={formData.address.zipCode}
            onChange={(e) => handleNestedChange(e, 'address', 'zipCode')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Shift Timing</label>
          <select
            name="shiftTiming"
            value={formData.shiftTiming}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Select Shift Timing</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">National ID</label>
          <input
            type="text"
            name="nationalID"
            value={formData.nationalID}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Qualifications</label>
          {formData.qualifications.map((qualification, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={qualification}
                onChange={(e) => handleArrayChange(e, 'qualifications', index)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('qualifications')}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            + Add Qualification
          </button>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Specializations</label>
          {formData.specializations.map((specialization, index) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={specialization}
                onChange={(e) => handleArrayChange(e, 'specializations', index)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('specializations')}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            + Add Specialization
          </button>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Emergency Contact</label>
          <input
            type="text"
            value={formData.emergencyContact.name}
            onChange={(e) => handleNestedChange(e, 'emergencyContact', 'name')}
            placeholder="Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
          <input
            type="text"
            value={formData.emergencyContact.relationship}
            onChange={(e) => handleNestedChange(e, 'emergencyContact', 'relationship')}
            placeholder="Relationship"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
          <input
            type="text"
            value={formData.emergencyContact.contactNumber}
            onChange={(e) => handleNestedChange(e, 'emergencyContact', 'contactNumber')}
            placeholder="Contact Number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Background Check</label>
          <input
            type="checkbox"
            name="backgroundCheck"
            checked={formData.backgroundCheck}
            onChange={(e) => setFormData((prev) => ({ ...prev, backgroundCheck: e.target.checked }))}
            className="mt-1 rounded border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Medical Clearance</label>
          <input
            type="checkbox"
            name="medicalClearance"
            checked={formData.medicalClearance}
            onChange={(e) => setFormData((prev) => ({ ...prev, medicalClearance: e.target.checked }))}
            className="mt-1 rounded border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default AddStaff;
