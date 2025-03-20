import DoctorToresidents from "./DoctorToresidents";
import ResidentToStaff from "./ResidentToStaff";
import { Link, Routes, Route, useLocation } from 'react-router-dom';

function FeedBack() {
  const location = useLocation();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Feedback Management</h2>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-8 mb-6">
        <Link
          to="/adminPage/feedback/doctors"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/feedback/doctors')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          Doctors
        </Link>

        <Link
          to="/adminPage/feedback/residents"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/feedback/residents')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          Residents
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <Routes>
          <Route path="doctors/*" element={<DoctorToresidents />} />
          <Route path="residents/*" element={<ResidentToStaff />} />
        </Routes>
      </div>
    </div>
  );
}

export default FeedBack;
