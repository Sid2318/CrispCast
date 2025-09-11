import React from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import "./Loader.css";

const Loader = () => {
  return (
    <Container className="text-center py-5 loader-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            className="custom-spinner"
          />
          <p className="loading-text mt-3">Fetching latest news summaries...</p>
          <p className="loading-subtext">
            This may take a few moments as we're processing articles with AI
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
