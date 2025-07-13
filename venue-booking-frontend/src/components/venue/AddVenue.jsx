import { useState } from 'react';
import { useContext } from 'react';

import AuthContext from '../../context/AuthContext';
import venueService from '../../services/venueService';

const AddVenue = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    capacity: 50,
    pricePerHour: 100,
    amenities: []
  });
  const [newAmenity, setNewAmenity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await venueService.addVenue(formData, token);
      setSuccessMessage('Venue added successfully!');
      // Reset form
      setFormData({
        name: '',
        description: '',
        location: '',
        capacity: 50,
        pricePerHour: 100,
        amenities: []
      });
    } catch (error) {
      console.error('Error adding venue:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Venue</h2>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Venue Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price Per Hour (₹)</label>
            <input
              type="number"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Amenities</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              className="flex-1 p-2 border rounded-l"
              placeholder="Add amenity"
            />
            <button
              type="button"
              onClick={handleAddAmenity}
              className="bg-indigo-600 text-white px-4 rounded-r"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map(amenity => (
              <span 
                key={amenity} 
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(amenity)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white p-2 rounded ${isSubmitting ? 'opacity-50' : 'hover:bg-indigo-700'}`}
        >
          {isSubmitting ? 'Adding...' : 'Add Venue'}
        </button>
      </form>
    </div>
  );
};

export default AddVenue;
