"use client";

import { useRouter } from "next/navigation";
import productsDogFood from "@/helpers/productsFD"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import { Product } from "@/Interfaces/Iproducts"; // Importa la interfaz correcta

export default function BalanceadosPerros() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">Balanceados para Perros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsDogFood.map((product: Product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/Categorias/Balanceados/Perro")}
          >
            <Image
              src={product.imgUrl}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
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
    </div>
  );
}
