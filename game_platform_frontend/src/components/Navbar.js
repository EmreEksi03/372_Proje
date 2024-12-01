import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Game Platform</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {/* Games linkini kaldırdık */}
            <li className="nav-item">
              <Link className="nav-link" to="/user/1">My Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;