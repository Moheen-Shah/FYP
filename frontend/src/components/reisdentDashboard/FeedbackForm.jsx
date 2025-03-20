import { useState } from 'react';
import axios from 'axios';

function FeedbackForm({staffId,residentId}) {
console.log(staffId)

    const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const handleSubmit = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      // Fetch the current doctor data
      const residentResponse = await axios.get(`http://localhost:3000/api/v1/added-resisdents/find-added-resident/${residentId}`);
  
      if (residentResponse.status === 200) {
        const resident = residentResponse.data.data.resident;
  
        // Extract all objects from doctor.feedback into a new array
        const existingFeedback =resident.feedback; // Ensure feedback is not undefined
        console.log("Existing Feedback:", existingFeedback);
        const response = await axios.get(`http://localhost:3000/api/v1/staff/find-staff/${staffId}`);
const name=response.data.data.staff.firstName + response.data.data.staff.lastName
        // Prepare the new feedback item
        const newFeedback = [{
            name,
          message,
        }];
       
  console.log(newFeedback)
        // Create a new array containing existing feedback and the new feedback
        const updatedFeedback =existingFeedback.concat(newFeedback) ;
  console.log(updatedFeedback)
        // Update the doctor with the new feedback
        const updateResponse = await axios.patch(`http://localhost:3000/api/v1/added-resisdents/update-added-resident/${residentId}`, {
          feedback: updatedFeedback, // Use the new array for the feedback field
        });
  
        if (updateResponse.status === 200) {
          setSuccess(true);
          setMessage(''); // Clear the message input
        } else {
          setError('Failed to submit feedback. Please try again.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        placeholder="Enter your feedback here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Feedback submitted successfully!</p>}
      <button
        className={`mt-4 px-6 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  )
}

export default FeedbackForm