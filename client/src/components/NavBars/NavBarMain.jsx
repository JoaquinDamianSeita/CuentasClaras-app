
//NAVBAR SUPERIOR

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import LogoutButton from "../auth/Logout-button";
import { useLocation } from "react-router";

export default function NavBarMain() {
  const [userLog, setUserLog] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/login" ) {
      setUserLog(false);
    } else {
      setUserLog(true);
    }
  });

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      className="background-black mb-3"
      variant="dark"
    >
      <Container>
        <h3>Cuentas Claras</h3>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav mr-3">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item px-1">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/Home"
              >
                Inicio
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
          </ul>
        </Navbar.Collapse>
        {userLog ? (
          <div className="nav-item px-1">
            <LogoutButton />
          </div>
        ) : null}
      </Container>
    </Navbar>
  );
}
