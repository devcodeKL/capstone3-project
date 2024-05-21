import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import SearchByPrice from './SearchByPrice';

export default function UserView({ products }) {
    const [productCards, setProductCards] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const activeProducts = products.filter(product => product.isActive);
            const cards = activeProducts.map(product => (
                <ProductCard key={product._id} product={product} />
            ));
            setProductCards(cards);
        }
    }, [products]);

    return (
        <>
            <img src={"/images/AvailableProducts-06.png"} alt="ProductsAvail" className="AvailableProducts" />
            <ProductSearch />
            <SearchByPrice />
            <div className="row" style={{ marginBottom: "150px" }}>
                {productCards}
            </div>
        </>
    );
}