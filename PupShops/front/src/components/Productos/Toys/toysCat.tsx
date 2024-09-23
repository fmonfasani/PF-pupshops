"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toysCatArray from "@/helpers/toysCatArray";

const ITEMS_PER_PAGE = 5;

export default function ToysCat() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula el índice de inicio y fin de los productos en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = toysCatArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(toysCatArray.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl text-center m-4 font-bold mb-4">
        Juguetes para Gatos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer flex flex-col justify-between h-full" // Asegura que el contenido de la tarjeta esté distribuido verticalmente
            onClick={() => router.push("/Categorias/Juguetes/Gato")}
          >
            <div className="flex flex-col items-center">
              <Image
                src={product.imgUrl}
                alt={product.name}
                width={200}
                height={200}
                className="object-contan rounded-md mb-4" // Asegura que todas las imágenes tengan la misma altura y ancho completo
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold mb-4">
                ${product.price}
              </p>{" "}
              {/* Espaciado inferior para separar el botón */}
            </div>
            <button
              className="mt-auto bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition" // mt-auto para empujar el botón al final
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Agregando ${product.name} al carrito`);
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
