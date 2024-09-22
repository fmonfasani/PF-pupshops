import React from "react";
import Link from "next/link";
import products from "../../helpers/products";

export default function CardList() {
  return (
    <div className="bg-pink-100/80 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Nuestros Productos para Mascotas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col"
          >
            <div className="relative overflow-hidden h-80">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transform transition duration-300 scale-100 group-hover:scale-95"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-purple-600 mb-2">
                  {card.name}
                </h2>
                <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
              </div>
              <div className="mt-auto">
                <Link
                  href="#"
                  className="block w-full text-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-2"
                >
                  Más Información
                </Link>
                <Link
                  href="#"
                  className="block w-full text-center rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Comprar ahora
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
