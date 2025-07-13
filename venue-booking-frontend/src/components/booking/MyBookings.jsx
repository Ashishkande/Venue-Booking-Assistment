import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../../services/bookingService';

const MyBookings = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [isLoading, setIsLoading] = useState(!initialBookings);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!initialBookings) {
      const fetchBookings = async () => {
        try {
          const token = localStorage.getItem('token');
          const data = await bookingService.getMyBookings(token);
          setBookings(data);
        } catch (err) {
          setError('Failed to load bookings');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookings();
    }
  }, [initialBookings]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">You don't have any bookings yet.</p>
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Browse venues to make a booking
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Bookings</h2>
      
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">
                  {booking.venue?.name || 'Venue'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {booking.venue?.location || 'Location not available'}
                </p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : booking.status === 'cancelled' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Start</p>
                <p>{formatDate(booking.startDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">End</p>
                <p>{formatDate(booking.endDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Link
                to={`/venue/${booking.venue?._id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Venue
              </Link>
              <button
                className="text-red-600 hover:text-red-800 text-sm font-medium"
                onClick={() => {
                  /* TODO: Implement cancel booking */
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
