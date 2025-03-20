import { useEffect, useState } from 'react';
import axios from 'axios';
import AssignActivity from './AssignActivity';
import UpdateStaff from './UpdateStaff';
import UserDetails from './UserDetails';

function AllStaff() {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);
  const [showAssignActivity, setShowAssignActivity] = useState(false);
  const [showUpdateStaff, setShowUpdateStaff] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/staff');
        setStaff(response.data.data.staffMembers);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStaff();
  }, []);

  const deleteStaff = async (staffId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
      const assignedResidents = response.data.data.staff.assigned_residents;
      for (const residentId of assignedResidents) {
        const residentResponce = await axios.get(
          `http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`
        );
        const assignedStaff = residentResponce.data.data.resident.assigned_staff;
        const updatedStaff = assignedStaff.filter((id) => id !== staffId);
          console.log(updatedStaff)
        await axios.patch(`http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`, {
          assigned_staff: updatedStaff,
        });
      }




      await axios.delete(`http://localhost:3000/api/v1/staff/delete-staff/${staffId}`);

     

      setStaff((prevStaff) => prevStaff.filter((member) => member._id !== staffId));
      alert('staff deleted successfully, and assigned residents updated.');
    } catch (err) {
      setError(`Failed to delete staff member: ${err.message}`);
    }
  };

  const handleAssignButtonClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowAssignActivity(true);
    setShowUpdateStaff(false);
    setShowDetails(false);
  };

  const handleUpdateButtonClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowAssignActivity(false);
    setShowUpdateStaff(true);
    setShowDetails(false);
  };

  const handleDetailsButtonClick = (staffId) => {
    setSelectedStaffId(staffId);
    setShowAssignActivity(false);
    setShowUpdateStaff(false);
    setShowDetails(true);
  };

  return (
    <div>
      {showAssignActivity ? (
        <AssignActivity staffId={selectedStaffId} onBack={() => setShowAssignActivity(false)} />
      ) : showUpdateStaff ? (
        <UpdateStaff staffId={selectedStaffId} onBack={() => setShowUpdateStaff(false)} />
      ) : showDetails ? (
        <UserDetails staffId={selectedStaffId} onBack={() => setShowDetails(false)} />
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10 px-6">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-wide">Staff Directory</h2>

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
                  <button onClick={() => deleteStaff(member._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Delete
                  </button>
                  <button onClick={() => handleAssignButtonClick(member._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Assign
                  </button>
                  <button onClick={() => handleUpdateButtonClick(member._id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Update
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

export default AllStaff;
