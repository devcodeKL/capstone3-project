import Background from "./Background"
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from '../components/Footer'; 
import Highlights from "../components/Highlights";

export default function Home() {

    const data = {
        title: "FURRY TAILS: YOUR PET'S PARADISE",
        content: "Welcome to Furry Tails, your one-stop destination for all your pet supplies needs!",
        destination: "/products",
        label: "Start Shopping"
    }

    return (
        <Background imageUrl='/images/BG-01.png'>
            <Banner data={data}/>
            <Highlights />
            <div className="FeaturedContainer" style={{ marginBottom: '150px' }}>
                <FeaturedProducts />
            </div>
            <Footer />
        </Background>
    )
}