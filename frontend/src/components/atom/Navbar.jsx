import React from 'react';
import {Image,Navbar, Nav} from 'react-bootstrap';
import './css/navbar.css';


export const NavbarBrand = (props) => {
  const {children} = props;

  return (<>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <Image src="https://files.toolboxtve.com/wp-content/uploads/2018/03/15145223/logo.png" className="me-4" />
          <span>DESAFIO FULLSTACK JS</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          {children}
        </Nav>
    </Navbar>
  </>)
}
