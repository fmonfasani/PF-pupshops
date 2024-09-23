"use client"; // Necesario para usar hooks como useState en Next.js

import React from "react";
import productsCatFood from "@/helpers/productsFC"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";


export default function BalanceadosGatos() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Balanceados para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsCatFood.map((Product) => (
          <div key={Product.id} className="border p-4 rounded-lg flex flex-col items-center shadow-md">
            <Image
              src={Product.image}
              alt={Product.name}
              width={300}
              height={350}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{Product.name}</h2>
            <p className="text-gray-700">{Product.description}</p>
            <p className="text-green-600 font-bold">${Product.price}</p>
            <button
              className="mt-3 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
              onClick={() =>
                console.log(`Agregando ${Product.name} al carrito`)
              }
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
