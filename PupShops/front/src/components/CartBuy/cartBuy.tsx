"use client";

import React, { useContext, useState } from "react";
import { cartContext } from "@/context/cartContext";

const CartBuy: React.FC = () => {
  const { proceedToBuy, total } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleBuyClick = async () => {
    setLoading(true);
    try {
      // Recuperar purchasedItems del localStorage
      const storedItems = localStorage.getItem("purchasedItems");
      if (!storedItems) {
        console.error("No hay items de compra en el localStorage.");
        setLoading(false);
        return;
      }

      // Convertir la cadena JSON a un array de objetos
      const purchasedItems = JSON.parse(storedItems);

      // Aquí asumimos que solo necesitas el primer item para crear el purchaseItem
      // Puedes ajustar esto según tu lógica
      const purchaseItem = {
        type: "products",
        title: purchasedItems[0].title, // Usa el título del primer producto
        orderId: purchasedItems[0].orderId, // Usa el orderId del primer producto
        quantity: purchasedItems[0].quantity, // Usa la cantidad del primer producto
        unit_price: total // Aquí usamos el total
      };

      // Enviar la solicitud POST al backend
      const response = await fetch("http://localhost:3001/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(purchaseItem)
      });

      const data = await response.json();

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        // Guardar el link de pago para redirigir
        setPaymentLink(data.payment.init_point);
        // Redirigir al usuario a la página de pago de Mercado Pago
        window.location.href = data.payment.init_point;
      } else {
        console.error("Error:", data.message);
        // Manejo de errores (puedes mostrar un mensaje al usuario)
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Manejo de errores (puedes mostrar un mensaje al usuario)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-buy mt-6">
      {/* Aumentar el margen superior */}
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
      {/* Botón de Mercado Pago */}
      {paymentLink && (
        <a
          href={paymentLink}
          className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-orange-300 flex items-center justify-center"
        >
          Redirigiendote a Mercado Pago
        </a>
      )}
    </div>
  );
};

export default CartBuy;
