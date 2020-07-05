import React, { Component } from "react";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar  justify-content-center" style={{ padding: 0 }}>
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              height="50"
              //   className="d-inline-block align-top"
              loading="lazy"
              style={{ padding: 0, margin: 0 }}
            />
          </Link>
        </nav>
        <hr style={{ padding: 0, margin: 0 }} />
      </div>
    );
  }
}

export default Header;
