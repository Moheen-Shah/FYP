import { useEffect, useState } from 'react';
import axios from 'axios';
import FeedBack from './FeedBack';
const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/api/v1/doctors/doctor-details', {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
       console.log(response)

        setDoctor(response.data.data);
        console.log(doctor)
      } catch (error) {
        setError('Failed to fetch doctor details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  },[]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-4">Doctor Details</h1>
        <div className="border-t-4 border-blue-500 w-24 mx-auto mb-8"></div>

        {/* Doctor Details */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Doctor Profile</h2>
          
          {/* Personal Info Section */}
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm mb-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">Personal Information</h3>
            <p><span className="font-semibold">Name:</span> {doctor.name}</p>
            <p><span className="font-semibold">Gender:</span> {doctor.gender}</p>
            <p><span className="font-semibold">Date of Birth:</span> {new Date(doctor.date_of_birth).toLocaleDateString()}</p>
          </div>

          {/* Contact Info Section */}
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm mb-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">Contact Information</h3>
            <p><span className="font-semibold">Email:</span> {doctor.contact_details.email}</p>
            <p><span className="font-semibold">Phone:</span> {doctor.contact_details.phone}</p>
            <p><span className="font-semibold">Address:</span> {doctor.contact_details.address}</p>
          </div>

          {/* Professional Details Section */}
          <div className="p-4 bg-green-100 rounded-lg shadow-sm mb-8">
            <h3 className="text-2xl font-semibold text-green-900 mb-2">Professional Information</h3>
            <p><span className="font-semibold">Specialization:</span> {doctor.professional_details.specialization}</p>
            <p><span className="font-semibold">Qualifications:</span> {doctor.professional_details.qualifications}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.professional_details.experience} years</p>
            <p><span className="font-semibold">Availability:</span> {doctor.professional_details.availability}</p>
          </div>

          {/* System Details Section */}
          <div className="p-4 bg-purple-100 rounded-lg shadow-sm mb-8">
            <h3 className="text-2xl font-semibold text-purple-900 mb-2">System Details</h3>
            <p><span className="font-semibold">Username:</span> {doctor.system_details.username}</p>
            <p><span className="font-semibold">Role:</span> {doctor.system_details.role}</p>
          </div>

          {/* Assigned Residents Section */}
          <div className="p-4 bg-gray-200 rounded-lg shadow-sm mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Assigned Residents</h3>
            Residents={doctor.assigned_residents.length }
          </div>

          {/* Account Details Section */}
          <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Account Details</h3>
            <p><span className="font-semibold">Created At:</span> {new Date(doctor.createdAt).toLocaleString()}</p>
            <p><span className="font-semibold">Last Updated:</span> {new Date(doctor.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
