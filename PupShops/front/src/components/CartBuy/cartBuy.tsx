import React, { useContext, useState } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy: React.FC = () => {
  const { proceedToBuy, cartItems, total, clearCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleBuyClick = async () => {
    setLoading(true);
    console.log("Iniciando el proceso de compra...");
    debugger; // Verificar el inicio del proceso
    try {
      const result = await proceedToBuy();
      console.log("Resultado de proceedToBuy:", result);
      debugger; // Verificar el resultado de proceedToBuy

      if (!result) {
        console.error("No se pudo proceder con la compra.");
        return;
      }

      const { orderId, finalTotal } = result;
      console.log("orderId obtenido:", orderId);
      console.log("finalTotal obtenido:", finalTotal);
      debugger; // Verificar valores de orderId y finalTotal

      if (!orderId) {
        console.error("orderId no está definido.");
        return;
      }

      const purchasedItems = cartItems.map((item) => ({
        ...item,
        orderId,
      }));

      console.log("Items comprados:", purchasedItems);
      debugger; // Verificar los items comprados
      localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));

      const purchaseItem = {
        type: "products",
        title: "Compra Pupshops",
        orderId: orderId,
        quantity: purchasedItems[0].quantity,
        unit_price: finalTotal,
      };

      console.log(
        "Objeto de compra para la preferencia de pago:",
        purchaseItem
      );
      debugger; // Verificar el objeto purchaseItem
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseItem),
        }
      );

      const data = await response.json();
      console.log("Respuesta de la API:", data);
      debugger; // Verificar la respuesta de la API

      if (response.ok) {
        setPaymentLink(data.init_point);
        console.log("Redirigiendo a:", data.payment.init_point);
        debugger;

        clearCart();

        window.location.href = data.payment.init_point;
      } else {
        console.error(
          "Error en la creación de la preferencia de pago:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-buy mt-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Total: <span className="text-teal-600">${total.toFixed(2)}</span>
      </h2>
      <button
        onClick={handleBuyClick}
        className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Comprar"}
      </button>
      {paymentLink && (
        <a
          href={paymentLink}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-orange-300 flex items-center justify-center"
        >
          Redirigiéndote a Mercado Pago
        </a>
      )}
    </div>
  );
};

export default CartBuy;
