import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ venue, onSubmit, isLoading }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState('');

  useEffect(() => {
    // Set end date to 1 hour after start by default
    const end = new Date(startDate);
    end.setHours(end.getHours() + 1);
    setEndDate(end);
  }, [startDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (startDate >= endDate) {
      setError('End time must be after start time');
      return;
    }

    if (!venue) {
      setError('No venue selected');
      return;
    }

    setError('');
    onSubmit({
      venueId: venue._id,
      startDate,
      endDate
    });
  };

  const calculateTotal = () => {
    if (!venue) return 0;
    const hours = (endDate - startDate) / (1000 * 60 * 60);
    return (hours * venue.pricePerHour).toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Book This Venue</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date & Time
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded"
            minDate={new Date()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date & Time
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded"
            minDate={startDate}
          />
        </div>

        {venue && (
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-medium mb-2">Booking Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span>Venue:</span>
              <span className="font-medium">{venue.name}</span>
              
              <span>Price per hour:</span>
              <span className="font-medium">${venue.pricePerHour}</span>
              
              <span>Duration:</span>
              <span className="font-medium">
                {((endDate - startDate) / (1000 * 60 * 60)).toFixed(1)} hours
              </span>
              
              <span>Total:</span>
              <span className="font-medium">${calculateTotal()}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !venue}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading || !venue ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
