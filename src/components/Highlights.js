import { Carousel, Card, Container } from 'react-bootstrap';

export default function Highlights() {
    return (
        <Container>
            <Carousel interval={3000} indicators={false}>
                <Carousel.Item>
                    <div className="CarouselDiv">
                        <Card.Img src="/images/banner-grooming.png" alt="Grooming Products" />
                        <div className="CarouselCaption1">
                            <h2>GROOMING PRODUCTS</h2>
                            <p>
                                KEEP YOUR FURRY FRIEND LOOKING THEIR BEST WITH OUR SELECTION OF PREMIUM GROOMING PRODUCTS. FROM SHAMPOOS AND BRUSHES TO NAIL CLIPPERS AND EAR CLEANERS, WE HAVE EVERYTHING YOU NEED TO MAINTAIN YOUR PET'S HYGIENE AND APPEARANCE.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="CarouselDiv">
                        <Card.Img src="/images/banner-toys.png" alt="Toys" />
                        <div className="CarouselCaption2">
                            <h2>TOYS</h2>
                            <p>
                                KEEP YOUR PET ENTERTAINED AND MENTALLY STIMULATED WITH OUR RANGE OF HIGH-QUALITY TOYS. FROM SQUEAKY BALLS AND PLUSHIES TO INTERACTIVE PUZZLES AND CHEW TOYS, WE OFFER A VARIETY OF OPTIONS TO KEEP YOUR PET ACTIVE AND ENGAGED.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="CarouselDiv">
                        <Card.Img src="/images/banner-treats.png" alt="Treats" />
                        <div className="CarouselCaption3">
                            <h2>TREATS</h2>
                            <p>
                                REWARD YOUR FURRY COMPANION WITH DELICIOUS AND NUTRITIOUS TREATS FROM OUR SELECTION. WHETHER YOUR PET PREFERS CRUNCHY BISCUITS OR SOFT CHEWS, WE HAVE A WIDE RANGE OF FLAVORS  AND INGREDIENTS TO CHOOSE FROM, ENSURING A TASTY AND SATISFYING SNACK FOR YOUR PET.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="CarouselDiv">
                        <Card.Img src="/images/banner-shipping.png" alt="Shipping" />
                        <div className="CarouselCaption4">
                            <h2>SHIPPING</h2>
                            <p>
                                ENJOY FAST AND RELIABLE SHIPPING FOR ALL YOUR PET'S NEEDS. FROM ESSENTIAL FOOD ITEMS TO TOYS AND ACCESSORIES, WE DELIVER TO YOUR DOORSTEP WITH CARE AND EFFICIENCY. OUR SHIPPING OPTIONS ENSURE THAT YOUR PET NEVER RUNS OUT OF THEIR FAVORITE PRODUCTS, MAKING IT EASY TO MAINTAIN THEIR HEALTH AND HAPPINESS.
                            </p>
                        </div>
                    </div>
                </Carousel.Item>

            </Carousel>
        </Container>
    );
}