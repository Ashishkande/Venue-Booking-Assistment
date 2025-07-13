const express = require('express');
const { getAllVenues, addVenue, updateAvailability } = require('../controllers/venueController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllVenues);
router.post('/', auth(['admin', 'owner']), addVenue);
router.put('/:id/availability', auth(['admin', 'owner']), updateAvailability);

module.exports = router;