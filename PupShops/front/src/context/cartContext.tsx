"use client";

import { createContext, useEffect, useState } from "react";
import { ICartContextType, IProduct } from "@/Interfaces/ICart";
import { fetchProductsById } from "@/lib/servers/serverCart";

const addItemToCart = async (
  cartItems: IProduct[],
  productId: number
): Promise<IProduct[]> => {
  const data = await fetchProductsById(productId);
  return [...cartItems, data];
};

const removeItem = (cartItems: IProduct[], productId: number) => {
  return cartItems.filter((item) => item.id !== productId);
};

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

  useEffect(() => {
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
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  const addToCart = async (productId: number): Promise<boolean> => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct) {
      return false; // El producto ya está en el carrito
    }

    const updatedCart = await addItemToCart(cartItems, productId);
    setCartItems(updatedCart);
    return true; // Producto agregado
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = removeItem(cartItems, productId);
    setCartItems(updatedCart);
  };

  const proceedToBuy = async () => {
    try {
      const products = cartItems.map((item) => item.id);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes estar logueado para realizar la compra");
        return;
      }

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (response.ok) {
        alert("Compra exitosa");
        setPurchasedItems(cartItems);
        setCartItems([]);
      } else {
        const errorResponse = await response.json();
        alert("Error en la compra: " + errorResponse.message);
      }
    } catch (error) {
      alert("Error en el proceso: " + error);
    }
  };

  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  }, [cartItems]);

  return (
    <cartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        proceedToBuy,
        purchasedItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};