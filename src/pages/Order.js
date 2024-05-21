import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import Background from './Background';
import UserContext from "../UserContext";

export default function OrderHistory() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [permissionErrorMessage, setPermissionErrorMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = `http://localhost:4000/order/my-orders`;
                if (user.isAdmin) {
                    url = `http://localhost:4000/order/all-orders`;
                }
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('Forbidden: You do not have permission to access this resource.');
                    }
                    throw new Error('Network response was not ok');
                }

                const ordersData = await response.json();
                console.log("Received orders data:", ordersData);

                if (!Array.isArray(ordersData.orders)) {
                    console.error("Invalid response format: ordersData.orders is not an array");
                    return;
                }

                formatAndSetOrders(ordersData.orders);
            } catch (error) {
                console.error('Error retrieving orders:', error);
                if (error.message.includes('Forbidden')) {
                    setPermissionErrorMessage('You do not have permission to access this resource.');
                }
            }
        };

        const formatAndSetOrders = async (ordersData) => {
            try {
                const formattedOrders = [];
                for (const order of ordersData) {
                    const formattedOrder = {
                        _id: order._id,
                        totalPrice: order.totalPrice,
                        orderedOn: new Date(order.orderedOn).toLocaleString('en-US', {
                            timeZone: 'Asia/Manila',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }),
                        productsOrdered: await Promise.all(order.productsOrdered.map(async product => ({
                            productId: product.productId,
                            quantity: product.quantity,
                            subtotal: product.subtotal,
                            productName: await fetchProductName(product.productId)
                        })))
                    };
                    formattedOrders.push(formattedOrder);
                }

                setOrders(formattedOrders);
            } catch (error) {
                console.error('Error formatting orders:', error);
            }
        };

        const fetchProductName = (productId) => {
            return fetch(`http://localhost:4000/products/${productId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        return null;
                    }
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(productData => {
                return productData ? productData.product.name : "Unknown Product";
            })
            .catch(error => {
                console.error('Error retrieving product name:', error);
                return "Unknown Product";
            });
        };

        fetchOrders();
    }, [user]);

    return (
        <Background imageUrl='/images/BG-01.png'>
            <Container className="OrderContainer mt-5" style={{ marginBottom: "150px" }}>
                <Image className="OrderHistoryImage" src="/images/OrderHistoryText-03.png" />
                {permissionErrorMessage && <p>{permissionErrorMessage}</p>}
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map(order => (
                        <Card key={order._id} className="OrderContainerCard mb-3">
                            <Card.Body>
                                <Card.Title>Order ID: {order._id}</Card.Title>
                                <Card.Text>Total Price: PhP {order.totalPrice}</Card.Text>
                                <Card.Text>Date: {order.orderedOn}</Card.Text>
                                <ul>
                                    {order.productsOrdered.map(item => (
                                        <li key={item.productId}>
                                            {item.quantity} x {item.productName}
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>
        </Background>
    );
}