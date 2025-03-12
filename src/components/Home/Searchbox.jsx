import React from "react";
import { Button, Form } from "react-bootstrap";

const Searchbox = ({ searchTerm, setSearchTerm, setPageNumber }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
  };
  return (
    <>
      <Form onSubmit={handleSearch} className="my-4 search-form">
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button type="submit" variant="primary" className="search-button">
          Search
        </Button>
      </Form>
    </>
  );
};

export default Searchbox;
