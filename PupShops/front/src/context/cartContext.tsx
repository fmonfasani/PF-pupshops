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
  originalTotal: 0,
  discountTotal: 0,
  proceedToBuy: async () => {},
  purchasedItems: [],
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
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
      const storedAuthData = localStorage.getItem("authData");
      if (!storedAuthData)
        throw new Error("No se encontró la sesión del usuario.");

      const { token, user } = JSON.parse(storedAuthData);
      if (!token) throw new Error("Token no disponible");

      const userId = user.id;
      if (!userId) throw new Error("ID de usuario no disponible");

      const response = await fetch(`http://localhost:3001/orders`, {
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
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Error en la compra: ${response.statusText} - ${errorMessage}`
        );
      }

      const result = await response.json();
      const updatedPurchasedItems = cartItems.map((item) => ({
        ...item,
        orderId: result.orderId,
      }));

      setPurchasedItems([...purchasedItems, ...updatedPurchasedItems]);
      setCartItems([]);
      alert("Compra realizada con éxito!");
    } catch (error) {
      console.error("Error al proceder a la compra:", error);
      alert("Hubo un problema al realizar la compra. Inténtalo de nuevo.");
    }
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce(
      (acc, item) => acc + (item.price * (item.quantity || 1) || 0),
      0
    );

    setOriginalTotal(sum);

    if (sum > 100) {
      const discount = sum * 0.1;
      setDiscountTotal(sum - discount);
    } else {
      setDiscountTotal(sum);
    }

    setTotal(sum);
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
        total: discountTotal,
        proceedToBuy,
        purchasedItems,
        originalTotal,
        discountTotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
