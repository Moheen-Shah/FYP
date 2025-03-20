import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AllStaff from './AllStaff';
import AddStaff from './AddStaff';

function Staff() {
  const location = useLocation();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Staff Management</h2>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-8 mb-6">
        <Link
          to="/adminPage/staff/all-staff"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/staff/all-staff')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          All Staff
        </Link>

        <Link
          to="/adminPage/staff/add-staff"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/staff/add-staff')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          Add Staff
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <Routes>
          <Route path="all-staff/*" element={<AllStaff />} />
          <Route path="add-staff/*" element={<AddStaff />} />
        </Routes>
      </div>
    </div>
  );
}

export default Staff;
