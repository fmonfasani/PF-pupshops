"use client";

import { createContext, useEffect, useState } from "react";
import { ICartContextType } from "@/Interfaces/ICart";
import { IProduct } from "@/Interfaces/ICart";
import { fetchProductsById } from "@/lib/servers/serverCart";

//TODO Poner productillo 

const addItemToCart = async (
  cartItems: IProduct[],
  product: number
): Promise<IProduct[]> => {
  const data = await fetchProductsById(product.toString());
  return [...cartItems, data];
};

//TODO Eliminar producto

const removeItem = (cartItems: IProduct[], product: number) => {
  return cartItems.filter((item) => item.id !== product);
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

  //! Cargar datos del localStorage al montar el componente
  
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

  
  const addToCart = async (product: number): Promise<boolean> => {
    const existingProduct = cartItems.find((item) => item.id === product);

    if (existingProduct) {
      return false; 
    }

    const updatedCart = await addItemToCart(cartItems, product);
    setCartItems(updatedCart);
    return true;
  };

  
  const removeFromCart = (product: number) => {
    const updatedCart = removeItem(cartItems, product);
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
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
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
