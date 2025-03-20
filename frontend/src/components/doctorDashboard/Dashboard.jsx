

import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineTeam, AiOutlineMessage } from 'react-icons/ai';
import { useEffect } from 'react';
import Profile from './Profile';
import DoctorResidents from './DoctorResidents';
import FeedBack from './FeedBack';
function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to "/dashboard/profile" on login or access
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/profile');
    }
  }, [location, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col justify-start p-6 shadow-lg sticky top-0 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Doctor</h1>
        
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6 flex-grow-0">
          <Link
            to="/doctor-dashboard/profile"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/dashboard/profile')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineUser className="text-xl" />
            <span>Profile</span>
          </Link>

          <Link
            to="/doctor-dashboard/doctor-residents"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/dashboard/doctor-residents')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineTeam className="text-xl" />
            <span>Residents</span>
          </Link>

          <Link
            to="/doctor-dashboard/feedback"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/dashboard/feedback')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineMessage className="text-xl" />
            <span>Feedback</span>
          </Link>
        </nav>

        <footer className="text-sm text-gray-300 text-center mt-10">
          © 2024 COMSATS University
        </footer>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="profile/*" element={<Profile />} />
          <Route path="doctor-residents/*" element={<DoctorResidents />} />
          <Route path="feedback/*" element={<FeedBack />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
