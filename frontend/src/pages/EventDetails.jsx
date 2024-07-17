import React from "react";
import logo from "../images/logo.png";

const EventDetails = () => {
  return (
    <main className="bg-body-tertiary">
      <div className="container py-3 ">
        <img
          src={logo}
          alt="logo"
          style={{ height: "70px", margin: "0", padding: "0" }}
        />
        <div className="float-end pt-4">
          <form>
            <div className="input-group ">
              <input
                placeholder="⌕ Search by title and t..."
                className="form-control"
                type="text"
              />
            </div>
          </form>
        </div>
        <hr />
      </div>
    </main>
  );
};

export default EventDetails;
