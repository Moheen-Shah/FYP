import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateDoctor from './UpdateDoctor';
import DetailDoctor from './DetailDoctor';
import AssignDoctor from './AssignDoctor';

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [showUpdateDoctor, setShowUpdateDoctor] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignresisdent, setshowAssignresisdent] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/doctors');
        setDoctors(response.data.data.doctors); // Ensure `doctors` is an array
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDoctors();
  }, []);

  const deleteDoctor = async (doctorId) => {
    try {
      // Step 1: Fetch the doctor to get the "assigned_residents" field
      const doctorResponse = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`);
      const assignedResidents = doctorResponse.data.data.doctor.assigned_residents;
  
      // Step 2: Update each resident's "assigned_doctor" field
      for (const residentId of assignedResidents) {
        // Fetch the current resident's data
        const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
        const assignedDoctors = residentResponse.data.data.resident.assigned_doctor;
  
        // Remove the current doctor ID from the "assigned_doctor" field
        const updatedDoctors = assignedDoctors.filter((id) => id !== doctorId);
  
        // Update the resident's "assigned_doctor" field via API
        await axios.patch(`http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`, {
          assigned_doctor: updatedDoctors,
        });
      }
  
      // Step 3: Delete the doctor after updating all residents
      await axios.delete(`http://localhost:3000/api/v1/doctors/delete-doctor/${doctorId}`);
  
      // Step 4: Update the local state to reflect the deletion
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
  
      alert("Doctor deleted successfully, and assigned residents updated.");
    } catch (err) {
      setError(`Failed to delete doctor: ${err.message}`);
    }
  };
  

  const handleUpdateButtonClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowUpdateDoctor(true);
    setShowDetails(false);
    setshowAssignresisdent(false);
  };

  const handleDetailsButtonClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowUpdateDoctor(false);
    setShowDetails(true);
    setshowAssignresisdent(false);
  };

  const handleAssignButtonClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowUpdateDoctor(false);
    setShowDetails(false);
    setshowAssignresisdent(true);
  };

  return (
    <div>
      {showUpdateDoctor ? (
        <UpdateDoctor doctorId={selectedDoctorId} onBack={() => setShowUpdateDoctor(false)} />
      ) : showDetails ? (
        <DetailDoctor doctorId={selectedDoctorId} onBack={() => setShowDetails(false)} />
      ) : showAssignresisdent ? (
        <AssignDoctor doctorId={selectedDoctorId} onBack={() => setshowAssignresisdent(false)} />
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10 px-6">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-wide">Doctors Directory</h2>

          {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

          <div className="mx-auto max-w-7xl space-y-6">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-600 transition duration-300 transform hover:-translate-y-1">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{doctor.name}</h3>
                  <p className="text-gray-600 text-sm">Specialization: <span className="font-medium">{doctor.professional_details.specialization}</span></p>
                  <p className="text-gray-500 text-sm">Email: {doctor.contact_details.email}</p>
                  <p className="text-gray-500 text-sm">Phone: {doctor.contact_details.phone}</p>
                </div>

                <div className="text-sm text-gray-600 mt-4">
                  <p>Experience: {doctor.professional_details.experience} years</p>
                  <p>Availability: {doctor.professional_details.availability}</p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button onClick={() => handleDetailsButtonClick(doctor._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Details
                  </button>
                  <button onClick={() => deleteDoctor(doctor._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Delete
                  </button>
                  <button onClick={() => handleUpdateButtonClick(doctor._id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                    Update
                  </button>
                  <button onClick={() => handleAssignButtonClick(doctor._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
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

export default AllDoctors;
