"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy = () => {
  const { proceedToBuy } = useContext(cartContext);

  const handleBuy = async () => {
    await proceedToBuy();
  };

  return (
    <button
      onClick={handleBuy}
      className="mt-4 p-2 bg-blue-500 text-white rounded"
    >
      Comprar
    </button>
  );
};

export default CartBuy;
