import { useEffect, useState } from 'react';
import axios from 'axios';

const ResidentProfile = () => {
  const [resident, setResident] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResidentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get('http://localhost:3000/api/v1/added-resisdents/added-resident-details', {
          headers: {
           Authorization: `bearer ${token}`
          }
        });

        setResident(response.data);
      } catch (error) {
        setError('Failed to fetch resident details.' + error);
      }
    };

    fetchResidentDetails();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!resident) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex mt-[200px] h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Resident Profile</h1>
        <div className="border-t-2 border-blue-500 mb-6"></div>
        
        {/* Personal Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Personal Information</h2>
            <p><span className="font-semibold">ID:</span> {resident._id}</p>
            <p><span className="font-semibold">First Name:</span> {resident.first_name}</p>
            <p><span className="font-semibold">Last Name:</span> {resident.last_name}</p>
            <p><span className="font-semibold">Date of Birth:</span> {new Date(resident.date_of_birth).toLocaleDateString()}</p>
            <p><span className="font-semibold">Gender:</span> {resident.gender}</p>
          </div>

          {/* Contact Info Section */}
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Contact Information</h2>
            <p><span className="font-semibold">Email:</span> {resident.email}</p>
            <p><span className="font-semibold">Phone:</span> {resident.phone}</p>
          </div>
        </div>

        {/* Medical Details Section */}
        <div className="p-4 bg-green-100 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Medical Information</h2>
          <p><span className="font-semibold">Blood Type:</span> {resident.bloodType}</p>
          <p><span className="font-semibold">Mobility Status:</span> {resident.mobilityStatus}</p>
          <p><span className="font-semibold">Dietary Preferences:</span> {resident.dietaryPreferences.join(', ')}</p>
          <p><span className="font-semibold">Health Conditions:</span> {resident.healthConditions.length > 0 ? resident.healthConditions.join(', ') : 'None'}</p>
          <p><span className="font-semibold">Allergies:</span> {resident.allergies.join(', ')}</p>
          <p><span className="font-semibold">Care Plan Instructions:</span> {resident.carePlan.specialInstructions || 'None'}</p>
        </div>

        {/* Family Contacts Section */}
        <div className="p-4 bg-purple-100 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-purple-900 mb-2">Emergency Contact</h2>
          {resident.familyContacts.length > 0 ? (
            <div>
              <p><span className="font-semibold">Name:</span> {resident.familyContacts[0].name}</p>
              <p><span className="font-semibold">Relationship:</span> {resident.familyContacts[0].relationship}</p>
              <p><span className="font-semibold">Phone:</span> {resident.familyContacts[0].phone}</p>
              <p><span className="font-semibold">Email:</span> {resident.familyContacts[0].email}</p>
            </div>
          ) : (
            <p>No family contact information available.</p>
          )}
        </div>

        {/* Account Details Section */}
        <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Account Details</h2>
          <p><span className="font-semibold">Created At:</span> {new Date(resident.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">Last Updated:</span> {new Date(resident.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentProfile;
