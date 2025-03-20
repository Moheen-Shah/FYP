

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AlllLogin() {
  const [role, setRole] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginEndpoint = '';
    if (role === 'Admin') {
      loginEndpoint = 'http://localhost:3000/api/v1/admins/login';
    } else if (role === 'Resident') {
      loginEndpoint = 'http://localhost:3000/api/v1/added-resisdents/login';
    } else if (role === 'Doctor') {
      loginEndpoint = 'http://localhost:3000/api/v1/doctors/login';
    } else if (role === 'Staff') {
      loginEndpoint = 'http://localhost:3000/api/v1/staff/login';
    } else {
      setMessage('Please select a valid role.');
      return;
    }

    try {
      const payload = role === 'Admin' ? { name: identifier, password } : { email: identifier, password };
      const response = await axios.post(loginEndpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token);

        // Navigate to the appropriate dashboard
        if (role === 'Admin') navigate('/adminPage');
        else if (role === 'Resident') navigate('/resident-dashboard');
        else if (role === 'Doctor') navigate('/doctor-dashboard');
        else if (role === 'Staff') navigate('/staffpage');
      }
    } catch (error) {
      setMessage(`Login failed. Please try again. ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl w-full max-w-md shadow-lg shadow-gray-500"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Role:</label>
          <div className="flex gap-4">
            {['Admin', 'Resident', 'Doctor', 'Staff'].map((roleOption) => (
              <label key={roleOption} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={role === roleOption}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                {roleOption}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {role === 'Admin' ? 'Username:' : 'Email:'}
          </label>
          <input
            type={role === 'Admin' ? 'text' : 'email'}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={role === 'Admin' ? 'Enter your username' : 'Enter your email'}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Login
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('successful') ? 'text-green-600' : 'text-red-500'
            } font-semibold`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AlllLogin;
