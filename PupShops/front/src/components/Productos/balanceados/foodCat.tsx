"use client"; // Necesario para usar hooks como useState en Next.js

import React from "react";
import productsCatFood from "../../helpers/productsFC"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import { Product } from "@/Interfaces/Iproducts";

export default function BalanceadosGatos() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Balanceados para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsCatFood.map((Product) => (
          <div key={Product.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={Product.image}
              alt={Product.name}
              width={300}
              height={300}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{Product.name}</h2>
            <p className="text-gray-700">{Product.description}</p>
            <p className="text-green-600 font-bold">${Product.price}</p>
            <p className="text-gray-500">Stock: {Product.stock}</p>
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
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
