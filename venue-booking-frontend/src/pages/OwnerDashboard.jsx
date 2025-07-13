import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AddVenue from '../components/venue/AddVenue';
import ManageAvailability from '../components/venue/ManageAvailability';

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'add' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Venue
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'manage' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Availability
        </button>
      </div>
      
      {activeTab === 'add' ? <AddVenue /> : <ManageAvailability />}
    </div>
  );
};

export default OwnerDashboard;