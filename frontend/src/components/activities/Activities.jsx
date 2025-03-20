import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AllActivities from './AllActivities';
import AddActivity from './AddActivity';

function Activities() {
  const location = useLocation();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Activity Management</h2>

      {/* Navigation Links */}
      <div className="flex justify-center space-x-8 mb-6">
        <Link
          to="/adminPage/activities/all-activities"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/activities/all-activities')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          All Activities
        </Link>

        <Link
          to="/adminPage/activities/add-activities"
          className={`px-4 py-2 text-lg rounded-md transition duration-300 ease-in-out ${
            location.pathname.includes('/adminPage/activities/add-activities')
              ? 'text-blue-700 border-b-2 border-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-700'
          }`}
        >
          Add Activities
        </Link>
      </div>

      {/* Content Area */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <Routes>
          <Route path="all-activities/*" element={<AllActivities />} />
          <Route path="add-activities/*" element={<AddActivity />} />
        </Routes>
      </div>
    </div>
  );
}

export default Activities;
