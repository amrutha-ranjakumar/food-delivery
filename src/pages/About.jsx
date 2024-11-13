import React from 'react';
import { Row, Col, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import restaurant from '../images/main4.jpg';
import aboutImage from '../images/37-removebg-preview (1).png';
import aboutImage1 from '../images/38-removebg-preview.png';
import aboutImage2 from '../images/39-removebg-preview.png';
import aboutImage3 from '../images/40-removebg-preview.png';
import aboutImage4 from '../images/41-removebg-preview.png';
import aboutImage6 from '../images/44-removebg-preview.png';
import aboutImage7 from '../images/45-removebg-preview.png';
import aboutimage8 from '../images/46-removebg-preview.png';
import aboutImage9 from '../images/50-removebg-preview.png';
import aboutImage10 from '../images/51-removebg-preview.png';
import aboutImage11 from '../images/52-removebg-preview.png';
import aboutImage12 from '../images/53-removebg-preview.png';
import aboutImage14 from '../images/54-removebg-preview.png';
import aboutImage15 from '../images/55-removebg-preview.png';

function About() {
  return (
    <div>
      {/* Banner Image with Overlay Text */}
      <Row className="justify-content-center position-relative">
        <Col xs={12} className="position-relative">
          <img
            src={restaurant}
            alt="Restaurant"
            style={{
              width: '100%',
              objectFit: 'cover',
              height: '400px',
            }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', zIndex: 1, padding: '1rem', width: '90%', }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#001a4d' }}>Fast & Fresh Food Delivery</h1>
            <p style={{ fontSize: '1rem', color: '#4d0026' }}>
              Enjoy delicious meals delivered right to your door with speed and care.
            </p>
            <Link to="/home">
              <Button variant="danger" size="lg" style={{ borderRadius: '25px', padding: '8px 16px', color: '#333300' }}>
                Order Now
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Cards Section */}
      <div
        style={{ display: 'flex', padding: '1rem', gap: '1rem', position: 'relative', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200%', overflowX: 'auto', justifyContent: 'center', }} >
        {[aboutImage, aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage6, aboutImage7].map((image, index) => (
          <Card key={index} style={{ minWidth: '8rem', flex: '0 0 auto' }} className="shadow-lg border-0 text-center">
            <Card.Img variant="top" src={image}
              style={{
                borderRadius: '50%',
                height: '4.5rem',
                width: '4.5rem',
                margin: 'auto',
              }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
                {['Momos', 'Biryani', 'Pizza', 'Rolls', 'Burger', 'Noodles', 'Dosa'][index]}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* About Section */}
      <Container>
        <Row className="align-items-center justify-content-center mt-5">
          <Card className="shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden', maxWidth: '90%', height: 'auto' }}>
            <Row noGutters>
              {/* About Text Section */}
              <Col xs={12} md={6} className="p-4" style={{ backgroundColor: '#ff9900' }}>
                <h2 className="text-danger">Welcome to FOODIE</h2>
                <p className="mt-4" style={{ lineHeight: '1.6', color: '#001a4d' }}>

                  Foodie is a revolutionary food delivery platform dedicated to connecting people with a diverse array of local restaurants, bringing culinary delights directly to their doorstep. With an extensive network of partner restaurants, Foodie offers a wide variety of cuisines and meals that cater to every taste and occasion, from comforting classics and international delicacies to unique local favorites. Our mission is to make delicious, high-quality food accessible to all while supporting local chefs and communities by promoting their incredible creations to a broader audience.
                </p>
                <p className="mt-4" style={{ lineHeight: '1.6', color: '#001a4d' }}>
                  With a user-centered design, Foodie’s interface provides a seamless browsing and ordering experience. Customers can search for meals based on cuisine, dietary preferences, location, and trending items, making it easy to discover new dishes or quickly find a beloved favorite. Each menu is curated to include detailed descriptions, mouth-watering images, and customer reviews, empowering users to make informed, satisfying meal choices every time.
                </p><p className="mt-4" style={{ lineHeight: '1.6', color: '#001a4d' }}>
                  Foodie also recognizes the importance of fostering local connections. By partnering with small and independent restaurants, Foodie enables them to expand their customer base and reach diners who may not have discovered their offerings otherwise. This support for local businesses strengthens community bonds and enriches the culinary landscape, making Foodie an invaluable resource for those who enjoy exploring new flavors and supporting neighborhood gems.
                </p>
                <p className="mt-4" style={{ lineHeight: '1.6', color: '#001a4d' }}>
                  Beyond convenience, Foodie prioritizes safety and reliability, offering secure payment options and real-time tracking so users can monitor their orders from kitchen to doorstep. The platform’s reliable delivery network ensures timely service, while dedicated customer support is readily available to resolve any issues. Whether ordering for a family meal, an office lunch, or a solo night in, Foodie enhances every dining experience by celebrating food’s ability to bring people together. With Foodie, discover a world of flavor right in your neighborhood—one delicious meal at a time.
                </p>
                <Button variant="danger" size="lg" style={{ borderRadius: '25px', padding: '8px 16px', color: '#333300' }}>
                  Order Now
                </Button>
              </Col>

              {/* About Image Section */}
              <Col xs={12} md={6}>
                <img
                  src="https://i.pinimg.com/564x/58/a0/bc/58a0bcd2956e4425d674ca0f20a933c3.jpg"
                  alt="About Us"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                    borderRadius: '0 20px 20px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </Col>
            </Row>
          </Card>
        </Row>
      </Container>

      {/* Favorite Dishes Carousel */}
      <h2 className="text-center my-5" style={{ fontSize: '2rem', fontWeight: '700', color: '#5bc0be' }}>Shop Groceries</h2>
      <marquee scrollAmount={5}>
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem', width: '100%', justifyContent: 'center' }}>
          {[aboutimage8, aboutImage9, aboutImage10, aboutImage11, aboutImage12, aboutImage14, aboutImage15].map((image, index) => (
            <Card key={index} style={{ minWidth: '6rem', maxWidth: '15rem', flex: '0 0 auto', textAlign: 'center' }} className="shadow-lg border-0">
              <Card.Img
                variant="top"
                src={image}
                style={{
                  height: '150px',
                  objectFit: 'cover',
                  margin: 'auto',
                }}
              />
            </Card>
          ))}
        </div>
      </marquee>
    </div>
  );
}

export default About;