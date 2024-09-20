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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Todos nuestros productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-gray-800">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-pink-500">
                  {product.category.name}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="inline-block rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
