"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/Interfaces/Iproducts";
import toysCatArray from "@/helpers/toysCatArray";
export default function ToysCat() {
  const router = useRouter();
  const [productsCatFood, setProductsCatFood] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/products/child/d03367ed-68a4-40bb-a031-2a1f3ea8de86"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProductsCatFood(data);
      } catch (err) {
        //* Verificación de tipo

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">Juguetes para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {toysCatArray.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/Categorias/Juguetes/Gato")}
          >
            <Image
              src={product.imgUrl}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
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
