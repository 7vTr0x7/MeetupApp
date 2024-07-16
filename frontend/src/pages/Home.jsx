import React, { useState } from "react";

const Home = () => {
  const [type, setType] = useState("Both");

  const fetchEvents = async () => {
    try {
      const response =
        type === "Both"
          ? await fetch("http://localhost:4000/events")
          : await fetch(`http://localhost:4000/events/types/${type}`);

      if (!response.ok) {
        console.log("Failed to fetch");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };
  fetchEvents();
  return (
    <>
      <div className="container py-3 ">
        <div className="float-end py-2">
          <select
            className="form-select"
            onChange={(e) => setType(e.target.value)}>
            <option value="">Select Event Type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <h1 className="fw-bold">Meetup Events</h1>

        <div></div>
      </div>
    </>
  );
};

export default Home;
