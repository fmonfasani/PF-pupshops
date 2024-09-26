"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import CartItem from "@/components/CartItem/cartItem";
import CartBuy from "@/components/CartBuy/cartBuy";

const CartContent = () => {
  const { cartItems, total } = useContext(cartContext);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Carrito de Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="mt-4">
        <span className="font-bold">Total: ${total.toFixed(2)}</span>
      </div>
      <CartBuy />
    </div>
  );
};

export default CartContent;
