"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pups from "../../../public/pups.png";

export default function Navbar() {
  const router = useRouter();
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

        <div
          onClick={() => router.push("/")}
          className="block text-teal-600 cursor-pointer"
        >

          <div className="p-3">
            <Image alt="logo" src={pups} width={100} height={100} />
          </div>
        </div>

        <div className="flex items-center flex-1 justify-between space-x-12">
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
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/balanceados")}
                  >
                    Balanceados
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/accesorios")}
                  >
                    Accesorios
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/ropa")}
                  >
                    Ropa
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/collares")}
                  >
                    Collares
                  </button>
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
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => router.push("/turno-peluqueria")}
                  >
                    Turno para Peluquería
                  </button>
                </div>
              )}
            </div>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/quienes-somos")}
            >
              Quienes Somos
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/contacto")}
            >
              Contacto
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/carro")}
            >
              Carro
            </button>
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg scale-100 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => router.push("/userDashboard/register")}
                  >
                    Registrarse
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => router.push("/userDashboard/login")}
                  >
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
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/balanceados")}
                  >
                    Balanceados
                  </button>
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/accesorios")}
                  >
                    Accesorios
                  </button>
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/ropa")}
                  >
                    Ropa
                  </button>
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
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/turno-peluqueria")}
                  >
                    Turno para Peluquería
                  </button>
                </div>
              )}
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => router.push("/quienes-somos")}
              >
                Quienes Somos
              </button>
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => router.push("/contacto")}
              >
                Contacto
              </button>
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => router.push("/carro")}
              >
                Carro
              </button>
              <button
                className="py-3 text-gray-700 hover:bg-gray-100 rounded-md text-center w-full"
                onClick={() => handleMenuClick(setIsProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="pl-4 bg-white">
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/userDashboard/register")}
                  >
                    Registrarse
                  </button>
                  <button
                    className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                    onClick={() => router.push("/userDashboard/login")}
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
