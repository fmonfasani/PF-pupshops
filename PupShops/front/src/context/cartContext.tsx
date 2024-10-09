"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { ICartContextType, IProduct } from "@/Interfaces/ICart";
import { fetchProductsById } from "@/lib/servers/serverCart";
import { UserContext } from "@/context/userContext";

export const cartContext = createContext<ICartContextType>({
  cartItems: [],
  addToCart: async () => false,
  removeFromCart: () => {},
  total: 0,
  proceedToBuy: async () => null,
  purchasedItems: [],
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsClient(true);
    const storedCartItems = localStorage.getItem("cartItems");
    const storedPurchasedItems = localStorage.getItem("purchasedItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    if (storedPurchasedItems) {
      setPurchasedItems(JSON.parse(storedPurchasedItems));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
    }
  }, [purchasedItems, isClient]);

  const addToCart = async (
    productId: number,
    quantity: number = 1
  ): Promise<boolean> => {
    try {
      const existingProduct = cartItems.find((item) => item.id === productId);
      let updatedCartItems;

      if (existingProduct) {
        updatedCartItems = cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: (existingProduct.quantity || 0) + quantity }
            : item
        );
      } else {
        const productData = await fetchProductsById(productId);
        updatedCartItems = [...cartItems, { ...productData, quantity }];
      }

      setCartItems(updatedCartItems);
      return true;
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      return false;
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const proceedToBuy = async (): Promise<{
    orderId: string;
    finalTotal: number;
  } | null> => {
    try {
      const storedAuthData = localStorage.getItem("authData");
      if (!storedAuthData)
        throw new Error("No se encontró la sesión del usuario.");

      const { token, user } = JSON.parse(storedAuthData);
      if (!token) throw new Error("Token no disponible");

      const userId = user.id;
      if (!userId) throw new Error("ID de usuario no disponible");

      console.log("Enviando solicitud para crear la orden...");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            products: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity || 1,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la orden.");
      }

      const result = await response.json();
      console.log("Respuesta del backend de la orden creada:", result);
      debugger; // Verificar el resultado de la creación de la orden

      // Asegúrate de acceder correctamente al orderId
      const orderId = result.order[0].order.id; // Aquí es donde obtienes el orderId
      console.log("orderId obtenido:", orderId); // Agregar este log para ver el orderId

      return {
        orderId: orderId,
        finalTotal: result.finalTotal,
      };
    } catch (error) {
      console.error("Error en la compra:", error);
      return null;
    }
  };

  const calculateTotal = () => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + (item.price * (item.quantity || 1) || 0),
      0
    );
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        total,
        proceedToBuy,
        purchasedItems,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
