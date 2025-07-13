import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import venueService from '../../services/venueService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ManageAvailability = () => {
  const { user } = useContext(AuthContext);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [action, setAction] = useState('block');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await venueService.getAllVenues('', token);
        setVenues(response.filter(venue => venue.owner._id === user.id));
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVenue) {
      setMessage('Please select a venue');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await venueService.updateAvailability(
        selectedVenue,
        { date, reason, action },
        token
      );
      setMessage(
        `Successfully ${action === 'block' ? 'blocked' : 'unblocked'} date for venue`
      );
      // Reset form
      setReason('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Venue Availability</h2>
      
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Select Venue</label>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select a venue --</option>
            {venues.map(venue => (
              <option key={venue._id} value={venue._id}>
                {venue.name} - {venue.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="w-full p-2 border rounded"
            minDate={new Date()}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Reason (optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="E.g., Maintenance, Private event"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Action</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="action"
                value="block"
                checked={action === 'block'}
                onChange={() => setAction('block')}
                className="mr-2"
              />
              Block Date
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="action"
                value="unblock"
                checked={action === 'unblock'}
                onChange={() => setAction('unblock')}
                className="mr-2"
              />
              Unblock Date
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !selectedVenue}
          className={`w-full bg-indigo-600 text-white p-2 rounded ${isLoading || !selectedVenue ? 'opacity-50' : 'hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Processing...' : 'Update Availability'}
        </button>
      </form>
    </div>
  );
};

export default ManageAvailability;
