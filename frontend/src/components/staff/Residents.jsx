import { useEffect, useState } from 'react';
import axios from 'axios';

function Resident() {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/added-resisdents');
        setResidents(response.data.data.addedResidents || []);
        console.log(response.data.data.addedResidents);
      } catch (err) {
        setError(`Error fetching resident data: ${err.message}`);
      }
    };
    fetchResidents();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center font-semibold mt-6">{error}</p>;
  }

  if (residents.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No Resident Data Available.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen py-10 px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12 tracking-wide">Resident Details</h2>
        
        {residents.map((resident, index) => (
          <div
            key={index}
            className={`mb-12 p-8 rounded-2xl shadow-lg transform transition-transform duration-300 ${
              index % 2 === 0 ? 'bg-white hover:shadow-xl' : 'bg-gray-50 hover:shadow-xl'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Personal Information</h3>
                <p><span className="font-semibold">First Name:</span> {resident.first_name}</p>
                <p><span className="font-semibold">Last Name:</span> {resident.last_name}</p>
                <p><span className="font-semibold">Date of Birth:</span> {new Date(resident.date_of_birth).toLocaleDateString()}</p>
                <p><span className="font-semibold">Gender:</span> {resident.gender}</p>
                <p><span className="font-semibold">Blood Type:</span> {resident.bloodType}</p>
                <p><span className="font-semibold">Mobility Status:</span> {resident.mobilityStatus}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Contact Information</h3>
                <p><span className="font-semibold">Email:</span> {resident.email}</p>
                <p><span className="font-semibold">Phone:</span> {resident.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-900 mb-4">Health Information</h3>
                <p><span className="font-semibold">Health Conditions:</span> {resident.healthConditions?.length > 0 ? resident.healthConditions.join(', ') : 'None'}</p>
                <p><span className="font-semibold">Allergies:</span> {resident.allergies?.length > 0 ? resident.allergies.join(', ') : 'None'}</p>
                <p><span className="font-semibold">Dietary Preferences:</span> {resident.dietaryPreferences?.length > 0 ? resident.dietaryPreferences.join(', ') : 'None'}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-purple-900 mb-4">Care Plan</h3>
                <p><span className="font-semibold">Special Instructions:</span> {resident.carePlan?.specialInstructions || 'No instructions available'}</p>
                <p><span className="font-semibold">Last Check-In:</span> {resident.lastCheckIn ? new Date(resident.lastCheckIn).toLocaleString() : 'No recent check-in'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Family Contacts</h3>
              {resident.familyContacts && resident.familyContacts.length > 0 ? (
                resident.familyContacts.map((contact, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
                    <p><span className="font-semibold">Name:</span> {contact.name}</p>
                    <p><span className="font-semibold">Relationship:</span> {contact.relationship}</p>
                    <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
                    <p><span className="font-semibold">Email:</span> {contact.email}</p>
                  </div>
                ))
              ) : (
                <p>No family contacts available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resident;
