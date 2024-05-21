import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import Background from './Background';
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {
        e.preventDefault();
        fetch(`http://localhost:4000/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.access !== "undefined") {
                    localStorage.setItem("token", data.access);
                    retrieveUserDetails(data.access);
                    Swal.fire({
                        title: "Login successful!",
                        text: "Welcome to Furry Tails!",
                        icon: "success"
                    });
                } else if (data.error === "No Email Found") {
                    Swal.fire({
                        title: "No email found!",
                        text: "Please register first.",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Authentication failed.",
                        text: "Check your login credentials",
                        icon: "error"
                    });
                }
            });
        setEmail('');
        setPassword('');
    }

    const retrieveUserDetails = (token) => {
        fetch(`http://localhost:4000/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });
            });
    }

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        (user.id !== null) ?
            <Navigate to="/products" />
            :
            <Background imageUrl='/images/BG-01.png'>
                <div className="LoginDiv">
                    <Card style={{ width: "50rem", height: "auto" }} className="LoginCard">
                        <div className="center-image">
                            <Image className="LoginTitle" src="/images/Login-07.png" />
                        </div>
                        <Form onSubmit={(e) => authenticate(e)}>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Col className="LoginBtn">
                                {isActive ?
                                    <Button variant="primary" type="submit" id="submitBtn" className="w-100" style={{ padding: '10px', border: 'none' }}>Submit</Button>
                                    :
                                    <Button variant="primary" type="submit" id="submitBtn" disabled className="w-100" style={{ padding: '10px', border: 'none' }}>Submit</Button>
                                }
                            </Col>

                            <p className="mt-3 text-center">Don't have an account yet? <Link to="/register">Click here</Link> to register.</p>
                        </Form>
                    </Card>
                </div>
            </Background>
    )
}