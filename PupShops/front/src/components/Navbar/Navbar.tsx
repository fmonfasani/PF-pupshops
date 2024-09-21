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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Submenus para Perros
  const [isDogsOpen, setIsDogsOpen] = useState(false);
  const [isDogClothesOpen, setIsDogClothesOpen] = useState(false);
  const [isDogToysOpen, setIsDogToysOpen] = useState(false);

  // Submenus para Gatos
  const [isCatsOpen, setIsCatsOpen] = useState(false);
  const [isCatClothesOpen, setIsCatClothesOpen] = useState(false);
  const [isCatToysOpen, setIsCatToysOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleMenuClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    closeOthers?: () => void
  ) => {
    setter((prev) => !prev);
    if (closeOthers) closeOthers();
  };

  const handleDogMenuClick = (route: string) => {
    router.push(route);
    setIsDogsOpen(false);
    setIsDogClothesOpen(false);
    setIsDogToysOpen(false);
  };

  const handleCatMenuClick = (route: string) => {
    router.push(route);
    setIsCatsOpen(false);
    setIsCatClothesOpen(false);
    setIsCatToysOpen(false);
  };

  const handleProfileMenuClick = (route: string) => {
    router.push(route);
    setIsProfileOpen(false);
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
            {/* Botón de Productos */}
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/products")}
            >
              Productos
            </button>

            {/* Menu Perros */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() =>
                  handleMenuClick(setIsDogsOpen, () => {
                    setIsCatsOpen(false);
                  })
                }
              >
                Perros
              </button>
              {isDogsOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleDogMenuClick("/Categorias/Balanceados/Perro")
                    }
                  >
                    Balanceados
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleMenuClick(setIsDogClothesOpen)}
                  >
                    Ropa
                  </button>
                  {isDogClothesOpen && (
                    <div className="pl-4 bg-white">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleDogMenuClick("/ropa/perros")}
                      >
                        Ropa Perros
                      </button>
                    </div>
                  )}
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleMenuClick(setIsDogToysOpen)}
                  >
                    Juguetes
                  </button>
                  {isDogToysOpen && (
                    <div className="pl-4 bg-white">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleDogMenuClick("/juguetes/perros")}
                      >
                        Juguetes Perros
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Menu Gatos */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() =>
                  handleMenuClick(setIsCatsOpen, () => {
                    setIsDogsOpen(false);
                  })
                }
              >
                Gatos
              </button>
              {isCatsOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleCatMenuClick("/Categorias/Balanceados/Gato")
                    }
                  >
                    Balanceados
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleMenuClick(setIsCatClothesOpen)}
                  >
                    Ropa
                  </button>
                  {isCatClothesOpen && (
                    <div className="pl-4 bg-white">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleCatMenuClick("/ropa/gatos")}
                      >
                        Ropa Gatos
                      </button>
                    </div>
                  )}
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleMenuClick(setIsCatToysOpen)}
                  >
                    Juguetes
                  </button>
                  {isCatToysOpen && (
                    <div className="pl-4 bg-white">
                      <button
                        className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                        onClick={() => handleCatMenuClick("/juguetes/gatos")}
                      >
                        Juguetes Gatos
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Otros enlaces */}
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/aboutUs")}
            >
              Quienes Somos
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/contact")}
            >
              Contacto
            </button>
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/carro")}
            >
              Carro
            </button>

            {/* Botón de perfil en escritorio */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProfileOpen)}
              >
                Perfil
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/userDashboard/register")
                    }
                  >
                    Registrarse
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/userDashboard/login")
                    }
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
            <button className="absolute right-2 top-2.5 bg-blue-500 text-white p-2 rounded-md">
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
                onClick={() => router.push("/")}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </button>
              {/* Botón de Productos */}
              <button
                onClick={() => router.push("/products")}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Productos
              </button>
              {/* Menu Perros */}
              <div className="relative group">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() =>
                    handleMenuClick(setIsDogsOpen, () => {
                      setIsCatsOpen(false);
                    })
                  }
                >
                  Perros
                </button>
                {isDogsOpen && (
                  <div className="pl-4 bg-white">
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() =>
                        handleDogMenuClick("/Categorias/Balanceados/Perro")
                      }
                    >
                      Balanceados
                    </button>
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() => handleMenuClick(setIsDogClothesOpen)}
                    >
                      Ropa
                    </button>
                    {isDogClothesOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => handleDogMenuClick("/ropa/perros")}
                        >
                          Ropa Perros
                        </button>
                      </div>
                    )}
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() => handleMenuClick(setIsDogToysOpen)}
                    >
                      Juguetes
                    </button>
                    {isDogToysOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => handleDogMenuClick("/juguetes/perros")}
                        >
                          Juguetes Perros
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Menu Gatos */}
              <div className="relative group">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() =>
                    handleMenuClick(setIsCatsOpen, () => {
                      setIsDogsOpen(false);
                    })
                  }
                >
                  Gatos
                </button>
                {isCatsOpen && (
                  <div className="pl-4 bg-white">
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() =>
                        handleCatMenuClick("/Categorias/Balanceados/Gato")
                      }
                    >
                      Balanceados
                    </button>
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() => handleMenuClick(setIsCatClothesOpen)}
                    >
                      Ropa
                    </button>
                    {isCatClothesOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => handleCatMenuClick("/ropa/gatos")}
                        >
                          Ropa Gatos
                        </button>
                      </div>
                    )}
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() => handleMenuClick(setIsCatToysOpen)}
                    >
                      Juguetes
                    </button>
                    {isCatToysOpen && (
                      <div className="pl-4 bg-white">
                        <button
                          className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                          onClick={() => handleCatMenuClick("/juguetes/gatos")}
                        >
                          Juguetes Gatos
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Otros enlaces */}
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/aboutUs")}
              >
                Quienes Somos
              </button>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/contact")}
              >
                Contacto
              </button>
              <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/carro")}
              >
                Carro
              </button>

              {/* Botón de perfil en móvil */}
              <div className="relative group">
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
                      onClick={() =>
                        handleProfileMenuClick("/userDashboard/register")
                      }
                    >
                      Registrarse
                    </button>
                    <button
                      className="block py-2 text-gray-700 hover:bg-gray-100 rounded-md text-center"
                      onClick={() =>
                        handleProfileMenuClick("/userDashboard/login")
                      }
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
