import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../Redux/slices/cardSlice';
import { BASE_URL } from '../services/baseURL';

function MyOrder() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliveryFee = 5.0; // Flat delivery fee

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  // Calculate total
  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  return (
    <Container fluid className="py-5">
      <h1 className="text-center mb-4 text-dark">My Order</h1>
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4" >
            <Card.Body>
              <Table  >
                <thead className="table-light" >
                  <tr style={{  background: 'linear-gradient(135deg, #ff9900, #5bc0be)'}}>
                    <th>#</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length ? (
                    cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={`${BASE_URL}/uploads/${item.dishesImage}`} 
                              width="100" 
                              alt={item.dishname} 
                              className="me-3" 
                            />
                            <div>
                              <h6 className="mb-0">{item.dishname}</h6>
                              <p className="text-muted mb-0">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <h5>No items in the cart</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm" style={{  background: 'linear-gradient( #ff9900, #5bc0be)'}}>
            <Card.Body>
              <h5 className="text-primary">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Total:</h5>
                <h5 className="text-danger">${total}</h5>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MyOrder;
