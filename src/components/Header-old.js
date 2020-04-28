import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <h1>Library Service</h1>
      </NavbarBrand>
    </Navbar>
  );
};
export default Header;
