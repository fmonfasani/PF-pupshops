"use client";

import { useRouter } from "next/navigation";
import productsCatFood from "@/helpers/productsFC"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import { Product } from "@/Interfaces/Iproducts"; // Importa la interfaz correcta

export default function BalanceadosGatos() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Balanceados para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsCatFood.map((product: Product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/Categorias/Balanceados/Gato")}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={(e) => {
                e.stopPropagation(); // Evita que se ejecute el onClick del div
                console.log(`Agregando ${product.name} al carrito`);
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
