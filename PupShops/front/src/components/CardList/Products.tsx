"use client";
import { UserContext} from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import { getAllProducts } from "@/helpers/product.helper";
import Link from "next/link";
import { ButtonForms } from "../Buttons/ButtonsForms";
import AdminProductActions from "../ActionsAdmin/AdminProductsActions";
import { NotificationRegister } from "../Notifications/NotificationRegister";
import { NotificationError } from "../Notifications/NotificationError";

import { useRouter } from "next/navigation";


export interface IProduct {
  id: string;
  name: string;
  price: number; // Asegúrate de que price sea un número
  imgUrl: string;
  description: string;
  stock?: number;
  category: {
    id: string;
    name: string;
  };
}

const ProductsPage = () => {

  const { isAdmin } = useContext(UserContext);
  

  // Estados
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("default");

  // Notificaciones
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setSortedProducts(data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Función para ordenar productos
  const sortProducts = (option: string) => {
    const sorted = [...products];
    if (option === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedProducts(sorted);
  };

  // Manejar cambio de opción de orden
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortProducts(selectedOption);
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Producto ${productId} añadido al carrito`);
  };

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Mostrar notificaciones
  const handleDeleteNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);

  };

  const handleErrorNotification = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setShowErrorNotification(true);
    setTimeout(() => setShowErrorNotification(false), 3000);
  };


  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        <div className="flex justify-end mb-8 mt-16">
          <label htmlFor="sort" className="mr-3 text-lg font-bold text-teal-600 mt-2">
            Ordenar por:
          </label>
          <div className="bg-white shadow-lg hover:shadow-xl transition duration-500 rounded-lg p-3">
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border-none bg-transparent text-teal-600 font-medium rounded-md focus:outline-none focus:ring-0"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg flex flex-col justify-between overflow-hidden"
            >
              <img
                src={product.imgUrl}
                alt={product.id}
                className="rounded-t-lg h-48 w-full object-contain mt-3"
              />
              <div className="py-6 px-8 bg-white flex-grow">
                <h2 className="text-teal-600 font-bold text-xl mb-2 hover:text-purple-800 hover:cursor-pointer">
                  {product.name}
                </h2>
                <p className="text-gray-700 tracking-wide mb-4">{product.description}</p>
                <span className="text-lg font-bold text-purple-800">
                  ${Number(product.price).toFixed(2)} {/* Asegura que price sea un número */}
                </span>
                <span className="text-xs text-pink-500 block mb-2">{product.category.name}</span>
                {isAdmin && (
                  <p className="text-gray-700 tracking-wide mb-4 font-bold">Stock: {product.stock}</p>
                )}
              </div>

              <div className="p-4 text-center">
                <div className="flex justify-between gap-2">
                  {isAdmin ? (
                    <AdminProductActions
                      id={product.id}
                      onDeleteNotification={handleDeleteNotification}
                      onErrorNotification={handleErrorNotification}
                      onDeleteProduct={handleDeleteProduct}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
                      >
                        Agregar al carrito
                      </button>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 py-2 bg-pink-100 text-teal-600 font-medium rounded-full shadow hover:bg-pink-200 transition duration-300 ease-in-out"
                      >
                        Detalles
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {showNotification && <NotificationRegister message={notificationMessage} />}
          {showErrorNotification && (
            <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />
          )}
        </div>

        <ol className="flex justify-center gap-1 text-xs font-medium mt-10">
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Prev Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 00-1.414 0L8 9.586 5.707 7.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === index + 1 ? "bg-gray-200" : ""}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Next Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 5.293a1 1 0 011.414 0L12 9.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
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
