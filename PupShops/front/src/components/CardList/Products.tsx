"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/helpers/product.helper";
import Link from "next/link";

export interface IProduct {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
}

const ProductsPage = () => {
  // Estados para manejar productos, carga y errores
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("default");

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Define cuántos elementos mostrar por página

  useEffect(() => {
    // Función para obtener los productos desde la API
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setSortedProducts(data); // Al inicio, los productos están sin ordenar
      } catch (error) {
        setError("Failed to fetch products"); // Manejo de errores
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProducts(); // Llama a la función para obtener productos
  }, []);

  // Función para ordenar productos según la opción seleccionada
  const sortProducts = (option: string) => {
    const sorted = [...products]; // Copia los productos para ordenarlos
    if (option === "price-asc") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (option === "price-desc") {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (option === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedProducts(sorted); // Actualiza los productos ordenados
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption); // Actualiza la opción de orden
    sortProducts(selectedOption); // Ordena los productos
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Producto ${productId} añadido al carrito`); // Lógica para agregar al carrito
  };

  // Manejo de la paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage); // Total de páginas
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Elementos actuales de la página

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Cambia la página actual
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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        {/* Filtro de Ordenación */}
        <div className="flex justify-end mb-8 mt-16">
          <label
            htmlFor="sort"
            className="mr-3 text-lg font-bold text-purple-600 mt-2"
          >
            Ordenar por:
          </label>
          <div className="bg-white shadow-lg hover:shadow-xl transition duration-500 rounded-lg p-3">
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border-none bg-transparent text-purple-600 font-medium rounded-md focus:outline-none focus:ring-0"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg flex flex-col justify-between overflow-hidden"
            >
              <img
                src={product.imgUrl}
                alt={product.name}
                className="rounded-t-lg h-48 w-full object-contain mt-3"
              />
              <div className="py-6 px-8 bg-white flex-grow">
                <h2 className="text-purple-600 font-bold text-xl mb-2 hover:text-purple-800 hover:cursor-pointer">
                  {product.name}
                </h2>
                <p className="text-gray-700 tracking-wide mb-4">
                  {product.description}
                </p>
                <span className="text-lg font-bold text-purple-800">
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

        {/* Paginación */}
        <ol className="flex justify-center gap-1 text-xs font-medium mt-10">
          <li>
            <a
              href="#"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {/* Generación de botones de página */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={`block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 ${
                  currentPage === index + 1
                    ? "border-purple-500 bg-blue-600 "
                    : ""
                }`}
              >
                {index + 1} {/* Muestra el número de página */}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ProductsPage;
