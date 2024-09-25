"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import CartItem from "@/components/CartItem/cartItem";
import CartBuy from "@/components/CartBuy/cartBuy";

const CartContent: React.FC = () => {
  const { cartItems } = useContext(cartContext);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <>
          {cartItems.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          <CartBuy />
        </>
      )}
    </div>
  );
};

export default CartContent;
