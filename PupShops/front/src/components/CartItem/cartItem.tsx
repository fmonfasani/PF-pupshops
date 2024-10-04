"use client";

import React, { useContext, useState } from "react";
import { cartContext } from "@/context/cartContext";
import { IProduct } from "@/Interfaces/ICart";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface CartItemProps {
  item: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useContext(cartContext);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleRemoveClick = () => {
    removeFromCart(item.id);
  };

  const updateQuantity = (operation: "increment" | "decrement") => {
    setQuantity((prevQuantity) =>
      operation === "increment"
        ? prevQuantity + 1
        : Math.max(prevQuantity - 1, 1)
    );
  };

  return (
    <div className="cart-item flex items-center border-b p-4">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={100}
        height={100}
        className="rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-lg font-light">
          Precio:{" "}
          <span className="text-teal-600">${item.price.toFixed(2)}</span>
        </p>
        <div className="flex items-center space-x-4">
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => updateQuantity("decrement")}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => updateQuantity("increment")}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleRemoveClick}
        className="ml-4 text-teal-600 hover:text-orange-300 transition"
      >
        <FaTrash size={24} />
      </button>
    </div>
  );
};

export default CartItem;
