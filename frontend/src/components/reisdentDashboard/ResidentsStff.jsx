

import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

import UserDetails from './UserDetails';
import FeedbackForm from './FeedbackForm';

function ResidentsStaff() {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);

 const [residentId,setResidentId] = useState(null)
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setResidentId(decodedToken.id);
        

const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${decodedToken.id}`)
const assignedStaff = residentResponse.data.data.resident.assigned_staff;
const staffPromise = assignedStaff.map((staffId) =>
    axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`)
  );
  const staffResponses = await Promise.all(staffPromise);
  const staffData = staffResponses.map((response) => response.data.data.staff);


        // const response = await axios.get('http://localhost:3000/api/v1/staff');
        setStaff(staffData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStaff();
  }, []);

 





  const handleDetailsButtonClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowDetails(true);
    setShowFeedbackForm(false);
  };

  const handleFeedbackButtonClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowDetails(false);
    setShowFeedbackForm(true);
  };

  return (
    <div>
      { showDetails ? (
        <UserDetails staffId={selectedStaffId} onBack={() => setShowDetails(false)} />
      ) : showFeedbackForm ? (
        <FeedbackForm staffId={selectedStaffId}  residentId={residentId}  onBack={() => setShowFeedbackForm(false)} />
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10 px-6">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-wide">Residents Staff Directory</h2>

          {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

          <div className="mx-auto max-w-7xl space-y-6">
            {staff.map((member) => (
              <div key={member._id} className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-600 transition duration-300 transform hover:-translate-y-1">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{member.firstName} {member.lastName}</h3>
                  <p className="text-gray-600 text-sm">Position: <span className="font-medium">{member.position}</span> - {member.department}</p>
                  <p className="text-gray-500 text-sm">Email: {member.email}</p>
                  <p className="text-gray-500 text-sm">Phone: {member.contactNumber}</p>
                </div>
                
                <div className="text-sm text-gray-600 mt-4">
                  <p>Joined: {new Date(member.dateOfJoining).toLocaleDateString()}</p>
                  <p>Employment Type: {member.employmentType}</p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button onClick={() => handleDetailsButtonClick(member._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Details
                  </button>
                  
                 
                  <button onClick={() => handleFeedbackButtonClick(member._id)} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResidentsStaff;