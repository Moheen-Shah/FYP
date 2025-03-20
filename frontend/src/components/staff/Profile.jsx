import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/api/v1/staff/staff-details', {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        // Convert the response object into a single-element array
        setStaff([response.data]);
     
      } catch (error) {
        setError('Failed to fetch staff details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-4">Staff Details</h1>
        <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>

        {staff.map((member, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Staff Profile</h2>
            {/* Personal Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Personal Information</h3>
                <p><span className="font-semibold">First Name:</span> {member.firstName}</p>
                <p><span className="font-semibold">Last Name:</span> {member.lastName}</p>
                <p><span className="font-semibold">Date of Birth:</span> {new Date(member.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-semibold">Gender:</span> {member.gender}</p>
              </div>

              {/* Contact Info Section */}
              <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">Contact Information</h3>
                <p><span className="font-semibold">Email:</span> {member.email}</p>
                <p><span className="font-semibold">Phone:</span> {member.contactNumber}</p>
                <p><span className="font-semibold">Address:</span> {`${member.address.street}, ${member.address.city}, ${member.address.state} ${member.address.zipCode}`}</p>
              </div>
            </div>

            {/* Employment Details Section */}
            <div className="p-4 bg-green-100 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-semibold text-green-900 mb-2">Employment Information</h3>
              <p><span className="font-semibold">Position:</span> {member.position}</p>
              <p><span className="font-semibold">Department:</span> {member.department}</p>
              <p><span className="font-semibold">Date of Joining:</span> {new Date(member.dateOfJoining).toLocaleDateString()}</p>
              <p><span className="font-semibold">Employment Type:</span> {member.employmentType}</p>
              <p><span className="font-semibold">Shift Timing:</span> {member.shiftTiming}</p>
              <p><span className="font-semibold">Salary:</span> ${member.salary}</p>
            </div>

            {/* Qualifications and Specializations */}
            <div className="p-4 bg-purple-100 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-semibold text-purple-900 mb-2">Qualifications and Specializations</h3>
              <p><span className="font-semibold">Years of Experience:</span> {member.yearsOfExperience}</p>
              <p><span className="font-semibold">Qualifications:</span> {member.qualifications.join(', ')}</p>
              <p><span className="font-semibold">Specializations:</span> {member.specializations.join(', ')}</p>
            </div>

            {/* Verification and Emergency Contact */}
            <div className="p-4 bg-gray-200 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Verification and Emergency Contact</h3>
              <p><span className="font-semibold">National ID:</span> {member.nationalID}</p>
              <p><span className="font-semibold">Background Check:</span> {member.backgroundCheck ? 'Cleared' : 'Pending'}</p>
              <p><span className="font-semibold">Medical Clearance:</span> {member.medicalClearance ? 'Cleared' : 'Pending'}</p>

              {member.emergencyContact ? (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Emergency Contact</h4>
                  <p><span className="font-semibold">Name:</span> {member.emergencyContact.name}</p>
                  <p><span className="font-semibold">Relationship:</span> {member.emergencyContact.relationship}</p>
                  <p><span className="font-semibold">Phone:</span> {member.emergencyContact.contactNumber}</p>
                </div>
              ) : (
                <p>No emergency contact information available.</p>
              )}
            </div>

            {/* Account Details */}
            <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Account Details</h3>
              <p><span className="font-semibold">Created At:</span> {new Date(member.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold">Last Updated:</span> {new Date(member.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
