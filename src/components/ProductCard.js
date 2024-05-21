import React from 'react';
import { Col } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function ProductCard({ product }) {
    // console.log('Product:', product);

    if (!product) {
        return null;
    }

    return (
        <Col md={3} key={product._id}>
            <PreviewProducts data={product}/> 
        </Col>
    );
}