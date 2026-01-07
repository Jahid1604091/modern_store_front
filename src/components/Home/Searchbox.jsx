import React from "react";
import { Button, Form } from "react-bootstrap";
import './css/Searchbox.css';

const Searchbox = ({ searchTerm, setSearchTerm, setPageNumber }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
  };

  return (
    <div className="search-container">
      <Form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="submit" variant="primary" className="search-button">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Searchbox;