import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import LogoutButton from "../auth/Logout-button";

export default function NavBarMain() {
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      className="background-black mb-3"
      variant="dark"
    >
      <Container>
        <h3>
          Cuentas Claras
        </h3>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item px-1">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item px-1">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/ABM"
              >
                ABM operaciones
              </NavLink>
            </li>
            <li className="nav-item px-1">
              <LogoutButton />
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
