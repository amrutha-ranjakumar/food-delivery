// src/pages/Card.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { removeFromCart } from '../Redux/slices/cardSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/baseURL';

function Card() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliveryFee = 5.0;

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Your Cart</h1>

      <Table bordered hover responsive className="custom-table text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length ? (
            cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.dishname}</td>
                <td>
                  <img
                    src={`${BASE_URL}/uploads/${item.dishesImage}`}
                    width="60"
                    alt={item.dishname}
                  />
                </td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    onClick={() => dispatch(removeFromCart(item))}
                    variant="outline-danger"
                    className="mx-1"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No items in the cart
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Stylish Order Summary with Cards */}
      <Row className="my-5 ms-5">
        <Col md={7}>
          <div className="p-4 rounded shadow-lg"  style={{  background: 'linear-gradient(135deg, #ff9900, #5bc0be)'}}>
            <h4 className="mb-4 text-center" style={{ color: '#343a40', fontWeight: 'bold' }}>Order Summary</h4>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <span style={{ color: '#007bff', fontWeight: '600' }}>Subtotal:</span>
              <strong style={{ color: '#007bff' }}>${subtotal}</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <span style={{ color: '#28a745', fontWeight: '600' }}>Delivery Fee:</span>
              <strong style={{ color: '#28a745' }}>${deliveryFee.toFixed(2)}</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <span style={{ color: '#dc3545', fontWeight: '600' }}>Total:</span>
              <strong style={{ color: '#dc3545', fontSize: '1.25rem' }}>${total}</strong>
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-100" 
              onClick={handleCheckout}
              style={{ borderRadius: '25px', transition: 'background-color 0.3s' }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="promoCode">
              <Form.Label>Promo Code</Form.Label>
              <Form.Control type="text" placeholder="Enter promo code" />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3 w-100" style={{ borderRadius: '25px' }}>
              Apply
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Card;
