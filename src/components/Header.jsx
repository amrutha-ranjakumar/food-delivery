import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Badge, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cart from '../images/shopping-cart.png';
import heart from '../images/heart.png';
import logo from '../images/logo.png';
import Profile from './Profile';

function Header({ allDishes, setFilteredDishes }) {
  const [searchQuery, setSearchQuery] = useState('');
  const totalCartItems = useSelector((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  const totalWhishlistItems = useSelector((state) =>
    state.whishlist.reduce((total, item) => total + item.quantity, 0)
  );

  // Handle search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter dishes based on search query
    const filteredDishes = allDishes.filter((dish) =>
      dish.dishname.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDishes(filteredDishes);  // Update filtered dishes
  };

  return (
    <Navbar
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow"
      style={{ background: 'linear-gradient(135deg, #ff9900, #5bc0be)' }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="50px" className="me-2" />
          <span className="fw-bold" style={{ fontSize: '1.8rem', color: ' #000000' }}>
            Foodie 
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto"></Nav>
          
          <div className="d-flex align-items-center ms-3">
            {/* Cart Link with Dynamic Count */}
            <Link to="/card" className="text-decoration-none me-3 position-relative">
              <img src={cart} alt="Cart" width="30px" />
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {totalCartItems}
              </Badge>
            </Link>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="text-decoration-none me-3 position-relative">
              <img src={heart} alt="Wishlist" width="30px" />
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {totalWhishlistItems}
              </Badge>
            </Link>

            <Profile />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
