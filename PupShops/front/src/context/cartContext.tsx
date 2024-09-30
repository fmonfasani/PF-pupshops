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
  proceedToBuy: async () => {},
  purchasedItems: [],
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isClient, setIsClient] = useState(false);

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

  const proceedToBuy = async () => {
    try {
      const storedUserSession = localStorage.getItem("userSession");
      if (!storedUserSession)
        throw new Error("No se encontró la sesión del usuario.");

      const { token, user } = JSON.parse(storedUserSession);

      if (!token) throw new Error("Token no disponible");

      const userId = user.id; // Ahora obtenemos el ID directamente del usuario
      if (!userId) throw new Error("ID de usuario no disponible");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, products: cartItems }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Error en la compra: ${response.statusText} - ${errorMessage}`
        );
      }

      setPurchasedItems([...purchasedItems, ...cartItems]);
      setCartItems([]);
      alert("Compra realizada con éxito!");
    } catch (error) {
      console.error("Error al proceder a la compra:", error);
      alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
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
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
