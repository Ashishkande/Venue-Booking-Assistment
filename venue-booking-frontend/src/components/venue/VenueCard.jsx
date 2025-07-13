import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VenueCard = ({ venue }) => {
  if (!venue || !venue._id) {
    return null;
  }

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };

  const formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  return (
    <Link 
      to={`/venue/${venue._id}`}
      className="block bg-white rounded-lg shadow overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-200"
      aria-label={`View details for ${venue.name}`}
    >
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1" title={venue.name}>
          {venue.name || 'Unnamed Venue'}
        </h3>
        {venue.location && (
          <p className="text-gray-600 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {venue.location}
          </p>
        )}
        {venue.description && (
          <p className="text-gray-700 mb-4 line-clamp-2" title={venue.description}>
            {truncateDescription(venue.description)}
          </p>
        )}
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold">₹{formatPrice(venue.pricePerHour)}/hour</span>
          <span className="bg-indigo-600 text-white px-4 py-2 rounded">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    pricePerHour: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired
};

export default VenueCard;
