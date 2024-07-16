import React from "react";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
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
              />
            </div>
          </form>
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
