"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import pups from "../../../public/pups.png";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md mt-3 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#" className="block text-teal-600">
          <div className="p-3">
            <Image alt="logo" src={pups} width={100} height={100} />
          </div>
        </Link>

        <div className="flex items-center flex-1 justify-between space-x-12">
          {" "}
          {/* Aumenta el espacio aquí */}
          {/* Barra de búsqueda en escritorio */}
          <div className="hidden md:flex items-center flex-1 relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <MdSearch className="absolute right-2 text-gray-500" />
          </div>
          {/* Enlaces de navegación */}
          <nav
            aria-label="Global"
            className="hidden md:flex gap-6 text-sm flex-1"
          >
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProductsOpen)}
              >
                Productos
              </button>
              {isProductsOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg scale-100 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Balanceados
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Accesorios
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Ropa
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Collares
                  </Link>
                </div>
              )}
            </div>
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsServicesOpen)}
              >
                Peluquería
              </button>
              {isServicesOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg scale-100 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Turno para Peluquería
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="#"
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              Quienes Somos
            </Link>
            <Link
              href="#"
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              Contacto
            </Link>
            <Link
              href="#"
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              Carro
            </Link>
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg scale-100 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Registrarse
                  </button>
                  <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
          </nav>
          {/* Botón de búsqueda y hamburguesa en móvil */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleSearch}
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75"
            >
              <span className="sr-only">Buscar</span>
              {isSearchOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <MdSearch className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75"
            >
              <span className="sr-only">Toggle menu</span>
              <GiHamburgerMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda en móvil */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 left-0 bg-black bg-opacity-20 shadow-lg z-50 flex justify-center">
          <div className="relative w-64 bg-white bg-opacity-90 shadow-lg rounded-lg mt-16 mb-4 flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-l-lg"
            />
            <button
              onClick={toggleSearch}
              className="absolute top-4 right-4 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
            >
              <IoClose className="w-6 h-6" />
            </button>
            <button
              onClick={toggleSearch}
              className="bg-teal-500 p-2 m-2 rounded-lg text-white hover:bg-teal-600"
            >
              Ir
            </button>
          </div>
        </div>
      )}

      {/* Menú desplegable en dispositivos móviles */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 left-0 bg-black bg-opacity-20 shadow-lg z-50 flex flex-col">
          <div className="w-full bg-white bg-opacity-90 shadow-lg rounded-lg mt-16 mb-4">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            >
              <IoClose className="w-6 h-6 bg-white rounded-md" />
            </button>
            <div className="flex flex-col p-4">
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => handleMenuClick(setIsProductsOpen)}
              >
                Productos
              </button>
              {isProductsOpen && (
                <div className="pl-4 bg-white">
                  <Link
                    href="#"
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={toggleMenu}
                  >
                    Balanceados
                  </Link>
                  <Link
                    href="#"
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={toggleMenu}
                  >
                    Accesorios
                  </Link>
                  <Link
                    href="#"
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={toggleMenu}
                  >
                    Ropa
                  </Link>
                </div>
              )}
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => handleMenuClick(setIsServicesOpen)}
              >
                Peluquería
              </button>
              {isServicesOpen && (
                <div className="pl-4 bg-white">
                  <Link
                    href="#"
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={toggleMenu}
                  >
                    Turno para Peluquería
                  </Link>
                </div>
              )}
              <Link
                href="#"
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                onClick={toggleMenu}
              >
                Quienes Somos
              </Link>
              <Link
                href="#"
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                onClick={toggleMenu}
              >
                Contacto
              </Link>
              <Link
                href="#"
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                onClick={toggleMenu}
              >
                Carro
              </Link>
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => handleMenuClick(setIsProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="pl-4 bg-white">
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-center"
                    onClick={toggleMenu}
                  >
                    Registrarse
                  </button>
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-center"
                    onClick={toggleMenu}
                  >
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
