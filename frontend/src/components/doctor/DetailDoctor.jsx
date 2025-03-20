import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DetailDoctor({ doctorId, onBack }) {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/doctors/find-doctor/${doctorId}`);
        setDoctorDetails(response.data.data.doctor);
      } catch (err) {
        setError('Failed to load doctor details. ' + err);
      }
    };
    fetchDetails();
  }, [doctorId]);

  return (
    <div className="p-8 bg-gray-50 shadow-xl rounded-xl border border-gray-300 max-w-3xl mx-auto my-10">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {doctorDetails ? (
        <>
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6 border-b-2 border-blue-100 pb-3">
            {doctorDetails.name}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Basic Information</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Date of Birth:</span> {new Date(doctorDetails.date_of_birth).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Gender:</span> {doctorDetails.gender}
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Contact Details</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {doctorDetails.contact_details.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span> {doctorDetails.contact_details.phone}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Address:</span> {doctorDetails.contact_details.address}
              </p>
            </div>

            {/* Professional Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Professional Details</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Specialization:</span> {doctorDetails.professional_details.specialization}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Qualifications:</span> {doctorDetails.professional_details.qualifications}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Experience:</span> {doctorDetails.professional_details.experience} years
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Availability:</span> {doctorDetails.professional_details.availability}
              </p>
            </div>

            {/* System Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">System Details</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Username:</span> {doctorDetails.system_details.username}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Role:</span> {doctorDetails.system_details.role}
              </p>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md lg:col-span-2">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Additional Information</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Assigned Residents:</span> {doctorDetails.assigned_residents.length}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Created At:</span> {new Date(doctorDetails.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Updated At:</span> {new Date(doctorDetails.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Go Back
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

DetailDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DetailDoctor;
