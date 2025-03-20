import { useEffect, useState } from 'react';
import axios from 'axios';

function ResidentRequest() {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/resisdents');
        setResidents(response.data.data.resisdents);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchResidents();
  }, []);

  const handleAddResident = async (resident) => {
    try {
      const data = JSON.stringify(resident);
      await axios.post('http://localhost:3000/api/v1/added-resisdents/add-resisdent', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(`${resident.first_name} added`);
      await axios.delete(`http://localhost:3000/api/v1/resisdents/delete-resisdent/${resident._id}`);
      setResidents((prevResidents) => prevResidents.filter((r) => r._id !== resident._id));
    } catch (err) {
      setError(`Error processing resident ${resident.first_name}: ${err.message}`);
      alert('Resident with this email already exists');
    }
  };

  const handleDeleteResident = async (residentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/resisdents/delete-resisdent/${residentId}`);
      setResidents((prevResidents) => prevResidents.filter((r) => r._id !== residentId));
      alert('Resident deleted successfully');
    } catch (err) {
      setError(`Error deleting resident: ${err.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen py-4 px-2">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-900 tracking-wide">Resident Requests</h2>

      {error && <p className="text-red-600 text-center mb-4 font-semibold">Error: {error}</p>}

      {residents.length === 0 ? (
        <h3 className="text-center text-lg font-semibold text-gray-700">No pending requests</h3>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4 max-h-[60vh] overflow-y-auto">
          {residents.map((resident) => (
            <div key={resident._id} className="bg-white shadow rounded-lg p-4 transform transition-transform">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-blue-800">{resident.first_name} {resident.last_name}</h3>
                <p className="text-xs text-gray-500">DOB: {new Date(resident.date_of_birth).toLocaleDateString()}</p>
              </div>

              <div className="text-gray-700 space-y-1 mb-4 text-sm">
                <p><span className="font-semibold">Email:</span> {resident.email}</p>
                <p><span className="font-semibold">Gender:</span> {resident.gender}</p>
                <p><span className="font-semibold">Phone:</span> {resident.phone}</p>
                <p><span className="font-semibold">Blood Type:</span> {resident.bloodType}</p>
                <p><span className="font-semibold">Mobility Status:</span> {resident.mobilityStatus}</p>
                <p><span className="font-semibold">Allergies:</span> {resident.allergies.join(', ')}</p>
                <p><span className="font-semibold">Dietary Preferences:</span> {resident.dietaryPreferences.join(', ')}</p>
              </div>

              {resident.emergencyContact && (
                <div className="text-xs text-gray-600">
                  <p><span className="font-semibold">Emergency Contact:</span> {resident.emergencyContact.name}, {resident.emergencyContact.relationship}, {resident.emergencyContact.phone}</p>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleDeleteResident(resident._id)}
                  className="w-1/2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAddResident(resident)}
                  className="w-1/2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded transition-colors duration-200"
                >
                  Add Resident
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResidentRequest;
