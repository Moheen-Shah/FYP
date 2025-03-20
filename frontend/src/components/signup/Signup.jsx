import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    
    email: '',
    phone: '',
    emergencyContact: { name: '', relationship: '', phone: '', email: '' },
    password: '',
    confirmPassword: '',
    healthConditions: [],
    allergies: [],
   
    bloodType: '',
    mobilityStatus: '',
    dietaryPreferences: [],
    carePlan: {  specialInstructions: '' },
    familyContacts: [{ name: '', relationship: '', phone: '', email: '' }],
    lastCheckIn: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({ ...formData, [field]: value.split(',') });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: { ...formData.emergencyContact, [name]: value }
    });
  };

  const handleCarePlanChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      carePlan: { ...formData.carePlan, [name]: value }
    });
  };

  const handleFamilyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.familyContacts];
    updatedContacts[index][name] = value;
    setFormData({ ...formData, familyContacts: updatedContacts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData)
    axios.post('http://localhost:3000/api/v1/resisdents/signup', JSON.stringify(formData), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        alert("Your request has been sent to admin");
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg shadow-lg max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-center text-blue-900">Resident Signup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Basic Information */}
        <label className="block">
          <span className="text-gray-700">First Name</span>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Last Name</span>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Date of Birth</span>
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Gender</span>
          <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
       
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Phone</span>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>


        {/* Authentication */}
        <label className="block col-span-2">
          <span className="text-gray-700">Password</span>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Confirm Password</span>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>

        {/* Emergency Contact */}
        <h3 className="col-span-2 text-lg font-semibold text-blue-900">Emergency Contact</h3>
        <label className="block col-span-2">
          <span className="text-gray-700">Name</span>
          <input type="text" name="name" value={formData.emergencyContact.name} onChange={handleEmergencyContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Relationship</span>
          <input type="text" name="relationship" value={formData.emergencyContact.relationship} onChange={handleEmergencyContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Phone</span>
          <input type="text" name="phone" value={formData.emergencyContact.phone} onChange={handleEmergencyContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" required />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Email</span>
          <input type="email" name="email" value={formData.emergencyContact.email} onChange={handleEmergencyContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>

        

        {/* Health and Medical Information */}
        <h3 className="col-span-2 text-lg font-semibold text-blue-900">Health & Medical Information</h3>
        
        <label className="block col-span-2">
          <span className="text-gray-700">Allergies (comma-separated)</span>
          <input type="text" name="allergies" value={formData.allergies.join(',')} onChange={(e) => handleArrayChange(e, 'allergies')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>
      
        <label className="block col-span-2">
          <span className="text-gray-700">Blood Type</span>
          <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Mobility Status</span>
          <input type="text" name="mobilityStatus" value={formData.mobilityStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>
        <label className="block col-span-2">
          <span className="text-gray-700">Dietary Preferences (comma-separated)</span>
          <input type="text" name="dietaryPreferences" value={formData.dietaryPreferences.join(',')} onChange={(e) => handleArrayChange(e, 'dietaryPreferences')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>

        {/* Care Plan */}
        <h3 className="col-span-2 text-lg font-semibold text-blue-900">Care Plan</h3>
       
       
        <label className="block col-span-2">
          <span className="text-gray-700">Special Instructions</span>
          <textarea name="specialInstructions" value={formData.carePlan.specialInstructions} onChange={handleCarePlanChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
        </label>

        {/* Family Contacts */}
        <h3 className="col-span-2 text-lg font-semibold text-blue-900">Family Contacts</h3>
        {formData.familyContacts.map((contact, index) => (
          <div key={index} className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input type="text" name="name" value={contact.name} onChange={(e) => handleFamilyContactChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
            </label>
            <label className="block">
              <span className="text-gray-700">Relationship</span>
              <input type="text" name="relationship" value={contact.relationship} onChange={(e) => handleFamilyContactChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
            </label>
            <label className="block">
              <span className="text-gray-700">Phone</span>
              <input type="text" name="phone" value={contact.phone} onChange={(e) => handleFamilyContactChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input type="email" name="email" value={contact.email} onChange={(e) => handleFamilyContactChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200" />
            </label>
          </div>
        ))}

        <button type="submit" className="col-span-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Sign Up</button>
      </div>
    </form>
  );
}

export default Signup;
