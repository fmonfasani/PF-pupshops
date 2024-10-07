"use client";
import { getAllProducts } from "@/helpers/product.helper"; 
import { useEffect, useState } from "react";

export interface IProductDetail {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
  description: string;
}

export default function ProductDetail() {
 
  const [products, setProducts] = useState<IProductDetail[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); 
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log(`Producto ${productId} añadido al carrito`);
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar mensaje de carga mientras se obtienen los productos
  }

  if (products.length === 0) {
    return <div>No se encontraron productos.</div>; // Cambia aquí: verifica si hay productos
  }

  return (
    <div className="mt-28 mb-24">
      {products.map(
        (
          product // Muestra todos los productos
        ) => (
          <div
            key={product.id}
            className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12"
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="py-6 px-8">
              <h2 className="text-teal-600 font-bold text-xl mb-2 hover:text-purple-800 hover:cursor-pointer">
                {product.name}
              </h2>
              <p className="text-gray-700 tracking-wide mb-4">
                {product.description}
              </p>
              <span className="text-lg font-bold text-purple-800">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </div>

            <div className="p-4 text-center">
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
