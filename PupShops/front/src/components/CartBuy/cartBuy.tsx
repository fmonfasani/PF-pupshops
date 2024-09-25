
import { useContext } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy: React.FC = () => {
  const { total, proceedToBuy } = useContext(cartContext);

  const handleBuy = async () => {
    await proceedToBuy();
  };

  return (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-xl font-bold">Resumen del carrito</h3>
      <p className="text-lg">Total: ${total}</p>
      <button
        onClick={handleBuy}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Proceder a comprar
      </button>
    </div>
  );
};

export default CartBuy;
