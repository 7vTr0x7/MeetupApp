const express = require("express");
const app = express();
app.use(express.json());
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");

initializeDatabase();

const readAllEvents = async () => {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `failed to get events: ${error}` });
  }
});

const createEvent = async (event) => {
  try {
    const newEvent = await Event(event);
    const savedEvent = newEvent.save();
    return savedEvent;
  } catch (error) {
    console.log(error);
  }
};

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    if (savedEvent) {
      res.status(200).json(savedEvent);
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to create event : ${error}` });
  }
});

const deleteEventById = async (id) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    return deletedEvent;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEventById(req.params.id);
    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).json({ error: "event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to Delete ${error}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
