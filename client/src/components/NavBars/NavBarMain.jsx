import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationButton from "../auth0/Authentication-button";
import { Navbar, Nav, Container } from "react-bootstrap";

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
          <NavLink
            exact
            className="nav-link"
            style={{ color: "#fff" }}
            activeClassName="active"
            to="/admin-home"
          >
            Cuentas Claras
          </NavLink>
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
                to="/posts"
              >
                ABM operaciones
              </NavLink>
            </li>
            <li className="nav-item px-1">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/profile"
              >
                Perfil
              </NavLink>
            </li>
            <li className="nav-item px-1">
              <AuthenticationButton />
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
