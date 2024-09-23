import React from "react";
import clothesCatArray from "@/helpers/clothesCatArray";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ClothesDog: React.FC = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">Juguetes para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clothesCatArray.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/Categorias/Ropa/Gato")}
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


export default ClothesDog;
