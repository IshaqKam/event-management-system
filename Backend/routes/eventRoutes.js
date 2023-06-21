const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  rsvpEvent,
  getAllEvents,
} = require('../controllers/eventController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getEvents).post(createEvent);
router.route('/all').get(getAllEvents);
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);
router.route('/rsvp/:id').post(rsvpEvent);

module.exports = router;
