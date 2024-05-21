import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

const SearchByPrice = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!minPrice || !maxPrice) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter both minimum and maximum prices.',
      });
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ minPrice, maxPrice }),
    };

    fetch(`http://localhost:4000/products/searchByPrice`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setSearched(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className="PriceRange">
      <Card className="PriceRangeDiv">
      <img src={"/images/SearchByPrice-05.png"} alt="ADMIN DASHBOARD" className="SearchByPrice" />
        <form className="PriceRangeInput" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="minPrice" className="form-label Low">
              Lowest Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="minPrice"
              placeholder="Enter minimum price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maxPrice" className="form-label High">
              Highest Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="maxPrice"
              placeholder="Enter maximum price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <Button type="submit" className="PriceBtn btn-primary mb-3">
            Search
          </Button>
        </form>
        {searched && products.length === 0 && (
          Swal.fire({
            icon: 'info',
            title: 'No Products Found',
            text: 'No products found within the specified price range.',
          })
        )}
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name}: PhP {product.price}
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  );
};

export default SearchByPrice;