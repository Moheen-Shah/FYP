import { useState } from 'react';
import axios from 'axios';

function AddDoctor() {
  const [formData, setFormData] = useState({
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
      password: '',
    },
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleInputChange = (e, section, field) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/v1/doctors/signup', formData);

      setIsPopupVisible(true); // Show popup on successful submission

      // Reset form fields
      setFormData({
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
          password: '',
        },
      });
    } catch (err) {
      alert(`Failed to add doctor: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen py-10 px-6">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-800 tracking-wide">Add Doctor</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 space-y-6"
      >
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange(e, null, 'name')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Doctor's name"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange(e, null, 'gender')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => handleInputChange(e, null, 'date_of_birth')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Contact Details</h3>

          <label className="block text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={formData.contact_details.email}
            onChange={(e) => handleInputChange(e, 'contact_details', 'email')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Email address"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Phone</label>
          <input
            type="text"
            value={formData.contact_details.phone}
            onChange={(e) => handleInputChange(e, 'contact_details', 'phone')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Phone number"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Address</label>
          <input
            type="text"
            value={formData.contact_details.address}
            onChange={(e) => handleInputChange(e, 'contact_details', 'address')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Address"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Professional Details</h3>

          <label className="block text-lg font-semibold text-gray-700">Specialization</label>
          <input
            type="text"
            value={formData.professional_details.specialization}
            onChange={(e) => handleInputChange(e, 'professional_details', 'specialization')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Specialization"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Qualifications</label>
          <input
            type="text"
            value={formData.professional_details.qualifications}
            onChange={(e) => handleInputChange(e, 'professional_details', 'qualifications')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Qualifications"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Experience</label>
          <input
            type="number"
            value={formData.professional_details.experience}
            onChange={(e) => handleInputChange(e, 'professional_details', 'experience')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Years of experience"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Availability</label>
          <input
            type="text"
            value={formData.professional_details.availability}
            onChange={(e) => handleInputChange(e, 'professional_details', 'availability')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Availability"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">System Details</h3>

          <label className="block text-lg font-semibold text-gray-700">Username</label>
          <input
            type="text"
            value={formData.system_details.username}
            onChange={(e) => handleInputChange(e, 'system_details', 'username')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Username"
            required
          />

          <label className="block text-lg font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={formData.system_details.password}
            onChange={(e) => handleInputChange(e, 'system_details', 'password')}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200 w-full"
        >
          Add Doctor
        </button>
      </form>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-bold text-green-600 mb-4">Success!</h3>
            <p>Doctor added successfully!</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDoctor;
