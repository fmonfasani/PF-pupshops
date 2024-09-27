"use client";

import { createContext, useEffect, useState } from "react";
import { ICartContextType, IProduct } from "@/Interfaces/ICart";
import { fetchProductsById } from "@/lib/servers/serverCart";




const addItemToCart = async (
  cartItems: IProduct[],
  productId: number,
  quantity: number
): Promise<IProduct[]> => {
  const existingProduct = cartItems.find((item) => item.id === productId);

  if (existingProduct) {
  
    return cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + quantity }
        : item
    );
  }

  
  const data = await fetchProductsById(productId);
  return [...cartItems, { ...data, quantity }];

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
            ? { ...item, quantity: (existingProduct.quantity ?? 0) + quantity }
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

      const products = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity || 1,
      }));

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes estar logueado para realizar la compra");
        return;
      }


      const response = await fetch("http://localhost:3001/orders", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: token, products }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Compra realizada con éxito");
        setPurchasedItems(result);
        setCartItems([]);
      } else {
        const errorMessage = await response.text();
        throw new Error(`Error en la compra: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al proceder a la compra:", error);
      alert("Error al realizar la compra");
    }
  };

  useEffect(() => {

    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
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
