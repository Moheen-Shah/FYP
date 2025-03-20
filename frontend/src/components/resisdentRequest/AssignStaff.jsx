import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function AssignStaff({ residentId, onBack }) {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        // Fetch all staff members
        const staffResponse = await axios.get("http://localhost:3000/api/v1/staff/");
        const allStaffMembers = staffResponse.data.data.staffMembers;

        // Fetch the resident's assigned staff members
        const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
        const assignedStaff = residentResponse.data.data.resident.assigned_staff;

        // Filter out staff members already assigned to the resident
        const unassignedStaffMembers = allStaffMembers.filter(
          (staff) => !assignedStaff.includes(staff._id)
        );

        setStaffMembers(unassignedStaffMembers);
      } catch (error) {
        console.error("Error fetching staff members:", error);
        setError("Failed to load staff members.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, [residentId]);

  const handleAssign = async (staffId) => {
    try {
      // Fetch the staff member's current assigned residents
      const staffResponse = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
      const currentAssignedResidents = staffResponse.data.data.staff.assigned_residents;
      const updatedAssignedResidents = [...currentAssignedResidents, residentId];

      // Update the staff member to include the new resident
      await axios.patch(
        `http://localhost:3000/api/v1/staff/update-staff/${staffId}`,
        {
          assigned_residents: updatedAssignedResidents,
        }
      );

      // Fetch the resident's current assigned staff
      const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
      const currentAssignedStaff = residentResponse.data.data.resident.assigned_staff;
      const updatedAssignedStaff = [...currentAssignedStaff, staffId];

      // Update the resident to include the new staff member
      await axios.patch(
        `http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`,
        {
          assigned_staff: updatedAssignedStaff,
        }
      );

      // Remove the assigned staff from the local state
      setStaffMembers((prevStaffMembers) =>
        prevStaffMembers.filter((staff) => staff._id !== staffId)
      );

      alert("Staff successfully assigned to the resident.");
    } catch (error) {
      console.error("Error assigning staff:", error);
      alert("Failed to assign staff.");
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
        Assign Staff to Resident
      </h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center text-gray-500">Loading staff members...</div>
      ) : (
        <div className="space-y-6 max-h-80 overflow-y-auto">
          {staffMembers.length > 0 ? (
            staffMembers.map((staff) => (
              <div
                key={staff._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {staff.firstName} {staff.lastName}
                </h3>
                <p className="text-gray-600">
                  Position: <span className="font-medium">{staff.position}</span>
                </p>
                <p className="text-gray-600">
                  Department: <span className="font-medium">{staff.department}</span>
                </p>
                <p className="text-gray-600">
                  Contact: <span className="font-medium">{staff.contactNumber}</span>
                </p>
                <button
                  onClick={() => handleAssign(staff._id)}
                  className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105"
                >
                  Assign
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No staff members found.</p>
          )}
        </div>
      )}
    </div>
  );
}

// PropTypes validation
AssignStaff.propTypes = {
  residentId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default AssignStaff;