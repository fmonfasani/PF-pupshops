import Image from "next/image";
import pups from "../../../public/pups.png";
import { FaFacebookF, FaInstagram, FaTiktok, FaGithub } from "react-icons/fa"; // Importamos los íconos

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Contenedor flex para alinear todo en una fila */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-8 sm:space-y-0">
          {/* Logo e íconos de redes sociales */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center">
            <Image src={pups} width={150} height={150} alt="logo" />
            <div className="flex justify-center space-x-4 text-2xl text-teal-600 mt-8 sm:mt-0 sm:ml-6">
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

        {/* Sección oculta en mobile */}
        <div className="hidden sm:flex sm:flex-row sm:justify-between mt-8">
          {/* Sección de Con quien trabajamos */}
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">Principales Marcas</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>Royal Canin</li>
              <li>Pedrigree</li>
              <li>Eukanuba</li>
              <li>Pro Plan</li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">Contacto</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>Teléfono: 351 5788413</li>
              <li>Correo electrónico: pupshops@info.com</li>
              <li>Dirección: Artugo Orgaz 510, Alberdi, Cordoba City.</li>
            </ul>
          </div>

          {/* Contenido adicional */}
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">Más información</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>
                <a href="#" className="transition hover:opacity-75">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:opacity-75">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:opacity-75">
                  Política de devoluciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="hidden sm:block text-xs text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
