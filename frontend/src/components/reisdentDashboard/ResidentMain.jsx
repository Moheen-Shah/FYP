import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
import { useEffect } from 'react';
import ResidentProfile from '../resident/Profile';
import ResidentActivities from '../resident/Activities';

function ResidentMain() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to "/residentMain/profile" on login
  useEffect(() => {
    if (location.pathname === '/residentMain') {
      navigate('/residentMain/profile');
    }
  }, [location, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col justify-start p-6 shadow-lg sticky top-0 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Resident Dashboard</h1>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6">
          <Link
            to="/residentMain/profile"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/residentMain/profile')
                ? 'bg-green-700 text-yellow-300'
                : 'bg-transparent hover:bg-green-700'
            }`}
          >
            <AiOutlineUser className="text-xl" />
            <span>Profile</span>
          </Link>

          <Link
            to="/residentMain/activities"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/residentMain/activities')
                ? 'bg-green-700 text-yellow-300'
                : 'bg-transparent hover:bg-green-700'
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
          <Route path="profile/*" element={<ResidentProfile />} />
          <Route path="activities/*" element={<ResidentActivities />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResidentMain;
