import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('analytics');

  // Only allow admin access
  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <Link
          to="analytics"
          className={`px-4 py-2 ${activeTab === 'analytics' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </Link>
        <Link
          to="users"
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </Link>
        <Link
          to="venues"
          className={`px-4 py-2 ${activeTab === 'venues' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('venues')}
        >
          Venue Management
        </Link>
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
