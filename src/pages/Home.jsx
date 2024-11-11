import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Form, Container } from 'react-bootstrap';
import Menu from '../components/Menu';
import Carditems from '../components/Carditems';
import Auth from '../pages/Auth';
import rightarrow from '../images/back.png';
import leftarrows from '../images/forward.png';
import { alldishesmenus } from '../services/allAPI';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [alldishmenu, setAlldishmenu] = useState([]);
  const [isToken, setIsToken] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const dishesPerPage = 8;

  useEffect(() => {
    const existingUser = sessionStorage.getItem('existinguser');
    if (existingUser) {
      setShowLoginModal(false);
      setIsToken(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsToken(true);
  };

  const getAlldishes = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await alldishesmenus(reqHeader);
      if (result && result.data) {
        setAlldishmenu(result.data);
      }
    }
  };

  useEffect(() => {
    if (isToken) {
      getAlldishes();
    }
  }, [isToken]);

  // Filter dishes by selected category and search query
  const filteredDishes = alldishmenu.filter((dish) =>
    (!selectedCategory || dish.category.toLowerCase() === selectedCategory?.toLowerCase()) &&
    dish.dishname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);
  const currentDishes = filteredDishes.slice(
    (currentPage - 1) * dishesPerPage,
    currentPage * dishesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (dishname, price) => {
    setCartItems((prevItems) => [...prevItems, { dishname, price }]);
  };

  return (
    <div>
      <Auth show={showLoginModal} setShow={setShowLoginModal} onLoginSuccess={handleLoginSuccess} />

      {!showLoginModal && (
        <>
          {/* Hero Section */}
          <Container fluid className="hero-section p-0 mb-5" style={{
            background: 'linear-gradient(135deg, #ff9900, #5bc0be)',
            color: '#fff', padding: '5rem 0', borderRadius: '25px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
          }}>
            <Container>
              <Row className="align-items-center text-center">
                <Col md={12}>
                  <h1 className="display-4 mb-3 mt-3" style={{ fontWeight: 'bold', color: '#edf5e1', fontSize: '3rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Experience Exquisite Dining
                  </h1>
                  <p className="lead" style={{ color: '#edf5e1', fontSize: '1.5rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    Bringing you flavors that spark joy and comfort, crafted with love and creativity.
                  </p>


                  <Container className="d-flex justify-content-center my-5">
                    <Form className="position-relative" style={{ width: '100%', maxWidth: '600px' }}>
                      <span
                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: '#888', fontSize: '1.5rem',
                        }}
                      >
                        <i className="fas fa-search"></i>
                      </span>
                      <Form.Control
                        type="search"
                        placeholder="Search for delicious dishes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: '50px', paddingRight: '20px', paddingTop: '15px', paddingBottom: '15px', fontSize: '1.2rem', fontWeight: '500', border: '2px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9', transition: 'border-color 0.3s ease', }}
                        onFocus={(e) => (e.target.style.borderColor = '#5bc0be')}
                        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                      />
                    </Form>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Container>


          {/* Menu Categories */}
          <Container className="my-5">
            <Row>
              <h2 className="text-center mb-2" style={{ color: '#3a506b', fontSize: '2rem' }}>Menu Categories</h2>
              <h1 className="mb-5 text-center" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#5bc0be' }}>
                Choose Your Favorite
              </h1>
              {alldishmenu.length > 0 ? (
                alldishmenu.slice(0, 6).map((dish) => (
                  <Col md={2} key={dish._id} className="mb-4">
                    <Menu
                      menuimage={dish.menuimage}
                      menu={dish.menu}
                      // onClick={() => setSelectedCategory(dish.menu)}
                      style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '15px', transition: 'transform 0.3s ease-in-out' }}
                     />
                  </Col>
                ))
              ) : (
                <p className="text-center">No dishes available.</p>
              )}
            </Row>
          </Container>

          {/* Dishes Section */}
          <Container className="my-5 ">
            <div className="d-flex justify-content-between ">
              <Button variant="outline-secondary" onClick={handlePreviousPage} disabled={currentPage === 1} >
                <img src={leftarrows} width={'30px'} alt="" />
              </Button>
              <Button variant="outline-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <img src={rightarrow} width={'30px'} alt="" />
              </Button>
            </div>
          
            <Row>
              
              <h2 className="text-center mb-2" style={{ color: '#3a506b', fontSize: '2rem' }}>Top Dishes</h2>
              <h1 className="mb-5 text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#5bc0be' }}>
                Featured Dishes
              </h1>
              {currentDishes.map((dish) => (
                <Col key={dish._id} md={3} className="mb-4">
                  <Carditems
                    dishname={dish.dishname}
                    description={dish.description}
                    price={dish.price}
                    dishesImage={dish.dishesImage}
                    onAddToCart={handleAddToCart}
                    style={{ borderRadius: '10px', boxShadow: '0 6px 15px rgba(0,0,0,0.15)' }}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default Home;
