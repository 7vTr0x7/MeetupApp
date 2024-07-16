import React, { useEffect, useState } from "react";

const Home = () => {
  const [type, setType] = useState("Both");
  const [events, setEvents] = useState([]);

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
      setEvents(data);
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };

  console.log(events);

  useEffect(() => {
    fetchEvents();
  }, [type]);

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

        <div className="row ">
          {events.length > 0 &&
            events.map((event) => (
              <div key={event._id} className="col-md-4  my-3  ">
                <div className="card  border-0 bg-body-tertiary">
                  <img
                    className="card-img-top rounded w-75 "
                    alt={event.eventName}
                    src={event.eventImageURL}
                  />
                  <p className="fw-normal fs-6 p-0 m-0">{`${event.sessionTiming.fromDate} • ${event.sessionTiming.fromTime} IST`}</p>
                  <h4 className="fw-bold fs-4">{event.eventName}</h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
