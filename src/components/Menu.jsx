import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { BASE_URL } from '../services/baseURL';

function Menu({ menuimage, menu, onClick }) {
  return (
    <div className="text-center">
      <Container>
        <Row className="mt-4 justify-content-center">
          <Col xs={6} md={3} className="mb-4 d-flex flex-column align-items-center">
            <div
              className="menu-item d-flex flex-column align-items-center"
              style={{
                width: '180px',
                borderRadius: '8px',
                 padding: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
               
              }}
              onClick={onClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Image 
                src={`${BASE_URL}/uploads/${menuimage}`} 
                rounded 
                style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto' }} 
              />
              <h6 className="mt-2" style={{ fontSize: '1rem', fontWeight: '600', color: '#333' }}>
                {menu}
              </h6>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
