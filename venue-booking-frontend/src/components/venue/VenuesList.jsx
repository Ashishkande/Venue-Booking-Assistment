import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import venueService from '../../services/venueService';
import VenueCard from './VenueCard';

const VenuesList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await venueService.getAllVenues(searchTerm);
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [searchTerm]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search venues by name or location..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map(venue => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenuesList;
