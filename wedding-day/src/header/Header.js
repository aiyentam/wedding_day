import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <ul>
          <li>Sign Up</li>
          <li>Login</li>
          <li>Gallery</li>
          <li>Registry </li>
          <li>Upcoming Events</li>
        </ul>
      </div>
    );
  }
}

export default Header;
