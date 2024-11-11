import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import Swal from 'sweetalert2';

function Auth({ show, setShow, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleClose = () => setShow(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form completely?",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    } else {
      const result = await registerAPI(userData);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User registered successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setUserData({ username: "", email: "", password: "" });
        setIsRegister(false); // Switch to login form after successful registration
      } else {
        alert(result.response.data);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form completely?",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    } else {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        sessionStorage.setItem("existinguser", JSON.stringify(result.data.existinguser));
        sessionStorage.setItem("token", result.data.token);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setUserData({ username: "", email: "", password: "" });
        onLoginSuccess();
        setShow(false);
      } else {
        alert(result.response.data);
      }
    }
  };

  const toggleAuthForm = () => {
    setIsRegister(!isRegister);
    setUserData({ username: "", email: "", password: "" });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
      <Modal.Header style={{ background: 'linear-gradient(135deg, #ff9900, #5bc0be)', borderBottom: "none" }}>
        <Modal.Title style={{ color: "#fff", fontWeight: "600" }}>
          {isRegister ? "Create Account" : "Welcome Back"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={12} md={6} className="d-none d-md-block p-0">
              <div
                style={{
                  backgroundImage: "url('https://i.pinimg.com/736x/a9/71/8b/a9718bd3631d2a488f28096452c189a6.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  borderRadius: "10px 0 0 10px",
                }}
              ></div>
            </Col>
            <Col xs={12} md={6}>
              <div className="p-4" style={{ borderRadius: "10px", background: "#fff" }}>
                <h5 style={{ fontWeight: "600", textAlign: "center", color: "#333" }}>
                  {isRegister ? "Sign Up for Free" : "Login to Your Account"}
                </h5>
                <Form>
                  {isRegister && (
                    <Form.Group controlId="validationCustom01" className="mt-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        style={{
                          borderRadius: "25px",
                          padding: "12px 15px",
                          borderColor: "#fda085",
                          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                        }}
                      />
                    </Form.Group>
                  )}
                  <Form.Group controlId="validationCustom02" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      style={{
                        borderRadius: "25px",
                        padding: "12px 15px",
                        borderColor: "#fda085",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="validationCustom03" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      style={{
                        borderRadius: "25px",
                        padding: "12px 15px",
                        borderColor: "#fda085",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </Form.Group>
                </Form>

                <div className="text-center">
                  <button
                    className="btn mt-4 w-100"
                    onClick={isRegister ? handleRegister : handleLogin}
                    style={{
                      background: "#ff9900",
                      color: "#fff",
                      borderRadius: "25px",
                      padding: "12px",
                      fontWeight: "600",
                      border: "none",
                      transition: "background-color 0.3s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f6d365'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#fda085'}
                  >
                    {isRegister ? "Register" : "Login"}
                  </button>
                  <p className="mt-4" style={{ color: "#666", fontSize: "0.9em" }}>
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                      onClick={toggleAuthForm}
                      style={{
                        color: "#fda085",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {isRegister ? "Login" : "Register"}
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Auth;
