const Venue = require('../models/Venue');

exports.getAllVenues = async (req, res) => {
  try {
    const { search, date } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (date) {
      const selectedDate = new Date(date);
      query.unavailableDates = { $not: { $elemMatch: { date: selectedDate } } };
    }
    
    const venues = await Venue.find(query).populate('owner', 'name email');
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addVenue = async (req, res) => {
  try {
    const venue = new Venue({ ...req.body, owner: req.user.id });
    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const venue = await Venue.findOne({ _id: req.params.id, owner: req.user.id });
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found or unauthorized' });
    }
    
    const { date, reason, action } = req.body;
    const parsedDate = new Date(date);
    
    if (action === 'block') {
      venue.unavailableDates.push({ date: parsedDate, reason });
    } else if (action === 'unblock') {
      venue.unavailableDates = venue.unavailableDates.filter(
        d => d.date.getTime() !== parsedDate.getTime()
      );
    }
    
    await venue.save();
    res.json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
