"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy = () => {
  const { proceedToBuy } = useContext(cartContext);

  const handleBuy = async () => {
    try {
      await proceedToBuy();
    } catch (error) {
      console.error("Error al proceder con la compra:", error);
      alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="mt-4 p-2  bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
    >
      Comprar
    </button>
  );
};

export default CartBuy;
