import { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/products/active`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                console.log(data.product);
                console.log(data.product.length);

                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.product.length);
                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                }
                for (let i = 0; i < 5; i++) {
                    generateRandomNums();
                    featured.push(
                        <PreviewProducts data={data.product[numbers[i]]} key={data.product[numbers[i]]._id} breakPoint={2} />
                    )
                }
                setPreviews(featured);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <>
            <img src={"/images/FeaturedTitle-10.png"} alt="Featured" className="FeaturedTitle" />
            <CardGroup className="justify-content-center">
                {previews}
            </CardGroup>
        </>
    );
}