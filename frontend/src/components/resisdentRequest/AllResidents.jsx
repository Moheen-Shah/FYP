import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateResident from './UpdateResident'; // Component for updating a resident
import DetailResident from './DetailResident'; // Component for showing resident details
import AssignStaff from './AssignStaff'; // Component for assigning a doctor to the resident

function AllResidents() {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);
  const [showUpdateResident, setShowUpdateResident] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignStaff, setshowAssignStaff] = useState(false);
  const [selectedResidentId, setSelectedResidentId] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/added-resisdents/');
        setResidents(response.data.data.addedResidents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResidents();
  }, []);

  const deleteResident = async (residentId) => {
    try {
      const residentResponse = await axios.get(
        `http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`
      );
      const assignedDoctors = residentResponse.data.data.resident.assigned_doctor;
      const assignedtsaff = residentResponse.data.data.resident.assigned_staff;
      for (const doctorId of assignedDoctors) {
        const doctorResponse = await axios.get(
          `http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`
        );
        const assignedResidents = doctorResponse.data.data.doctor.assigned_residents;
        const updatedResidents = assignedResidents.filter((id) => id !== residentId);
          console.log(updatedResidents)
        await axios.patch(`http://localhost:3000/api/v1/doctors/update-doctor/${doctorId}`, {
          assigned_residents: updatedResidents,
        });
      }
      for (const staffId of assignedtsaff) {
        const staffResponse = await axios.get(
          `http://localhost:3000/api/v1/staff/find-staff/${staffId}`
        );
        const assignedResidents = staffResponse.data.data.staff.assigned_residents;
        const updatedResidents = assignedResidents.filter((id) => id !== residentId);
        console.log(updatedResidents)
       
        await axios.patch(`http://localhost:3000/api/v1/staff/update-staff/${staffId}`, {
          assigned_residents: updatedResidents,
        });
      }

      await axios.delete(
        `http://localhost:3000/api/v1/added-resisdents/delete-added-resident/${residentId}`
      );

      setResidents((prevResidents) => prevResidents.filter((resident) => resident._id !== residentId));
      alert('Resident deleted successfully, and assigned doctors updated.');
    } catch (err) {
      setError(`Failed to delete resident: ${err.message}`);
    }
  };

  const handleUpdateButtonClick = (residentId) => {
    setSelectedResidentId(residentId);
    setShowUpdateResident(true);
    setShowDetails(false);
    setshowAssignStaff(false);
  };

  const handleDetailsButtonClick = (residentId) => {
    setSelectedResidentId(residentId);
    setShowUpdateResident(false);
    setShowDetails(true);
    setshowAssignStaff(false);
  };

  const handleAssignButtonClick = (residentId) => {
    setSelectedResidentId(residentId);
    setShowUpdateResident(false);
    setShowDetails(false);
    setshowAssignStaff(true);
  };

  return (
    <div>
      {showUpdateResident ? (
        <UpdateResident residentId={selectedResidentId} onBack={() => setShowUpdateResident(false)} />
      ) : showDetails ? (
        <DetailResident residentId={selectedResidentId} onBack={() => setShowDetails(false)} />
      ) : showAssignStaff ? (
        <AssignStaff residentId={selectedResidentId} onBack={() => setshowAssignStaff(false)} />
      ) : (
        <div className="bg-gradient-to-br from-blue-100 to-gray-50 min-h-screen py-10 px-6">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-wide">Residents Directory</h2>

          {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

          <div className="mx-auto max-w-7xl space-y-6">
            {residents.map((resident) => (
              <div
                key={resident._id}
                className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-600 transition duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {resident.first_name} {resident.last_name}
                  </h3>
                  <p className="text-gray-600 text-sm">Email: {resident.email}</p>
                  <p className="text-gray-500 text-sm">Phone: {resident.phone}</p>
                </div>

                <div className="text-sm text-gray-600 mt-4">
                  <p>Gender: {resident.gender}</p>
                  <p>DOB: {new Date(resident.date_of_birth).toLocaleDateString()}</p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => handleDetailsButtonClick(resident._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deleteResident(resident._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateButtonClick(resident._id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleAssignButtonClick(resident._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Assign
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

export default AllResidents;
