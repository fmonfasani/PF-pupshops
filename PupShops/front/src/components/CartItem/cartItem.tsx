"use client";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import { IProduct } from "@/Interfaces/ICart";
import Image from "next/image";

interface CartItemProps {
  item: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart } = useContext(cartContext);

  return (
    <li className="flex justify-between items-center py-2 border-b">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={64}
        height={64}
        className="mr-4"
      />
      <span className="flex-1">{item.name}</span>
      <span>${item.price}</span>
      <input
        type="number"
        value={item.id}
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
