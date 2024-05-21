import React, { useCallback, useContext, useEffect, useState } from "react";
import AdminView from '../components/AdminView';
import Background from './Background';
import UserContext from '../UserContext';
import UserView from '../components/UserView';

export default function Products() {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    const fetchData = useCallback(() => {
        const fetchUrl = user.isAdmin === true ? `http://localhost:4000/products/all` : `http://localhost:4000/products/active`;

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data.product);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            setProducts([]);
        });
    }, [user.isAdmin]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Background imageUrl="/images/BG-01.png">
            {user.isAdmin ? 
                <AdminView products={products} fetchData={fetchData} /> :
                <UserView products={products} />
            }
        </Background>
    );
}