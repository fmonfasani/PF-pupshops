"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pups from "../../../public/pups.png";
import SearchBar from "../SerchBar/SerchBar";


//validar rol admin
//otorgar rol de admin a user
//cargar productos / modificar o eliminar / notificacion de bajo stock
//ver turnos del dia // ver historial de turnos
//ver ordenes de productos, su estado // historial de productos
//modificar contacto
//ver pagos?


export default function NavbarAdminComponent() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeAllMenus = () => {
    setIsProductOpen(false);
    setIsServiceOpen(false);
    setIsProfileOpen(false);
  };

  const handleMenuClick = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    current: boolean
  ) => {
    // Si el menú ya está abierto, lo cerramos. Si no, cerramos todos los demás y abrimos el menú correspondiente.
    if (current) {
      setter(false);
    } else {
      closeAllMenus();
      setter(true);
    }
  };

  const handleProductMenuClick = (route: string) => {
    router.push(route);
    closeAllMenus();
  };

  const handleServiceMenuClick = (route: string) => {
    router.push(route);
    closeAllMenus();
  };

  const handleProfileMenuClick = (route: string) => {
    router.push(route);
    closeAllMenus();
  };

  return (
    <header className="bg-white shadow-md mt-6 fixed top-0 left-0 w-full z-50">
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
        <SearchBar />
        <div className="flex items-center flex-1 justify-between space-x-12">
          {/* Enlaces de navegación */}
          <nav
            aria-label="Global"
            className="hidden md:flex gap-6 text-sm flex-1"
          >
           
            {/* Menu Productos */}
            <div className="relative group">
          
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProductOpen, isProductOpen)}
              >
                Productos
              </button>
              {isProductOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
                
               <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleProductMenuClick("/adminDashboard/uploadProducts")}
                    >
                      Cargar productos
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleProductMenuClick("/products")}
                  >
                    Editar y Eliminar
                  </button>
                   </div>
              )}
            </div>

            {/* Menu Servicios */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsServiceOpen, isServiceOpen)}
              >
                Servicios
              </button>
              {isServiceOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleServiceMenuClick("/adminDashboard/appointments")
                    }
                  >
                    Turnos
                  </button>
                   </div>
              )}
            </div>

            {/* Otros enlaces */}
            <button
              className="text-gray-500 transition hover:text-gray-500/75"
              onClick={() => router.push("/adminDashboard/orders")}
            >
              Ordenes
            </button>
           

            {/* Botón de usuarios en escritorio */}
            <div className="relative group">
              <button
                className="text-gray-500 transition hover:text-gray-500/75"
                onClick={() => handleMenuClick(setIsProfileOpen, isProfileOpen)}
              >
                Usuarios
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/adminDashboard/users/usersData")
                    }
                  >
                    Datos de usuarios
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      handleProfileMenuClick("/adminDashboard/users/accessControl")
                    }
                  >
                    Permisos de usuarios
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Menu hamburguesa para mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <GiHamburgerMenu className="text-gray-500" />
          </button>
          {isOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg z-50">
              <div className="flex flex-col items-end bg-gray-100">
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={toggleMenu}
                >
                  <IoClose />
                </button>
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() => handleMenuClick(setIsProductOpen, isProductOpen)}
                >
                  Productos
                </button>
                {isProductOpen && (
                  <div className="flex flex-col pl-4 bg-gray-100 items-end">
                    <button
                      className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                      onClick={() => handleProductMenuClick("/adminDashboard/uploadProducts")}
                      >
                        Cargar productos
                    </button>
                    <button
                      className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                      onClick={() => handleProductMenuClick("/products")}
                      >
                        Editar y Eliminar
                    </button>
                      </div>
                )}
               <button className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200" onClick={() => handleMenuClick(setIsServiceOpen, isServiceOpen)}>
              Servicios
            </button>
            {isServiceOpen && (
              <div className="flex flex-col pl-4 bg-gray-100 items-end">
                <button className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right" onClick={() => handleServiceMenuClick("/adminDashboard/appointments")}>
                  Turnos
                </button>
              </div>
            )}

            {/* Botón de Ordenes siempre aparte */}
            <button className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200" onClick={() => router.push("/adminDashboard/orders")}>
              Ordenes
            </button>
              
                {/* Botón de usuarios al final */}
                <button
                  className="flex justify-end w-full p-2 text-gray-700 hover:bg-gray-200"
                  onClick={() =>
                    handleMenuClick(setIsProfileOpen, isProfileOpen)
                  }
                >
                  Usuarios
                </button>
                {isProfileOpen && (
                  <div className="flex flex-col pl-4 bg-gray-100 items-end">
                    <button
                      className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                      onClick={() =>
                        handleProfileMenuClick("/adminDashboard/users/usersData")
                      }
                    >
                      Datos de usuarios
                    </button>
                    <button
                      className="p-2 text-gray-700 hover:bg-gray-200 w-full text-right"
                      onClick={() =>
                        handleProfileMenuClick("/adminDashboard/users/accessControl")
                      }
                    >
                      Permisos de usuarios
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
