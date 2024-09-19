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
  const [isBalanceadosOpen, setIsBalanceadosOpen] = useState(false);
  const [isAccesoriosOpen, setIsAccesoriosOpen] = useState(false);
  const [isRopaOpen, setIsRopaOpen] = useState(false);

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
                  <div className="relative group">
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleMenuClick(setIsBalanceadosOpen)}
                    >
                      Balanceados
                    </button>
                    {isBalanceadosOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/balanceados/perros")}
                        >
                          Perros
                        </button>
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/balanceados/gatos")}
                        >
                          Gatos
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative group">
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleMenuClick(setIsAccesoriosOpen)}
                    >
                      Accesorios
                    </button>
                    {isAccesoriosOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/accesorios/perros")}
                        >
                          Perros
                        </button>
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/accesorios/gatos")}
                        >
                          Gatos
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="relative group">
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleMenuClick(setIsRopaOpen)}
                    >
                      Ropa
                    </button>
                    {isRopaOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/ropa/perros")}
                        >
                          Perros
                        </button>
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => router.push("/ropa/gatos")}
                        >
                          Gatos
                        </button>
                      </div>
                    )}
                  </div>
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
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-40">
          <div className="relative w-full max-w-md bg-white p-4 rounded-lg mt-16">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={toggleSearch}
              className="absolute right-2 top-2.5 text-gray-500"
            >
              <IoClose className="w-6 h-6" />
            </button>
            <button
              className="absolute right-2 top-2.5 bg-blue-500 text-white p-2 rounded-md"
              onClick={() => console.log("Ir")}
            >
              Ir
            </button>
          </div>
        </div>
      )}

      {/* Menú móvil */}
      {isOpen && (
        <div className="fixed inset-0 bg-white shadow-lg z-50">
          <div className="p-4">
            <button
              onClick={toggleMenu}
              className="text-gray-500 transition hover:text-gray-500/75"
            >
              <IoClose className="w-6 h-6" />
            </button>
            <nav className="mt-4">
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/")}
              >
                Home
              </button>
              <div className="relative group">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleMenuClick(setIsProductsOpen)}
                >
                  Productos
                </button>
                {isProductsOpen && (
                  <div className="pl-4 bg-white">
                    <div className="relative group">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleMenuClick(setIsBalanceadosOpen)}
                      >
                        Balanceados
                      </button>
                      {isBalanceadosOpen && (
                        <div className="pl-4 bg-white">
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/balanceados/perros")}
                          >
                            Perros
                          </button>
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/balanceados/gatos")}
                          >
                            Gatos
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="relative group">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleMenuClick(setIsAccesoriosOpen)}
                      >
                        Accesorios
                      </button>
                      {isAccesoriosOpen && (
                        <div className="pl-4 bg-white">
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/accesorios/perros")}
                          >
                            Perros
                          </button>
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/accesorios/gatos")}
                          >
                            Gatos
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="relative group">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleMenuClick(setIsRopaOpen)}
                      >
                        Ropa
                      </button>
                      {isRopaOpen && (
                        <div className="pl-4 bg-white">
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/ropa/perros")}
                          >
                            Perros
                          </button>
                          <button
                            className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                            onClick={() => router.push("/ropa/gatos")}
                          >
                            Gatos
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/turno-peluqueria")}
              >
                Turno para Peluquería
              </button>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/quienes-somos")}
              >
                Quienes Somos
              </button>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/contacto")}
              >
                Contacto
              </button>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/carro")}
              >
                Carro
              </button>
              <div className="relative group mt-4">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
