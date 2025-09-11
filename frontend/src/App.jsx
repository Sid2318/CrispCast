import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Alert,
  Button,
} from "react-bootstrap";
import { FaNewspaper, FaCalendarAlt, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Loader from "./components/Loader";
import DateSelector from "./components/DateSelector";
import NewsCard from "./components/NewsCard";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const [error, setError] = useState(null);

  const fetchNews = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = formatDate(date);
      console.log(`Fetching news for date: ${formattedDate}`);
      const res = await axios.get(
        `http://localhost:8000/news?date=${formattedDate}`
      );
      console.log("API Response:", res.data);
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to load news. Please try a different date or try again later."
      );
      setNews([]);
    }
    setLoading(false);
  };

  // Fetch news on initial load
  useEffect(() => {
    fetchNews(selectedDate);
  }, []);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <FaNewspaper className="me-2" />
            <span>CrispCast</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#news" active>
                Today's News
              </Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section text-center py-5 bg-primary text-white">
        <Container>
          <h1>News Summaries at a Glance</h1>
          <p className="lead">Stay informed with AI-powered news summaries</p>
          <div className="date-selector-container mt-4">
            <div className="d-flex align-items-center justify-content-center">
              <FaCalendarAlt className="me-2" />
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onDateChange={fetchNews}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-5 flex-grow-1">
        {loading ? (
          <Loader />
        ) : error ? (
          <Row>
            <Col xs={12}>
              <Alert variant="danger" className="text-center">
                <h4>Error</h4>
                <p>{error}</p>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => fetchNews(new Date())}
                >
                  Try Today's News
                </Button>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row>
            {news.length === 0 ? (
              <Col xs={12}>
                <Alert variant="info" className="text-center">
                  <h4>No Articles Found</h4>
                  <p>
                    No news found for this date. Try selecting a different date.
                  </p>
                </Alert>
              </Col>
            ) : (
              news.map((item, index) => (
                <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                  <NewsCard
                    title={item.title}
                    summary={item.summary}
                    url={item.url}
                  />
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <h5>CrispCast News Summarizer</h5>
              <p className="mb-0">Get concise summaries of today's top news</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <a
                href="https://github.com/Sid2318/CrispCast"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <p className="mb-0 mt-2 mt-md-0">
                © {new Date().getFullYear()} CrispCast
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
