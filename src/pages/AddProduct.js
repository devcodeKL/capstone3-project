import React, { useState, useContext } from 'react';
import { Button, Card, Container, Form, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Background from './Background';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct() {
    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    function createProduct(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`http://localhost:4000/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stock: stock,
                imageUrl: imageUrl
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error === "Product already exists") {
                Swal.fire({
                    icon: "error",
                    title: "Product already exists.",
                    text: data.message
                });
            } else if (data.error === "Failed to save the product") {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Product Creation",
                    text: data.message
                });
            } else {
                Swal.fire({
                    icon:"success",
                    title: "Product Added"
                });
                setName("");
                setDescription("");
                setPrice(0);
                setStock(0);
                setImageUrl("");
            }
        });
    }

    return (
        <>
            {user.isAdmin === true ? (
                <>
                    <Background imageUrl='/images/BG-01.png'>
                        <Container className="AddProduct d-flex flex-column align-items-center">
                            <Card style={{ width: "50rem", height: "auto" }} className="AddProductCard">
                                <Image className="AddProductImage" src="/images/AddProductText-02.png" />
                                <div className="AddProductDiv">
                                    <Form onSubmit={e => createProduct(e)}>
                                        <Form.Group>
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Price:</Form.Label>
                                            <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => setPrice(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Stock:</Form.Label>
                                            <Form.Control type="number" placeholder="Enter Stock" required value={stock} onChange={e => setStock(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Image URL:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                                        </Form.Group>
                                        <div className="AddProductBtnDiv">
                                            <Button variant="primary" type="submit" id="submitBtn" className="AddProductBtn">Submit</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Container>
                    </Background>
                </>
            ) : (
                <Navigate to="/products" />
            )}
        </>
    );
}