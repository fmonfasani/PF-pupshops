
import  { useContext } from "react";
import Image from "next/image"; 
import { cartContext } from "@/context/cartContext"; 
import { IProduct } from "@/Interfaces/ICart";

interface CartItemProps {
  product: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { removeFromCart } = useContext(cartContext);

  return (
    <div className="flex justify-between items-center border-b py-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={64}
        height={64}
        className="object-cover"
      />
      <div className="flex-grow ml-4">
        <h4 className="text-lg font-semibold">{product.name}</h4>
        <p className="text-gray-600">Precio: ${product.price}</p>
        <p className="text-gray-600">Cantidad: {product.quantity}</p>
      </div>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => removeFromCart(product.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
