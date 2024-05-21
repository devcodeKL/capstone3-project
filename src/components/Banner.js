import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Banner({ data }) {

    console.log(data);
    const { content, destination, label } = data;

    return (
        <Row>
            <Col className="BannerColumn p-5 text-center">
                <img src="/images/MainTitle-09.png" alt="Furry Tails Logo" className="BannerTitle" />
                <p className="BannerContent">{content}</p>
                <Link className="btn btn-primary" to={destination}>{label}</Link>
            </Col>
        </Row>
    )
}
