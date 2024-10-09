"use client";

import React, { useContext, useState } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy: React.FC = () => {
  const { proceedToBuy, cartItems, originalTotal, discountTotal } =
    useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleBuyClick = async () => {
    setLoading(true);
    try {
      await proceedToBuy();
      const storedPurchasedItems = localStorage.getItem("purchasedItems");
      if (!storedPurchasedItems) {
        console.error("No hay items de compra en el localStorage.");
        return;
      }

      const purchasedItems = JSON.parse(storedPurchasedItems);

      if (purchasedItems.length === 0) {
        console.error("No se encontraron items comprados.");
        return;
      }

      const purchaseItem = {
        type: "products",
        title: purchasedItems[0].title,
        orderId: purchasedItems[0].orderId,
        quantity: purchasedItems[0].quantity,
        unit_price: discountTotal,
      };

      const response = await fetch("http://localhost:3001/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseItem),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentLink(data.payment.init_point);
        window.location.href = data.payment.init_point;
      } else {
        console.error("Error:", data.message);
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
        Precio original:{" "}
        <span className="text-red-600">${originalTotal.toFixed(2)}</span>
      </h2>
      {originalTotal > 100 && (
        <h2 className="text-lg font-semibold text-gray-800">
          Precio con descuento:{" "}
          <span className="text-teal-600">${discountTotal.toFixed(2)}</span>
        </h2>
      )}
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
