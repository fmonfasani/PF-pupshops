"use client";

import React, { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import { IProduct } from "@/Interfaces/ICart";
import Image from "next/image"; // Importa el componente Image de Next.js
import { FaTrash } from "react-icons/fa"; // Asegúrate de tener react-icons instalado

interface CartItemProps {
  item: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useContext(cartContext);

  const handleRemoveClick = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item flex items-center border-b p-4">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={100} // Aumenta el tamaño de la imagen
        height={100} // Aumenta el tamaño de la imagen
        className="rounded-md mr-4"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-lg font-bold">
          Precio:{" "}
          <span className="text-teal-600">${item.price.toFixed(2)}</span>
        </p>
      </div>
      <button
        onClick={handleRemoveClick}
        className="ml-4 text-teal-600 hover:text-orange-300 transition"
      >
        <FaTrash size={24} /> {/* Icono de papelera */}
      </button>
    </div>
  );
};

export default CartItem;
