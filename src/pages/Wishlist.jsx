// src/pages/Wishlist.jsx
import React, { useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../services/baseURL';
import { removeFromwhishlist } from '../Redux/slices/whishlistSlice';
import { addToCart } from '../Redux/slices/cardSlice';
import { Table } from 'react-bootstrap';

function Wishlist() {
  const cartItems = useSelector((state) => state.whishlist);
  const dispatch = useDispatch();
  const deliveryFee = 5.0; // Example delivery fee

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  // Calculate total
  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  return (
    <div className='wishlist-container text-center mb-5'>
      <h1 className="mb-5 mt-5" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
        Your Wishlist
      </h1>
      {cartItems.length ? (
        <Table striped hover responsive className="custom-table text-center">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Dish Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`${BASE_URL}/uploads/${item.dishesImage}`}
                    alt={item.dishname}
                    style={{ width: '80px', height: '60px', borderRadius: '8px' }}
                  />
                </td>
                <td>{item.dishname}</td>
                <td>{item.description}</td>
                <td>&#36;{item.price}</td>
                <td>
                  <Button
                    onClick={() => dispatch(removeFromwhishlist(item))}
                    variant="outline-danger"
                    className="mx-1"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                  <Button
                    onClick={() => dispatch(addToCart(item))}
                    variant="outline-success"
                    className="mx-1"
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">
          <h2>No items in your wishlist</h2>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
