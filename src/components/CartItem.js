import React from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function CartItem({ item, decrementQuantity, handleQuantityChange, incrementQuantity, handleRemoveItem }) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{item.productName}</Card.Title>
                <Card.Img src={item.imageUrl} alt={item.productName} className="CartImage" />
                <Card.Text>Price: PhP {item.subtotal / item.quantity}</Card.Text>
                <div>Quantity: 
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Button variant="primary" onClick={() => decrementQuantity(item.productId)}>-</Button>
                        <Form.Control 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                            style={{ width: "70px", textAlign: "center", margin: "0 5px" }}
                            min="1" 
                        />
                        <Button variant="primary" onClick={() => incrementQuantity(item.productId)}>+</Button>
                    </div>
                </div>
                <Card.Text className="mt-3">Subtotal: PhP {item.subtotal}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveItem(item.productId)}>Remove Item</Button>
            </Card.Body>
        </Card>
    );
}