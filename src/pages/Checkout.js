import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // Check if all fields are filled
    if (!name || !address || !email || !phoneNumber) {
      Swal.fire({
        title: 'Incomplete Form',
        text: 'Please fill out all the details to complete your order.',
        icon: 'warning',
      });
      return;
    }

    try {
      const checkoutData = {
        name: name,
        address: address,
        email: email,
        phoneNumber: phoneNumber,
      };

      console.log('Checkout data:', checkoutData);

      const response = await fetch(`http://localhost:4000/order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to initiate checkout.');
      }

      const responseData = await response.json();
      const { checkout } = responseData || {};

      if (!checkout) {
        throw new Error('Checkout data not found.');
      }

      console.log('Checkout response:', checkout);

      Swal.fire({
        title: 'Order Complete',
        text: 'Thank you for your purchase!',
        icon: 'success',
      }).then(() => {
        setName('');
        setAddress('');
        setEmail('');
        setPhoneNumber('');

        navigate('/');
      });
    } catch (error) {
      console.error('Error initiating checkout:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to initiate checkout.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3">Order Checkout</h2>
      <p className="text-muted">Please fill out the following details to complete your order</p>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address:</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number:</label>
        <input
          type="tel"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      <button className="btn btn-primary" as={Link} to="/order" onClick={handleCheckout}>
        Confirm Purchase
      </button>
    </div>
  );
}