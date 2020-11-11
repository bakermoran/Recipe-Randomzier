import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header(props) {
  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Recipe Randomizer</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/recipes">Recipes</Nav.Link>
        <Nav.Link href="/randomizer">Randomizer</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
