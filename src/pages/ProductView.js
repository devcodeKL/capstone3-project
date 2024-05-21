import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();

                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setSubtotal(data.product.price);
                setImageUrl(data.product.imageUrl);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleChange = (newQuantity) => {
        const parsedQuantity = parseInt(newQuantity);
        setQuantity(parsedQuantity >= 1 ? parsedQuantity : 1);
        setSubtotal(price * (parsedQuantity >= 1 ? parsedQuantity : 1));
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`http://localhost:4000/cart/addToCart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    cartItems: [{ productId: productId, quantity: quantity }]
                })
            });
            const data = await response.json();
            console.log('Add to cart response:', data);
            Swal.fire({
                title: "Success!",
                text: "Product added to cart successfully.",
                icon: "success"
            });
            navigate("/cart");
        } catch (error) {
            console.error('Error adding product to cart:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add product to cart.",
                icon: "error"
            });
        }
    };

    return (
        <Container className="Preview mt-5">
            <Row>
                <Col lg={{ span: 4, offset: 4 }}>
                    <Card>
                        <Card.Img variant="top" src={imageUrl} alt={name} />
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>

                            <Form.Group className="mb-3">
                                <Form.Label>Quantity:</Form.Label>
                                <div className="input-group d-flex justify-content-center align-items-center">
                                    <Button variant="secondary" onClick={() => handleChange(quantity - 1)}>-</Button>
                                    <div style={{ width: "80px" }}>
                                        <Form.Control
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => handleChange(e.target.value)}
                                            min="1"
                                            className="text-center form-control-md"
                                        />
                                    </div>
                                    <Button variant="secondary" onClick={() => handleChange(quantity + 1)}>+</Button>
                                </div>
                            </Form.Group>

                            <Card.Subtitle>Subtotal:</Card.Subtitle>
                            <Card.Text>PhP {subtotal}</Card.Text>
                            {user.id !== null && (
                                <>
                                    {user.isAdmin ? (
                                        <Button variant="primary" onClick={handleAddToCart} disabled>
                                            Add to Cart
                                        </Button>
                                    ) : (
                                        <Button variant="primary" onClick={handleAddToCart}>
                                            Add to Cart
                                        </Button>
                                    )}
                                    <Button variant="danger" as={Link} to="/products">
                                        Back to Products
                                    </Button>
                                </>
                            )}
                            {!user.id && (
                                <Button variant="primary" as={Link} to="/login">
                                    Login to Continue Shopping
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}