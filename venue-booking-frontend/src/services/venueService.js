import axios from 'axios';

const API_URL = 'http://localhost:5000/api/venues';

const getAllVenues = async (search = '') => {
  const response = await axios.get(`${API_URL}?search=${search}`);
  return response.data;
};

const addVenue = async (venueData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, venueData, config);
  return response.data;
};

const updateAvailability = async (venueId, dateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${venueId}/availability`, dateData, config);
  return response.data;
};

export default {
  getAllVenues,
  addVenue,
  updateAvailability,
};
