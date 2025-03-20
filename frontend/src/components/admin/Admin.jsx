import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineTeam, AiOutlineCalendar } from 'react-icons/ai';
import { useEffect } from 'react';
import Staff from '../staff/Staff';
import Activities from '../activities/Activities';
import Requestedresidents from '../resisdentRequest/Requestedresidents';
import Doctors from '../doctor/Doctors';
import FeedBack from '../feedback/FeedBack';

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to "/adminPage/resisdent" on login
  useEffect(() => {
    if (location.pathname === '/adminPage') {
      navigate('/adminPage/resisdent');
    }
  }, [location, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col justify-start p-6 shadow-lg sticky top-0 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>
        
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6 flex-grow-0">
          <Link
            to="/adminPage/resisdent"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/adminPage/resisdent')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineUser className="text-xl" />
            <span>Resident</span>
          </Link>

          <Link
            to="/adminPage/staff"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/adminPage/staff')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineTeam className="text-xl" />
            <span>Staff</span>
          </Link>

          <Link
            to="/adminPage/activities"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/adminPage/activities')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineCalendar className="text-xl" />
            <span>Activities</span>
          </Link>


          <Link
            to="/adminPage/doctors"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/adminPage/doctor')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineCalendar className="text-xl" />
            <span>Doctor</span>
          </Link>


          <Link
            to="/adminPage/feedback"
            className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              location.pathname.includes('/adminPage/feedback')
                ? 'bg-blue-700 text-yellow-300'
                : 'bg-transparent hover:bg-blue-700'
            }`}
          >
            <AiOutlineCalendar className="text-xl" />
            <span>FeedBack</span>
          </Link>
        </nav>

        <footer className="text-sm text-gray-300 text-center mt-10">
          © 2024 COMSATS University
        </footer>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="resisdent/*" element={<Requestedresidents />} />
          <Route path="staff/*" element={<Staff />} />
          <Route path="activities/*" element={<Activities />} />
          <Route path="doctors/*" element={<Doctors />} />
          <Route path="feedback/*" element={<FeedBack/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
