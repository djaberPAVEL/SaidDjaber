import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calculate">
                  Product calculation
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                categories 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                Customers 
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/mangment"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Product mangment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invoices">
                Invoices 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
