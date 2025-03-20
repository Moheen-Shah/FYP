import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function AssignDoctor({ doctorId, onBack }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        // Fetch all residents
        const residentResponse = await axios.get("http://localhost:3000/api/v1/added-resisdents");
        const allResidents = residentResponse.data.data.addedResidents;

        // Fetch the doctor's assigned residents
        const doctorResponse = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`);
        const assignedResidents = doctorResponse.data.data.doctor.assigned_residents;

        // Filter out residents already assigned to the doctor
        const unassignedResidents = allResidents.filter(
          (resident) => !assignedResidents.includes(resident._id)
        );

        setResidents(unassignedResidents);
      } catch (error) {
        console.error("Error fetching residents:", error);
        setError("Failed to load residents.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [doctorId]);

  const handleAssign = async (residentId) => {
    try {
      // Update the doctor to include the new resident
      const doctorResponse = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`);
      const currentAssignedResidents = doctorResponse.data.data.doctor.assigned_residents;
      const updatedAssignedResidents = [...currentAssignedResidents, residentId];

      await axios.patch(`http://localhost:3000/api/v1/doctors/update-doctor/${doctorId}`, {
        assigned_residents: updatedAssignedResidents,
      });
  
      // Update the resident to include the doctor
      const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
      const currentAssignedDoctors = residentResponse.data.data.resident.assigned_doctor;
      const updatedAssignedDoctors = [...currentAssignedDoctors, doctorId];
     console.log(updatedAssignedDoctors)
      await axios.patch(`http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`, {
        assigned_doctor: updatedAssignedDoctors,
      });
  
      // Remove the assigned resident from the local state
      setResidents((prevResidents) =>
        prevResidents.filter((resident) => resident._id !== residentId)
      );
  
      alert("Resident successfully assigned to the doctor.");
    } catch (error) {
      console.error("Error assigning resident:", error);
      alert("Failed to assign resident.");
    }
  };
  
  

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <div className="flex items-center mb-6 cursor-pointer" onClick={onBack}>
        <ArrowLeftIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition duration-200" />
        <span className="text-gray-700 ml-2 font-semibold hover:text-gray-900 transition duration-200">
          Back
        </span>
      </div>

      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Assign Resident to Doctor
      </h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center text-gray-500">Loading residents...</div>
      ) : (
        <div className="space-y-6 max-h-80 overflow-y-auto">
          {residents.length > 0 ? (
            residents.map((resident) => (
              <div
                key={resident._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {resident.first_name} {resident.last_name}
                </h3>
                <p className="text-gray-600">
                  Date of Birth:{" "}
                  <span className="font-medium">
                    {new Date(resident.date_of_birth).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600">
                  Gender: <span className="font-medium">{resident.gender}</span>
                </p>
                <p className="text-gray-600">
                  Phone: <span className="font-medium">{resident.phone}</span>
                </p>
                <p className="text-gray-600">
                  Blood Type:{" "}
                  <span className="font-medium">{resident.bloodType}</span>
                </p>
                <button
                  onClick={() => handleAssign(resident._id)}
                  className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105"
                >
                  Assign
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No unassigned residents found.</p>
          )}
        </div>
      )}
    </div>
  );
}

// PropTypes validation
AssignDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AssignDoctor;
