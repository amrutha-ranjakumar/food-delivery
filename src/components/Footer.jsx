import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const Footer = () => {


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_nkf8lij', 'template_n5zictb', form.current, {
        publicKey: 'XkNpRc5qOFp1B7Lc-',
      })
      .then(
        () => {
          // console.log('SUCCESS!');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "SUCCESS!",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          // console.log('FAILED...', error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "'FAILED...', error.text",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        },
      );
  };

  return (
    <footer
      style={{


        padding: '40px 0',

        background: 'linear-gradient(135deg, #ff9900, #5bc0be)'

      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo and Description */}
          <Col xs={12} md={5} className="mb-4">
            <div>
              {/* <img src={logo} alt="Logo" width="80px" /> */}
              <h5 className="mt-5" style={{ fontSize: '1.6rem', fontWeight: 'bold', color: ' #000000' }}>
                <img src={logo} width="50px" alt="" />  Foodie
              </h5>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#800000', lineHeight: '1.5', textAlign: "justify" }}  >
              "Foodie is your go-to food delivery platform, bringing fresh, delicious meals straight to your door. With a wide variety of cuisines to choose from, we cater to every taste and preference. Whether you're craving comfort food, exotic flavors, or healthy options, Foodie has something for everyone. Our mission is to make every meal an experience, with high-quality ingredients, fast delivery, and a focus on customer satisfaction. Enjoy a seamless ordering experience, fast delivery, and meals made with love. With Foodie, indulge in your favorite dishes anytime, delivered with care and convenience."
            </p>
          </Col>

          {/* Quick Links and Services Stacked */}
          <Col xs={12} md={3} className="mt-4">
            <Row>
              {/* Quick Links */}
              <Col xs={6} md={4} className="mt-5 ms-5">
                <h6 className="text-uppercase mt-5 " style={{ fontSize: '1.1rem', color: '#660033' }}>
                  Quick Links
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" style={{ textDecoration: 'none', color: '#660033' }}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="" style={{ textDecoration: 'none', color: '#660033' }}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="" style={{ textDecoration: 'none', color: '#660033' }}>
                      Register
                    </Link>
                  </li>
                </ul>
              </Col>

              {/* Our Services */}
              <Col xs={6} md={4} className="mt-5 ms-5 ">
                <h6 className="text-uppercase mt-5" style={{ fontSize: '1.1rem', color: '#660033' }}>
                  Our Services
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <Link to="" style={{ textDecoration: 'none', color: '#660033' }}>
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="" style={{ textDecoration: 'none', color: '#660033' }}>
                      Order Now
                    </Link>
                  </li>
                  <li>
                    <Link to="" style={{ textDecoration: 'none', color: '#660033' }}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Contact Form */}
          <Col xs={12} md={4} className="mt-5 ">
            <h6 className="text-uppercase mb-3" style={{ fontSize: '1.1rem', color: '#660033' }}>
              Contact Us
            </h6>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="user_name"
                  className="form-control form-control-sm"
                  placeholder="Your Name"
                  required
                  style={{
                    backgroundColor: '#660033',
                    color: '#fff',
                    border: '1px solid #ecf0f1',
                    padding: '12px',
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <input

                  type="email"
                  name="user_email"
                  className="form-control form-control-sm"
                  placeholder="Your Email"
                  required
                  style={{
                    backgroundColor: '#660033',
                    color: '#fff',
                    border: '1px solid #ecf0f1',
                    padding: '12px',
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <textarea

                  name="message"
                  className="form-control form-control-sm"
                  placeholder="Your Message"
                  rows="3"
                  required
                  style={{
                    backgroundColor: '#660033',
                    color: '#fff',
                    border: '1px solid #ecf0f1',
                    padding: '12px',
                  }}
                ></textarea>
              </div>
              <Button
                variant="warning"
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  backgroundColor: '#f39c12',
                  borderColor: '#f39c12',
                  fontSize: '1rem',
                }}
              >
                Send Message
              </Button>
            </form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="mt-5 text-center">
          <Col>
            <p style={{ fontSize: '0.85rem', color: '#660033' }}>
              &copy; 2024 Foodie. All Rights Reserved. | Built with React & Bootstrap.
            </p>
            <div className="social-icons">
              <a href="#" className="me-3" style={{ color: '#fff' }}>
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="me-3" style={{ color: '#fff' }}>
                <i className="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="me-3" style={{ color: '#fff' }}>
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="#" style={{ color: '#fff' }}>
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
