import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import venueService from '../../services/venueService';
import bookingService from '../../services/bookingService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [venue, setVenue] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await venueService.getAllVenues();
        const foundVenue = data.find(v => v._id === id);
        if (foundVenue) {
          setVenue(foundVenue);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error fetching venue:', err);
        navigate('/');
      }
    };

    fetchVenue();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await bookingService.bookVenue(
        {
          venueId: venue._id,
          startDate,
          endDate
        },
        token
      );
      setSuccess('Booking successful!');
      // Reset form
      setStartDate(new Date());
      setEndDate(new Date());
    } catch (err) {
      setError(err.message || 'Failed to book venue');
    } finally {
      setIsLoading(false);
    }
  };

  if (!venue) {
    return <div className="text-center py-8">Loading venue details...</div>;
  }

  const isAvailable = !venue.unavailableDates.some(dateObj => {
    const blockedDate = new Date(dateObj.date);
    return blockedDate >= startDate && blockedDate <= endDate;
  });

  const durationHours = (endDate - startDate) / (1000 * 60 * 60);
  const totalPrice = durationHours * venue.pricePerHour;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
          <p className="text-gray-600 mb-4">{venue.location}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <p className="mb-4">{venue.description}</p>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Capacity:</span> {venue.capacity} people</p>
                <p><span className="font-semibold">Price:</span> ${venue.pricePerHour} per hour</p>
                
                {venue.amenities.length > 0 && (
                  <div>
                    <p className="font-semibold">Amenities:</p>
                    <ul className="list-disc list-inside">
                      {venue.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Book This Venue</h2>
              
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                  {success}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Start Date & Time</label>
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
                  <label className="block text-gray-700 mb-1">End Date & Time</label>
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

                <div className="p-4 bg-gray-50 rounded">
                  <p className="font-semibold">Booking Summary</p>
                  <p>Duration: {durationHours.toFixed(1)} hours</p>
                  <p>Total Price: ${totalPrice.toFixed(2)}</p>
                  <p className={`font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {isAvailable ? 'Available' : 'Not Available'}
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!isAvailable || isLoading}
                  className={`w-full bg-indigo-600 text-white p-2 rounded ${!isAvailable || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                >
                  {isLoading ? 'Processing...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
