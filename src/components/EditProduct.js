import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditProduct({ product, fetchData }) {

    const [productId, setProductId] = useState("");
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = (productId) => {

        fetch(`http://localhost:4000/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            
            console.log(data);
            console.log(data.product);

            setProductId(data.product._id);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setStock(data.product.inventoryStock);

        })
            setShowEdit(true);
    };

    const closeEdit = () => {
        
        setShowEdit(false);

        setProductId("");
        setName("");
        setDescription("");
        setPrice(0);
        setStock(0);
    };

    const editProduct = (e, productId) => {
        
        e.preventDefault();

        fetch(`http://localhost:4000/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stock: stock
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message === "Product updated successfully") {
                Swal.fire({
                    title: "Success!",
                    text: "Product successfully updated.",
                    icon: "success"
                });
                closeEdit();
                fetchData();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update product. Please try again.",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            console.error("Error updating product:", error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to update product.",
                icon: "error"
            });
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="productName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" required value={name} onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId="productDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId="productPrice">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId="productStock">
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control type="number" required value={stock} onChange={e => setStock(e.target.value)} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}