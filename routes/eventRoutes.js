const {
    getAllEvents,
    getSingleEvent,
    insertEvent,
  } = require("../Controller/EventsController"); 
  
  const router = require("express").Router();
  
  router.get("/", getAllEvents);
  
  router.post("/", insertEvent);
  
  // Route to get a single event by ID
  router.get("/:eventid", getSingleEvent);
  
  module.exports = router;
  