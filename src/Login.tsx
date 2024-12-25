
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
//import "./Login.css"; // Custom CSS file for further styling if needed

import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "jilani@gmail.com" && password === "jilani") {
      // Redirect to main page
      navigate("/MainPage", { replace: true });
    } else {
      setError("Invalid email or password");
      console.log(error);
      
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      <Row>
        <Col>
          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <div className="login-logo">{/* Add logo image here */}</div>
              <h2
                className="text-center mb-4"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                تسجيل الدخول
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ fontFamily: "Cairo, sans-serif" }}>
                    البريد الإلكتروني
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    dir="rtl"
                    className="transparent-placeholder"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label style={{ fontFamily: "Cairo, sans-serif" }}>
                    كلمة المرور
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    dir="rtl"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>

                <button
                  //variant="primary"
                  type="submit"
                  className="w-100 mt-4 button "
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  دخول
                </button>
                {error && (
                  <div className="text-danger" style={{ fontFamily: "Cairo, sans-serif" }}>
                    {error}
                  </div>
                )}
              </Form>

              <div
                className="text-center mt-3 "
                style={{ fontFamily: "Cairo, sans-serif",color: "#4F9153"}}
              >
                <a href="#!" className="text-decoration-none ">
                  هل نسيت كلمة المرور؟
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
