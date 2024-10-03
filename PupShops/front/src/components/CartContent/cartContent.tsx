"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import CartItem from "../CartItem/cartItem";
import CartBuy from "../CartBuy/cartBuy";

const CartContent: React.FC = () => {
  const { cartItems } = useContext(cartContext);

  return (
    <div className="cart-content">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <CartBuy />
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4">Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartContent;