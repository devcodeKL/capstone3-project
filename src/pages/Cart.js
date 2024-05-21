import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Background from './Background';
import CartItemsList from "../components/CartItemsList";
import Checkout from "./Checkout";
import UserContext from "../UserContext";

export default function Cart() {
    const { user } = useContext(UserContext);

    const [cartData, setCartData] = useState({
        cartItems: [],
        totalPrice: 0
    });
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        fetch(`http://localhost:4000/cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.userCart && data.userCart.length > 0) {
                const { cartItems, totalPrice } = data.userCart[0];
                
                const fetchProductDetails = async () => {
                    const updatedCartItems = [];
                    for (const item of cartItems) {
                        try {
                            const response = await fetch(`http://localhost:4000/products/${item.productId}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            });
                            const productData = await response.json();
                            item.productName = productData.product.name;
                            item.imageUrl = productData.product.imageUrl;
                            updatedCartItems.push(item);
                        } catch (error) {
                            console.error(`Error fetching product details for product ID ${item.productId}:`, error);
                        }
                    }
                    
                    setCartData({ cartItems: updatedCartItems, totalPrice });
                };

                fetchProductDetails();
            } else {
                console.error('Cart items not found in response');
                setCartData({ cartItems: [], totalPrice: 0 });
            }
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
            setCartData({ cartItems: [], totalPrice: 0 });
        });
    };

    const updateCartItemQuantity = (formattedItems) => {
        fetch(`http://localhost:4000/cart/updateQuantity`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedItems)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update item quantity');
            }
            return res.json();
        })
        .then(data => {
            if (data.cart && data.cart.cartItems && data.cart.totalPrice) {
                const updatedCartItems = data.cart.cartItems.map(item => {
                    const foundItem = formattedItems.find(i => i.productId === item.productId);
                    if (foundItem) {
                        item.productName = foundItem.productName;
                        item.imageUrl = foundItem.imageUrl;
                    }
                    return item;
                });

                setCartData({
                    cartItems: updatedCartItems,
                    totalPrice: data.cart.totalPrice
                });
            } else {
                console.error('Invalid response format:', data);
            }
        })
        .catch(error => {
            console.error('Error updating item quantity:', error);
        });
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCartItems = cartData.cartItems.map(item => {
            if (item.productId === productId) {
                item.quantity = newQuantity;
            }
            return item;
        });

        updateCartItemQuantity(updatedCartItems);
    };

    const decrementQuantity = (productId) => {
        const updatedCartItems = cartData.cartItems.map(item => {
            if (item.productId === productId && item.quantity > 1) {
                item.quantity--;
            }
            return item;
        });

        updateCartItemQuantity(updatedCartItems);
    };

    const incrementQuantity = (productId) => {
        const updatedCartItems = cartData.cartItems.map(item => {
            if (item.productId === productId) {
                item.quantity++;
            }
            return item;
        });

        updateCartItemQuantity(updatedCartItems);
    };

    const handleRemoveItem = (productId) => {
        fetch(`http://localhost:4000/cart/${productId}/removeFromCart`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id })
        })
        .then(res => res.json())
        .then(data => {
            setCartData({
                cartItems: data.cartItems,
                totalPrice: data.totalPrice
            });
        })
        .catch(error => {
            console.error('Error removing item from cart:', error);
        });
    };

    const handleCheckout = () => {
        setShowCheckoutForm(true);
    };

    return (
        <Background imageUrl="/images/BG-01.png">
            <Container className="Cart mt-5" style={{ marginBottom: "150px" }}>
                <img src={"/images/ShoppingCart-11.png"} alt="Featured" className="ShoppingTitle" />
                {cartData.cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <CartItemsList 
                        cartItems={cartData.cartItems} 
                        decrementQuantity={decrementQuantity} 
                        handleQuantityChange={handleQuantityChange} 
                        incrementQuantity={incrementQuantity} 
                        handleRemoveItem={handleRemoveItem} 
                    />
                )}
                {cartData.cartItems.length > 0 && (
                    <>
                        <p>Total Price: PhP {cartData.totalPrice}</p>
                        {user.id !== null && !showCheckoutForm && (
                            <div className="mt-2 mb-2">
                                <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                            </div>
                        )}
                        {showCheckoutForm && <Checkout />}
                    </>
                )}
                {user.id === null && (
                    <p>Please log in to proceed to checkout.</p>
                )}
                {showCheckoutForm || (
                    <Button variant="secondary" as={Link} to="/products">Continue Shopping</Button>
                )}
            </Container>
        </Background>
    );
}