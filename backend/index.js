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

app.get("/", async (req, res) => {
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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on port:${PORT}`);
});
