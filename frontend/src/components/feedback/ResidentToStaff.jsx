
import { useEffect, useState } from 'react';
import axios from 'axios';

function ResidentToStaff() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('http://localhost:3000/api/v1/added-resisdents/');
        if (response.status === 200) {
          setResidents(response.data.data.addedResidents || []);
        } else {
          setError('Failed to fetch residents.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching residents.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Resident Details</h2>
        <div className="space-y-8">
          {residents.map((resident) => (
            <div
              key={resident._id}
              className="bg-white w-full shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                {resident.first_name} {resident.last_name}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Date of Birth:</span> {new Date(resident.date_of_birth).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Gender:</span> {resident.gender}
              </p>
             
              {resident.feedback.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-700 mb-3">Feedback:</h4>
                  <ul className="space-y-3">
                    {resident.feedback.map((feedback, index) => (
                      <li
                        key={index}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm"
                      >
                        <p className="text-blue-600 font-semibold mb-1">{feedback.name}</p>
                        <p className="text-gray-700">{feedback.message}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic">No feedback available for this resident.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResidentToStaff;