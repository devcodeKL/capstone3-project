import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProducts(props) {
    const { data, breakPoint } = props;

    const { _id, name, description, price, imageUrl } = data;

    return (
        <Col xs={12} md={breakPoint} className="my-3">
            <Card className="CardHighlight m-2">
                <img src={imageUrl} className="CardImgTop" alt={name} />

                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/products/${_id}`}>{ name }</Link>
                    </Card.Title>

                    <Card.Text className="text-center">
                        {description}
                    </Card.Text>
                </Card.Body>

                <Card.Footer className="CardFooter">
                    <h5 className="text-center">PhP {price}</h5>
                    <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}