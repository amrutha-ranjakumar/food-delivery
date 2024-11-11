import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deliveryInformationAPI } from '../services/allAPI';
import Swal from 'sweetalert2';

function Order() {
  const cartItems = useSelector((state) => state.cart);
  const deliveryFee = 5.0; // Flat delivery fee

  // Calculate subtotal and total using useMemo for performance
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const total = (parseFloat(subtotal) + deliveryFee).toFixed(2);

  const [deliveryInformationData, setDeliveryInformationData] = useState({
    FirstName: "", LastName: "", Email: "", Street: "", City: "", State: "", ZipCode: "", Country: "", Phone: ""
  });

  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => alert("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDeliveryInformation = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, Email, Street, City, State, ZipCode, Country, Phone } = deliveryInformationData;

    if (!FirstName || !LastName || !Email || !Street || !City || !State || !ZipCode || !Country || !Phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form completely?",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    } else {
      const result = await deliveryInformationAPI(deliveryInformationData);

      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delivery information submitted successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        setDeliveryInformationData({
          FirstName: "", LastName: "", Email: "", Street: "", City: "", State: "", ZipCode: "", Country: "", Phone: ""
        });
      } else {
        // alert(result.response?.data || "Failed to submit delivery information");
        Swal.fire({
          
          icon: "error",
        
          text: "Failed to submit delivery information",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRazorpayLoaded) {
     
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Razorpay SDK is not loaded yet. Please try again.",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }

    const totalInPaise = Math.round(parseFloat(total) * 100);

    var options = {
      key: "rzp_test_CFQcKDZyBWc5Nn",
      amount: totalInPaise,
      currency: "INR",
      name: "Ever Rocking",
      description: "Order Payment",
      prefill: {
        name: `${deliveryInformationData.FirstName} ${deliveryInformationData.LastName}`,
        email: deliveryInformationData.Email,
      },
      notes: {
        subtotal: `Subtotal: ${subtotal} USD`,
        deliveryFee: `Delivery Fee: ${deliveryFee} USD`,
        total: `Total: ${total} USD`
      },
      handler: function (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment successful! Payment ID: " + response.razorpay_payment_id,
          showConfirmButton: false,
          timer: 1500
        });
        
        navigate('/myorder');
      },
      theme: {
        color: "#FF6500"
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        {/* Delivery Information Section */}
        <Col lg={5} md={8} sm={12} className="mb-5">
          <Form className="p-4"  style={{  background: 'linear-gradient(135deg, #ff9900, #5bc0be)'}}>
            <h3 className="text-center mb-4 text-dark" style={{ fontSize: '2.5rem' }}>
              Delivery Information
            </h3>
            <hr />
            {/* Form fields */}
            <Row className="mb-3 text-dark">
              <Form.Group as={Col} md={6} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, FirstName: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, LastName: e.target.value })} />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 text-dark" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
                onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, Email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3 text-dark" controlId="formGridStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" placeholder="Enter Street"
                onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, Street: e.target.value })} />
            </Form.Group>
            <Row className="mb-3 text-dark">
              <Form.Group as={Col} md={6} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder="Enter City"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, City: e.target.value })} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control placeholder="Enter State"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, State: e.target.value })} />
              </Form.Group>
            </Row>
            <Row className="mb-3 text-dark">
              <Form.Group as={Col} md={6} controlId="formGridZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control placeholder="Enter Zip Code"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, ZipCode: e.target.value })} />
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control placeholder="Enter Country"
                  onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, Country: e.target.value })} />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 text-dark" controlId="formGridPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone Number"
                onChange={(e) => setDeliveryInformationData({ ...deliveryInformationData, Phone: e.target.value })} />
            </Form.Group>
            <Button className='btn w-100 text-white' style={{ background: "linear-gradient(to right, #ff9900, #2575fc)" }} onClick={handleDeliveryInformation}>Submit</Button>
          </Form>
        </Col>

        {/* Order Summary Section */}
        <Col lg={4} md={7} sm={10} className="d-flex justify-content-center align-items-start">
          <div className="card p-4 text-center" style={{ backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', width: '100%' }}>
            <h2 className="text-primary font-weight-bold">Order Summary</h2>
            <div className="py-2">
              <h6 className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </h6>
              <h6 className="d-flex justify-content-between">
                <span>Delivery fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </h6>
              <h6 className="font-weight-bold d-flex justify-content-between">
                <span>Total:</span>
                <span className="text-danger">${total}</span>
              </h6>
            </div>
            <Button variant="dark" className="form-control mt-3" style={{ backgroundColor: '#ff3300', color: '#fff' }} onClick={handleSubmit}>
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Order;
