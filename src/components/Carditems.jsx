import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/slices/cardSlice';
import { addTowhishlist } from '../Redux/slices/whishlistSlice';
import { BASE_URL } from '../services/baseURL';
import cart from '../images/shopping-cart.png';
import heart from '../images/heart.png';

function Carditems({ dishname, description, price, dishesImage }) {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
    dispatch(addToCart({ dishname, price, description, dishesImage }));
  };

  const handleIncrement1 = () => {
    setItemCount(itemCount + 1);
    dispatch(addTowhishlist({ dishname, price, description, dishesImage }));
  };

  return (
    <Card className="h-100 border-0 shadow" style={{ overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s' }}>
      <Card.Img variant="top"src={`${BASE_URL}/uploads/${dishesImage}`} alt={dishname} style={{
          height: '160px', // Decreased height
          objectFit: 'cover',
        }}
      />
      <Card.Body className="p-3">
        <Card.Title className="text-center" style={{ fontSize: '1.3rem', fontWeight: '500' }}>
          {dishname}
        </Card.Title>
        <Card.Text className="text-muted text-center" style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>
          {description}
        </Card.Text>
        <div className="text-center">
          <span className="text-warning" style={{ fontSize: '1.1rem' }}>★★★★★</span>
          <div>

            <span className="text-primary" style={{ fontSize: '1.2rem', fontWeight: '600' }}>${price}</span>
          </div> </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <Button variant="light" className="ms-2" onClick={handleIncrement1}
             onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'; // Revert background on mouse out
              e.currentTarget.style.color = '#3498db'; // Revert text color on mouse out
              e.currentTarget.style.transform = 'scale(1)'; // Revert scale effect
            }}
          >
           <img src={heart} width={'20px'} alt="" />
          </Button>

          <Button variant="light" className="ms-2" onClick={handleIncrement}
             onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'; // Revert background on mouse out
              e.currentTarget.style.color = '#3498db'; // Revert text color on mouse out
              e.currentTarget.style.transform = 'scale(1)'; // Revert scale effect
            }}
          ><img src={cart} width={'20px'} alt="" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Carditems;