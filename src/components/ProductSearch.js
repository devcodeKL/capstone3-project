import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import ProductCard from "./ProductCard";
import Swal from 'sweetalert2';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a keyword to search for products.',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchQuery }) 
      });
      const data = await response.json();

      const activeProducts = data.filter(product => product.isActive);
      setSearchResults(activeProducts);
    } catch (error) {
      console.error('Error searching for courses:', error);
    }
  };

  return (
    <Container className="Search center-content">
      <Card className="SearchDiv">
        <img src={"/images/SearchByName-04.png"} alt="SearchName" className="SearchHeading" />
        <div className="form-group mb-3">
          <label className="ProductLabel" htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            placeholder="Type Keyword..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
        </div>
        <Button className="btn btn-primary mb-3" onClick={handleSearch}>
          Search
        </Button>
        <div className="row text-center">
          {searchResults.map(product => (
            <div className="col-md-12 mx-auto" key={product._id} style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default ProductSearch;