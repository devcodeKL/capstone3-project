import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

export default function Footer() {
    return (
        <footer className="footer mt-4 py-1 fixed-bottom">
            <Container>
                <Row>
                    <Col>
                        <div className="text-center">
                            <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
                            <img src="/images/twitter.png" alt="Twitter" className="social-icon" />
                            <img src="images/instagram.png" alt="Instagram" className="social-icon" />
                            <img src="/images/linkedin.png" alt="LinkedIn" className="social-icon" />
                            <img src="/images/google.png" alt="Google" className="social-icon" />
                        </div>
                        <p className="text-center mb-4">&copy; 2024 Furry Tails. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}