import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DetailResident({ residentId, onBack }) {
  const [residentDetails, setResidentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
        setResidentDetails(response.data.data.resident);
      } catch (err) {
        setError('Failed to load resident details. ' + err);
      }
    };
    fetchDetails();
  }, [residentId]);

  return (
    <div className="p-8 bg-gray-50 shadow-xl rounded-xl border border-gray-300 max-w-4xl mx-auto my-10">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {residentDetails ? (
        <>
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6 border-b-2 border-blue-100 pb-3">
            {residentDetails.first_name} {residentDetails.last_name}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Basic Information</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Date of Birth:</span> {new Date(residentDetails.date_of_birth).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Gender:</span> {residentDetails.gender}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Blood Type:</span> {residentDetails.bloodType || 'N/A'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Mobility Status:</span> {residentDetails.mobilityStatus || 'N/A'}
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Contact Details</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {residentDetails.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Phone:</span> {residentDetails.phone}
              </p>
            </div>

            {/* Health and Medical Information */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md lg:col-span-2">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Health and Medical Information</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Health Conditions:</span>{' '}
                {residentDetails.healthConditions?.length > 0 ? residentDetails.healthConditions.join(', ') : 'None'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Allergies:</span>{' '}
                {residentDetails.allergies?.length > 0 ? residentDetails.allergies.join(', ') : 'None'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Dietary Preferences:</span>{' '}
                {residentDetails.dietaryPreferences?.length > 0 ? residentDetails.dietaryPreferences.join(', ') : 'None'}
              </p>
            </div>

            {/* Care Plan */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Care Plan</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Special Instructions:</span> {residentDetails.carePlan?.specialInstructions || 'None'}
              </p>
            </div>

            {/* Assigned Doctors */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Assigned Doctors</h3>
              {residentDetails.assigned_doctor?.length }
            </div>

            {/* Family Contacts */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md lg:col-span-2">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Family Contacts</h3>
              {residentDetails.familyContacts?.length > 0 ? (
                residentDetails.familyContacts.map((contact, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Name:</span> {contact.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Relationship:</span> {contact.relationship}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Phone:</span> {contact.phone}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Email:</span> {contact.email}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-700">No family contacts available.</p>
              )}
            </div>

            {/* System Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">System Details</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Last Check-In:</span>{' '}
                {residentDetails.lastCheckIn ? new Date(residentDetails.lastCheckIn).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Created At:</span> {new Date(residentDetails.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Updated At:</span> {new Date(residentDetails.updatedAt).toLocaleDateString()}
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

DetailResident.propTypes = {
  residentId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DetailResident;
