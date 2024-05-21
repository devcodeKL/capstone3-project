import React, { useContext, useState } from 'react';
import { Button, Card, Col, Form, Image } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Background from './Background';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function registerUser(e) {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || mobileNo === '' || password === '' || confirmPassword === '') {
            Swal.fire({
                title: 'Missing fields',
                text: 'Please fill in all the required fields.',
                icon: 'error',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Passwords do not match',
                text: 'Please make sure your passwords match.',
                icon: 'error',
            });
            return;
        }

        if (mobileNo.length !== 11) {
            Swal.fire({
                title: 'Invalid mobile number',
                text: 'Please enter a valid 11-digit mobile number.',
                icon: 'error',
            });
            return;
        }

        fetch(`http://localhost:4000/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Registered Successfully') {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMobileNo('');
                    setPassword('');
                    setConfirmPassword('');

                    Swal.fire({
                        title: 'Registration successful!',
                        text: 'Your registration has been successful.',
                        icon: 'success',
                    });

                    setRedirect(true);
                } else {
                    Swal.fire({
                        title: 'Registration failed',
                        text: 'Something went wrong during registration.',
                        icon: 'error',
                    });
                }
            });
    }

    return (
        <>
            {user.id !== null || redirect ? (
                <Navigate to="/login" />
            ) : (
                <Background imageUrl="/images/BG-01.png">
                    <div className="Register">
                        <Card style={{ width: '50rem', height: 'auto' }} className="RegisterCard">
                            <div className="RegisterCardDiv">
                                <Form onSubmit={e => registerUser(e)}>
                                    <Image className="RegisterTitle" src="/images/Register-08.png" />
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required
                                            onInvalid={() => {
                                                Swal.fire({
                                                    title: 'Missing fields',
                                                    text: 'Please fill in all the required fields.',
                                                    icon: 'error',
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Last Name"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required
                                            onInvalid={() => {
                                                Swal.fire({
                                                    title: 'Missing fields',
                                                    text: 'Please fill in all the required fields.',
                                                    icon: 'error',
                                                });
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter 11 digit number"
                                            value={mobileNo}
                                            onChange={e => setMobileNo(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Col className="text-center, mt-3">
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            id="submitBtn"
                                            className="w-100"
                                            style={{ padding: '10px', border: 'none' }}
                                        >
                                            Please enter your registration details
                                        </Button>
                                    </Col>
                                    <p className="mt-3 text-center">
                                        Already have an account? <Link to="/login">Click here</Link> to log in.
                                    </p>
                                </Form>
                            </div>
                        </Card>
                    </div>
                </Background>
            )}
        </>
    );
}