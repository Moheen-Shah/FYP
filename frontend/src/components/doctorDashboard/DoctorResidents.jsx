import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Fix import here
import FeedBack from './FeedBack';

const DoctorResidents = () => {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedResidentId, setSelectedResidentId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setDoctorId(decodedToken.id);

        // Fetch doctor details
        const doctorResponse = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${decodedToken.id}`);
        const assignedResidentIds = doctorResponse.data.data.doctor.assigned_residents;

        // Fetch each resident's details
        const residentPromises = assignedResidentIds.map((residentId) =>
          axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`)
        );

        const residentResponses = await Promise.all(residentPromises);
        const residentData = residentResponses.map((response) => response.data.data.resident);

        setResidents(residentData);
      } catch (error) {
        setError('Failed to fetch residents: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return <p className="text-center text-xl font-semibold">Loading residents...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl font-semibold">{error}</p>;
  }

  console.log(residents,doctorId)
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-white min-h-screen py-8 px-4">
      <div className="w-full max-w-7xl">
        <div className="bg-blue-500 text-white text-center py-6 rounded-t-lg">
          <h1 className="text-4xl font-bold">Assigned Residents</h1>
        </div>
        {residents.map((resident) => (
          <div
            key={resident._id}
            className="bg-white shadow-lg rounded-lg mb-6 overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                {resident.first_name} {resident.last_name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Personal Information</h3>
                  <p className="text-gray-700">
                    <span className="font-semibold">Gender:</span> {resident.gender}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Date of Birth:</span>{' '}
                    {new Date(resident.date_of_birth).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Blood Type:</span> {resident.bloodType}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Mobility Status:</span> {resident.mobilityStatus}
                  </p>
                </div>

                {/* Health Info */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Health Information</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>
                      <span className="font-semibold">Health Conditions:</span>{' '}
                      {resident.healthConditions.join(', ')}
                    </li>
                    <li>
                      <span className="font-semibold">Allergies:</span> {resident.allergies.join(', ')}
                    </li>
                    <li>
                      <span className="font-semibold">Dietary Preferences:</span>{' '}
                      {resident.dietaryPreferences.join(', ')}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feedback Button */}
              <div className="text-right">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                  onClick={() =>
                    setSelectedResidentId((prevId) => (prevId === resident._id ? null : resident._id))
                  }
                >
                  {selectedResidentId === resident._id ? 'Hide Feedback' : 'Give Feedback'}
                </button>
              </div>

              {/* Feedback Component */}
              {selectedResidentId === resident._id && (
                <div className="mt-4">
                  <FeedBack name={resident.first_name} doctorId={doctorId} />
                </div>
              )}
            </div>
            <div className="bg-gray-100 p-4 text-right">
              <p className="text-gray-500 text-sm">
                Last Check-In: {new Date(resident.lastCheckIn).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorResidents;
