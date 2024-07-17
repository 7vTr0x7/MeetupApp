const express = require("express");
const app = express();
app.use(express.json());
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

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

const readEventsByType = async (type) => {
  try {
    const events = await Event.find({ eventType: type });
    return events;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/types/:type", async (req, res) => {
  try {
    const events = await readEventsByType(req.params.type);
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get events: ${error}` });
  }
});

const readEventsByTitleAndTags = async (title) => {
  try {
    const events = await Event.find({
      eventName: title,
    });
    if (events.length > 0) {
      return events;
    } else {
      const tagEvents = await Event.find({
        eventTags: title,
      });
      return tagEvents;
    }
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/search/:title", async (req, res) => {
  try {
    const events = await readEventsByTitleAndTags(req.params.title);
    if (events) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get searched event: ${error}` });
  }
});

const updateImageUrl = async (id, data) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
  } catch (error) {
    console.log(error);
  }
};

app.post("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await updateImageUrl(req.params.id, req.body);
    if (updatedEvent) {
      res.json(updatedEvent);
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to update event: ${error}` });
  }
});

const readEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    console.log(error);
  }
};

app.get("/events/:id", async (req, res) => {
  try {
    const event = await readEventById(req.params.id);
    if (event) {
      res.json();
    } else {
      res.status(404).json({ error: "Event not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get event" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
