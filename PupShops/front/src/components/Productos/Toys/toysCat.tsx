"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cartContext } from "@/context/cartContext";
import { IProduct } from "@/Interfaces/ICart"; // Asegúrate de que la ruta sea correcta

const ITEMS_PER_PAGE = 5;

const ClothesCat: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useContext(cartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryId = "8d194513-3186-44d7-9da5-21682c506f60";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(

          `http://localhost:3001/products/child/${categoryId}`

        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const data: IProduct[] = await response.json();

        // Asegúrate de que el precio sea un número
        const formattedData = data.map((product) => ({
          ...product,
          price: Number(product.price), // Convertir a número
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div>Cargando productos...</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl text-center font-bold mb-4">Ropa para Gatos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id} // Usa product.id como clave si es único
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
              <h2 className="text-lg font-semibold mb-2">{product.id}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold mb-2">
                ${product.price.toFixed(2)} {/* Muestra el precio */}
              </p>
            </div>
            <button
              className="mt-auto bg-teal-600 text-white py-2 rounded-md hover:bg-orange-300 hover:text-black transition"
              onClick={async (e) => {
                e.stopPropagation();
                const success = await addToCart(product.id); // Cambiado para usar name
                if (success) {
                  alert(`${product.id} ha sido agregado al carrito`);
                } else {
                  alert(`${product.id} ya está en el carrito`);
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
