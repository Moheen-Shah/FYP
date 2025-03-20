import { Link, Routes, Route, useLocation } from 'react-router-dom';
import ResisdentRequest from './ResisdentRequest';
import AllResidents from './AllResidents';

function Requestedresidents() {
  const location = useLocation();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Resident Management</h2>
      
      {/* Navigation Links */}
      <div className="flex justify-center space-x-8 mb-6">
        <Link
          to="/adminPage/resisdent/requests"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/resisdent/requests')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          Pending Requests
        </Link>

        <Link
          to="/adminPage/resisdent/allresidents"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/resisdent/allresidents')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          All Residents
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <Routes>
          {/* Nested Routes */}
          <Route path="requests" element={<ResisdentRequest />} />
          <Route path="allresidents" element={<AllResidents />} />
        </Routes>
      </div>
    </div>
  );
}

export default Requestedresidents;
