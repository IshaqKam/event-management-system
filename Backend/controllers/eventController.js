const asyncHandler = require('express-async-handler');
const Event = require('../models/event.model');
const User = require('../models/user.model');

//@desc Get User Events
//@route GET /api/events
//@access private
const getEvents = asyncHandler(async (req, res) => {
  const today = new Date();
  const events = await Event.find({
    created_by: req.user.id,
    date: { $gte: today },
  });
  res.status(200).json(events);
});

//@desc Get All Events
//@route GET /api/events/all
//@access private
const getAllEvents = asyncHandler(async (req, res) => {
  const today = new Date();
  const events = await Event.find({
    created_by: { $ne: req.user.id },
    date: { $gte: today },
  });
  res.status(200).json(events);
});

//@desc Create New Event
//@route POST /api/events
//@access private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, time, location } = req.body;
  if (!title || !description || !date || !time || !location) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  try {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    const events = await Event.find({
      created_by: req.user.id,
      createdAt: { $gte: previousDay },
    });
    if (events.length >= 3) {
      res.status(400);
      throw new Error('Event creation limit reached');
    }
    const startDate = new Date(`${date}T${time}:00`);
    const event = await Event.create({
      title,
      description,
      date: startDate,
      time,
      location,
      created_by: req.user.id,
    });

    res.status(201).json(event);
  } catch (e) {
    res.status(500);
    throw new Error(`${e.message}`);
  }
});

//@desc Get event
//@route GET /api/events/:id
//@access private
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('event not found');
  }
  res.status(200).json(event);
});

//@desc Update event
//@route PUT /api/Events/:id
//@access private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.created_by.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user events");
  }

  const startTime = new Date(`${event.date}`);
  const currentTime = new Date();
  const timeDiff = startTime - currentTime;
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (timeDiff <= twentyFourHours) {
    return res.status(400).json({
      error: 'Cannot update event within 24 hours of start time',
    });
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

//@desc Delete event
//@route DELETE /api/events/:id
//@access private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('event not found');
  }

  if (event.created_by.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user events");
  }

  const startTime = new Date(`${event.date}`);
  const currentTime = new Date();
  const timeDiff = startTime - currentTime;
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (timeDiff <= twentyFourHours) {
    return res.status(400).json({
      error: 'Cannot delete event within 24 hours of start time',
    });
  }

  await Event.deleteOne({ _id: req.params.id });
  res.status(200).json('Event deleted Successfully');
});

//@desc Rsvp event
//@route POST /api/events/rsvp/:id
//@access private
const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!user || !event) {
    res.status(404);
    throw new Error('event not found');
  }

  let userRsvps = user.rsvps;
  let eventRsvps = event.rsvps;

  if (event.created_by.toString() === req.user.id) {
    res.status(403);
    throw new Error('User should not rsvp to its own event');
  }

  if (eventRsvps && eventRsvps.includes(req.user.id)) {
    return res
      .status(400)
      .json({ error: 'User has already RSVPed to this event' });
  }

  const today = new Date().toISOString().split('T')[0];
  const userRSVPsToday = userRsvps.filter((rsvp) => rsvp.eventDate === today);

  if (userRSVPsToday.length >= 5) {
    return res
      .status(400)
      .json({ error: 'You have reached the maximum RSVP limit for today' });
  }

  userRsvps.push({ eventId: req.params.id, eventDate: today });
  eventRsvps.push(req.user.id);

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { rsvps: eventRsvps },
    {
      new: true,
    }
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { rsvps: userRsvps },
    {
      new: true,
    }
  );
  res.status(200).json('Event rsvp Successfully');
});

module.exports = {
  getEvent,
  getEvents,
  rsvpEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
};
