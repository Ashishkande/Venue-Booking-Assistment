const express = require('express');
const { bookVenue, getUserBookings } = require('../controllers/bookingController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth(), bookVenue);
router.get('/my-bookings', auth(), getUserBookings);

module.exports = router;
