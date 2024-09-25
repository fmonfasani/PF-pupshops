"use client";

import React, { useState, useContext } from "react";
import clothesCatArray from "@/helpers/clothesCatArray";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cartContext } from "@/context/cartContext";

const ITEMS_PER_PAGE = 5;

const ClothesCat: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useContext(cartContext); // Accedemos a addToCart del contexto
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = clothesCatArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(clothesCatArray.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl text-center font-bold mb-4">Ropa para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-full"
            onClick={() => router.push("/Categorias/Ropa/Gato")}
          >
            <div className="flex flex-col items-center">
              <Image
                src={product.imgUrl}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain rounded-md w-full h-60 mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <button
              className="mt-auto bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
              onClick={async (e) => {
                e.stopPropagation(); // Evita que el evento de click se propague al div contenedor
                const success = await addToCart(product.id); // Llamamos a addToCart con el id
                if (success) {
                  alert(`${product.name} ha sido agregado al carrito`);
                } else {
                  alert(`${product.name} ya está en el carrito`);
                }
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-3 px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-teal-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClothesCat;
