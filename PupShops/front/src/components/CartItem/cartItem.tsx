"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import { IProduct } from "@/Interfaces/ICart"; // Asegúrate de que esta ruta sea correcta

interface CartItemProps {
  item: IProduct; // Especificar que 'item' es del tipo IProduct
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useContext(cartContext);

  return (
    <li className="flex justify-between items-center">
      <span>{item.name}</span>
      <span>${item.price}</span>
      <input
        type="number"
        value={item.quantity}
        readOnly
        className="w-16 text-center"
      />
      <button onClick={() => removeFromCart(item.id)} className="text-red-500">
        Eliminar
      </button>
    </li>
  );
};

export default CartItem;
