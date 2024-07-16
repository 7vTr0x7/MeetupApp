import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";

const Home = () => {
  const [type, setType] = useState("Both");
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await fetch(
          `http://localhost:4000/events/search/${search}`
        );

        if (!response.ok) {
          console.log("Failed to get searched data");
        }
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } else {
        fetchEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container py-3 ">
        <img
          src={logo}
          alt="logo"
          style={{ height: "70px", margin: "0", padding: "0" }}
        />
        <div className="float-end pt-4">
          <form onSubmit={submitHandler}>
            <div className="input-group ">
              <input
                placeholder="⌕ Search by title and t..."
                className="form-control"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
        <hr />
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
              <div key={event._id} className="col-md-4 my-3">
                <span className="position-absolute z-3 bg-light rounded p-1 m-2 fw-semibold">
                  {`${event.eventType} Event`}
                </span>
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
