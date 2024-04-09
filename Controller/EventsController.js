const Events = require("../models/Events"); 

// Insert an event
const insertEvent = async (req, res) => {
  try {
    const { title, description, date, shortDescription } = req.body;

    let event = new Events({
      title,
      description,
      date,
      shortDescription,
    });

    await event.save();
    res.json({
      event: event,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a single event by ID
const getSingleEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.params.eventid); 

    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.json({
      message: "Event found",
      event: event,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { insertEvent, getSingleEvent, getAllEvents };
