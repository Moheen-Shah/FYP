import { Link, Routes,Route,useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineTeam, AiOutlineCalendar } from 'react-icons/ai';
import { useEffect } from 'react';
import Profile from './Profile';
import Residents from './Residents';
import StaffActivities from './StaffActivities'; 

function StaffDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to "/staffPage/profile" on login or access
  useEffect(() => {
    if (location.pathname === '/staffPage') {
      navigate('/staffPage/profile');
    }
  }, [location, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gradient-to-b from-purple-800 to-purple-900 text-white flex flex-col justify-start p-6 shadow-lg sticky top-0 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Staff Dashboard</h1>
        
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6 flex-grow-0">
          <Link
            to="/staffPage/profile"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/staffPage/profile')
                ? 'bg-purple-700 text-yellow-300'
                : 'bg-transparent hover:bg-purple-700'
            }`}
          >
            <AiOutlineUser className="text-xl" />
            <span>Profile</span>
          </Link>

          <Link
            to="/staffPage/residents"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/staffPage/residents')
                ? 'bg-purple-700 text-yellow-300'
                : 'bg-transparent hover:bg-purple-700'
            }`}
          >
            <AiOutlineTeam className="text-xl" />
            <span>Residents</span>
          </Link>

          <Link
            to="/staffPage/activities"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/staffPage/activities')
                ? 'bg-purple-700 text-yellow-300'
                : 'bg-transparent hover:bg-purple-700'
            }`}
          >
            <AiOutlineCalendar className="text-xl" />
            <span>Activities</span>
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
          <Route path="residents/*" element={<Residents />} />
          <Route path="activities/*" element={<StaffActivities />} />
        </Routes>
      </div>
    </div>
  );
}

export default StaffDashboard;
