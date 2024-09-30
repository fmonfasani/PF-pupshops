"use client";

import React, { useContext } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy: React.FC = () => {
  const { proceedToBuy, total } = useContext(cartContext);

  const handleBuyClick = async () => {
    await proceedToBuy();
  };

  return (
    <div className="cart-buy mt-6">
      {" "}
      {/* Aumentar el margen superior */}
      <h2 className="text-lg font-semibold text-gray-800">
        Total: <span className="text-teal-600">${total.toFixed(2)}</span>
      </h2>
      <button
        onClick={handleBuyClick}
        className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
      >
        Comprar
      </button>
    </div>
  );
};

export default CartBuy;
