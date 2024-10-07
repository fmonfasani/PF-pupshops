"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toysDogArray from "@/helpers/toysDogArray";

const ITEMS_PER_PAGE = 5;

export default function ToysDog() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de inicio y fin de los productos en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = toysDogArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(toysDogArray.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl text-center mt-24 font-bold mb-4">
        Juguetes para Perro
      </h1>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/Categorias/Juguetes/Gato")}
          >
            <Image
              src={product.imgUrl}
              alt={String(product.id)}
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.id}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              className="mt-2 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Agregando ${product.id} al carrito`);
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
            className={`mx-1 px-3 py-1 rounded-md ${
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
}
