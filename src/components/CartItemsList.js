import React from "react";
import CartItem from "./CartItem";

export default function CartItemsList({ cartItems, decrementQuantity, handleQuantityChange, incrementQuantity, handleRemoveItem }) {
    return (
        <>
            {cartItems.map(item => (
                <CartItem 
                    key={item.productId} 
                    item={item} 
                    decrementQuantity={decrementQuantity} 
                    handleQuantityChange={handleQuantityChange} 
                    incrementQuantity={incrementQuantity} 
                    handleRemoveItem={handleRemoveItem} 
                />
            ))}
        </>
    );
}