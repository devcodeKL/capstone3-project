import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    console.log(user);

    return (
        <Navbar className="Navbar" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home" as={NavLink} to="/">
                        <img src={`/images/navbar-logo.png`} alt="Furry Tails Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                        {user.id !== null ? (
                            user.isAdmin ? (
                                <>
                                    <Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
                                    <Nav.Link as={Link} to="/order">Orders</Nav.Link>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                                    <Nav.Link as={Link} to="/order">My Orders</Nav.Link>
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                </>
                            )
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}