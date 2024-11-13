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
    <>
   <Card className="h-100 border-0 rounded-lg shadow-sm d-flex flex-column">
      <Card.Img 
        variant="top" 
        src={`${BASE_URL}/uploads/${dishesImage}`} 
        alt={dishname} 
        style={{ 
          height: '140px', 
          objectFit: 'cover', 
          borderRadius: '8px 8px 0 0', 
          transition: 'transform 0.3s ease' 
        }}
        className="card-img-top"
      />
      <Card.Body className="p-4 d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-dark" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
            {dishname}
          </Card.Title>
          
          <Card.Text className="text-muted" style={{ fontSize: '1rem', marginBottom: '1rem', color: '#001a4d' }}>
            {description}
          </Card.Text>

          <div className="d-flex justify-content-between align-items-center">
            <span className="text-warning" style={{ fontSize: '1.2rem' }}>★★★★★</span>
            <span className="text-primary" style={{ fontSize: '1.4rem', fontWeight: '600' }}>${price}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Button 
         
            className="p-2 rounded-circle text-danger border-2 border-danger" 
            onClick={handleIncrement1}
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img src={heart} width={'20px'} alt="Add to Wishlist" />
          </Button>

          <Button 
           className="p-2 rounded-circle text-success border-2 border-success" 
            onClick={handleIncrement}
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img src={cart} width={'20px'} alt="Add to Cart" />
          </Button>
        </div>
      </Card.Body>
    </Card>
    </>
  );
}

export default Carditems;
