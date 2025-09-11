import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";
import "./NewsCard.css";

const NewsCard = ({ title, summary, url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  // Limit summary length
  const truncatedSummary =
    summary.length > 180 ? summary.substring(0, 180) + "..." : summary;

  return (
    <Card className="news-card h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="news-title">{title}</Card.Title>
        <Card.Text className="news-summary flex-grow-1">
          {truncatedSummary}
        </Card.Text>
        <Button
          variant="primary"
          className="mt-3 align-self-start read-more-btn"
          onClick={handleClick}
        >
          Read Full Article <FaExternalLinkAlt className="ms-1" size={12} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
