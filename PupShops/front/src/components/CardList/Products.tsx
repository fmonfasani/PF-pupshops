"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/helpers/product.helper";
import Link from "next/link";

interface IProduct {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
  description: string;
  stock: number;
  category: {
    id: string;
    name: string;
  };

}

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleAddToCart = (productId: string) => {
    console.log(`Producto ${productId} añadido al carrito`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-32">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg flex flex-col justify-between overflow-hidden"
            >
              <img
                src={product.imgUrl}
                alt={product.name}
                className="rounded-t-lg h-48 w-full object-cover"
              />
              <div className="py-6 px-8 bg-white flex-grow">
                <h2 className="text-gray-700 font-bold text-xl mb-2 hover:text-gray-900 hover:cursor-pointer">
                  {product.name}
                </h2>
                <p className="text-gray-700 tracking-wide mb-4">
                  {product.description}
                </p>
                <span className="text-lg font-bold text-gray-800">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <span className="text-xs text-pink-500 block mb-2">
                  {product.category.name}
                </span>
              </div>

              <div className="p-4 text-center">
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 py-2 bg-purple-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
                  >
                    Agregar al carrito
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 py-2 bg-pink-100 text-purple-600 font-medium rounded-full shadow hover:bg-pink-200 transition duration-300 ease-in-out"
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
