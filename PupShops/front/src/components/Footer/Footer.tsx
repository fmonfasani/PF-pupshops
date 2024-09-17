import Image from "next/image";
import pups from "../../../public/pups.png";
import { FaFacebookF, FaInstagram, FaTiktok, FaGithub } from "react-icons/fa"; // Importamos los íconos

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">

        <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
          <div className="text-teal-600 flex flex-col items-center justify-center text-center sm:flex-row">
            {/* Logo */}
            <Image src={pups} width={150} height={150} alt="logo" />
            {/* Íconos de redes sociales */}
            <div className="flex justify-center space-x-4 text-2xl text-teal-600 mt-4 sm:mt-0 sm:ml-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Con quien trabajamos y contacto */}
        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:pt-16">
          {/* Con quien trabajamos */}
          <div>
            <p className="font-medium text-gray-900">Principales Marcas</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="text-gray-700">Royal Canin</li>
              <li className="text-gray-700">Pedrigree</li>
              <li className="text-gray-700">Eukanuba</li>
              <li className="text-gray-700">Pro Plan</li>
              <li></li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <p className="font-medium text-gray-900">Contacto</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="text-gray-700">Teléfono: 351 5788413</li>
              <li className="text-gray-700">
                Correo electrónico: pupshops@info.com
              </li>
              <li className="text-gray-700">
                Dirección: Artugo Orgaz 510, Alberdi, Cordoba City.
              </li>
            </ul>
          </div>

          {/* Contenido adicional */}
          <div>
            <p className="font-medium text-gray-900">Más información</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  Política de devoluciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
