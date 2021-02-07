import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import "./Navbar.css";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="Navbar">
    <ReactBootStrap.Navbar collapseOnSelect expand="xl" className="bc">
  <ReactBootStrap.Navbar.Brand href="/">MEDIAC</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto"> 
    <Link to="/about">
    <ReactBootStrap.Nav.Link className="navlink" href="/about">About</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/Blog">
    <ReactBootStrap.Nav.Link className="navlink" href="/blog">Blog</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/FAQ">
    <ReactBootStrap.Nav.Link  className="navlink" href="/FAQ">FAQs</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/Contact">
    <ReactBootStrap.Nav.Link className="navlink"  href="/contact">Contact</ReactBootStrap.Nav.Link>
    </Link>
     {/*<ReactBootStrap.NavDropdown title="YEET" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
    </ReactBootStrap.NavDropdown>*/}
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
    <Link to="/login">
    <ReactBootStrap.Nav.Link href="/login">Login</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/signup">
    <ReactBootStrap.Nav.Link eventKey={2} href="/Signup">
        Signup
      </ReactBootStrap.Nav.Link>
    </Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;