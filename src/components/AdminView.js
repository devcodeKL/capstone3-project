import { useEffect, useState } from 'react';
import { Image, Table, Container } from 'react-bootstrap';
import ArchiveProduct from './ArchiveProduct';
import Background from '../pages/Background';
import EditProduct from './EditProduct';

export default function AdminView({ products, fetchData }) {
    const [productRows, setProductRows] = useState([]);

    useEffect(() => {
        const rows = products.map(product => (
            <tr key={product._id} className="text-center">
                <td>
                    <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.inventoryStock}</td>
                <td className={product.isActive ? "text-success" : "text-danger"}>
                    {product.isActive ? "Available" : "Unavailable"}
                </td>
                <td><EditProduct product={product._id} fetchData={fetchData} /></td>
                <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td>  
            </tr>
        ));
        setProductRows(rows);
    }, [products, fetchData]);

    return (
        <Background imageUrl='/images/BG-01.png'>
            <Container className="AdminView d-flex flex-column align-items-center">
                <Image className="AdminViewImage" src="/images/AdminViewText-01.png" />
                <Table striped bordered hover responsive className="custom-table">
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Availability</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productRows}
                    </tbody>
                </Table>
            </Container>
        </Background>
    );
}