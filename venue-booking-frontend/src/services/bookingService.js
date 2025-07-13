import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

const bookVenue = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookingData, config);
  return response.data;
};

const getMyBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/my-bookings`, config);
  return response.data;
};

export default {
  bookVenue,
  getMyBookings,
};