"use client";

import { useState } from "react";
import Image from "next/image";
import pups from "PF-pupshopsPupShops\frontpublicpups.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <div>
      <nav className="bg-cyan-50 dark:bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Image src={pups} alt="logo" width={70} height={70} />
          <button
            className="block lg:hidden text-black dark:text-white"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Menu items for desktop */}
          <ul className="hidden lg:flex space-x-4">
            <li className="relative">
              <button
                className="text-black dark:text-white"
                onClick={toggleProducts}
              >
                Producto
              </button>
              {isProductsOpen && (
                <ul className="absolute left-0 mt-2 bg-white dark:bg-gray-900 shadow-md rounded-lg py-2">
                  <li>
                    <a href="#" className="block px-4 py-2">
                      Balanceados
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2">
                      Accesorios
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2">
                      Ropa
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                className="text-black dark:text-white"
                onClick={toggleServices}
              >
                Servicios
              </button>
              {isServicesOpen && (
                <ul className="absolute left-0 mt-2 bg-white dark:bg-gray-900 shadow-md rounded-lg py-2">
                  <li>
                    <a href="#" className="block px-4 py-2">
                      Turno para peluquería
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="#">Quienes Somos</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>

          {/* Mobile menu */}
          <div
            className={`lg:hidden fixed top-0 right-0 w-64 rounded-2 bg-sky-300 dark:bg-gray-900 shadow-md transform transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4">
              <span className="text-lg font-semibold text-black dark:text-white">
                Menú
              </span>
              <button
                className="text-black dark:text-white"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col items-start space-y-4 p-4">
              <li className="relative">
                <button
                  className="text-black dark:text-white text-xl"
                  onClick={toggleProducts}
                >
                  Producto
                </button>
                {isProductsOpen && (
                  <ul className="ml-4 bg-white dark:bg-gray-900 shadow-md rounded-lg py-2">
                    <li>
                      <a href="#" className="block px-4 py-2">
                        Balanceados
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2">
                        Accesorios
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2">
                        Ropa
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <button
                  className="text-black dark:text-white text-xl"
                  onClick={toggleServices}
                >
                  Servicios
                </button>
                {isServicesOpen && (
                  <ul className="ml-4 bg-white dark:bg-gray-900 shadow-md rounded-lg py-2">
                    <li>
                      <a href="#" className="block px-4 py-2">
                        Turno para peluquería
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a href="#" className="text-black dark:text-white text-xl">
                  Quienes Somos
                </a>
              </li>
              <li>
                <a href="#" className="text-black dark:text-white text-xl">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
