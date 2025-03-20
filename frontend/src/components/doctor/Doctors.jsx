import AllDoctors from "./AllDoctors"
import AddDoctor from "./AddDoctor"
import { Link, Routes, Route, useLocation } from 'react-router-dom';

function Doctors() {
    const location = useLocation();

    return (
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Doctor Management</h2>
  
        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <Link
            to="/adminPage/doctors/all-doctors"
            className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
              location.pathname.includes('/adminPage/doctors/all-doctors')
                ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
                : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
            }`}
          > 
            All Doctors
          </Link>
  
          <Link
            to="/adminPage/doctors/add-doctor"
            className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
              location.pathname.includes('/adminPage/doctors/add-doctor')
                ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
                : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
            }`}
          >
            Add Doctor
          </Link>
        </div>
  
        {/* Content Area */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <Routes>
            <Route path="all-doctors/*" element={<AllDoctors />} />
            <Route path="add-doctor/*" element={<AddDoctor />} />
          </Routes>
        </div>
      </div>
    );
}

export default Doctors