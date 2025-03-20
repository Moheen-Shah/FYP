import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function UserDetails({ staffId, onBack }) {
  const [staffDetails, setStaffDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
        setStaffDetails(response.data.data.staff);
      } catch (err) {
        setError('Failed to load staff details.' + err);
      }
    };
    fetchDetails();
  }, [staffId]);

  return (
    <div className="p-10 bg-gray-50 shadow-2xl rounded-2xl border border-gray-200 max-w-2xl mx-auto my-10">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {staffDetails ? (
        <>
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6 border-b-2 border-blue-100 pb-3">{staffDetails.firstName} {staffDetails.lastName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Basic Information */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Basic Information</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">Date of Birth:</span> {new Date(staffDetails.dateOfBirth).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Gender:</span> {staffDetails.gender}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Contact Number:</span> {staffDetails.contactNumber}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Email:</span> {staffDetails.email}</p>
            </div>

            {/* Address */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Address</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">Street:</span> {staffDetails.address.street}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">City:</span> {staffDetails.address.city}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">State:</span> {staffDetails.address.state}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Zip Code:</span> {staffDetails.address.zipCode}</p>
            </div>

            {/* Employment Details */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Employment Details</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">Position:</span> {staffDetails.position}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Department:</span> {staffDetails.department}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Date of Joining:</span> {new Date(staffDetails.dateOfJoining).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Employment Type:</span> {staffDetails.employmentType}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Shift Timing:</span> {staffDetails.shiftTiming}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Salary:</span> ${staffDetails.salary.toLocaleString()}</p>
            </div>

            {/* Qualifications & Experience */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Qualifications & Experience</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">Qualifications:</span> {staffDetails.qualifications.join(', ')}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Years of Experience:</span> {staffDetails.yearsOfExperience}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Specializations:</span> {staffDetails.specializations.join(', ') || 'None'}</p>
            </div>

            {/* Identification & Verification */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Identification & Verification</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">National ID:</span> {staffDetails.nationalID}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Background Check:</span> {staffDetails.backgroundCheck ? 'Completed' : 'Pending'}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Medical Clearance:</span> {staffDetails.medicalClearance ? 'Cleared' : 'Pending'}</p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-700 mb-2">Emergency Contact</h3>
              <p className="text-sm text-gray-700"><span className="font-semibold">Name:</span> {staffDetails.emergencyContact.name}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Relationship:</span> {staffDetails.emergencyContact.relationship}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Contact Number:</span> {staffDetails.emergencyContact.contactNumber}</p>
            </div>
          </div>

          <button 
            onClick={onBack} 
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Go Back to Staff List
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

UserDetails.propTypes = {
  staffId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default UserDetails;
