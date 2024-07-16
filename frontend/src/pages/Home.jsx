import React from "react";

const Home = () => {
  return (
    <>
      <div className="container py-3 ">
        <div className="float-end py-2">
          <select className="form-select">
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
