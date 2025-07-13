const Booking = require('../models/Booking');
const Venue = require('../models/Venue');

exports.bookVenue = async (req, res) => {
  try {
    const { venueId, startDate, endDate } = req.body;
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    
    // Check availability
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const isUnavailable = venue.unavailableDates.some(dateObj => {
      const blockedDate = new Date(dateObj.date);
      return blockedDate >= start && blockedDate <= end;
    });
    
    if (isUnavailable) {
      return res.status(400).json({ error: 'Venue is not available for the selected dates' });
    }
    
    // Calculate duration and price
    const durationHours = (end - start) / (1000 * 60 * 60);
    const totalPrice = durationHours * venue.pricePerHour;
    
    const booking = new Booking({
      venue: venueId,
      user: req.user.id,
      startDate: start,
      endDate: end,
      totalPrice
    });
    
    await booking.save();
    
    // Block the dates
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      venue.unavailableDates.push({ date: new Date(d), reason: 'Booked' });
    }
    
    await venue.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('venue', 'name location');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
