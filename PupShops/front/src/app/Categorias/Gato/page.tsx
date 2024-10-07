import Image from "next/image";
import { FaFish, FaHeartbeat, FaShower } from "react-icons/fa";
import { GiCat } from "react-icons/gi";
import { RiTShirt2Line } from "react-icons/ri";
import gatitos from "../../../../public/gatitos.png";
import GatoGeneral from "../../../components/Productos/Gato/gato";
import Link from "next/link";

export default function Gato() {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="mb-8">
        <Image
          src={gatitos}
          alt="gatitos"
          width={400}
          height={100}
          className="object-cover"
        />
        <hr className="border-teal-600 border-2 w-full my-4" />
      </div>

      <div className="flex justify-center gap-6">
        <Link href="/Categorias/Gato/SubCategorias/Alimento" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Alimentos</span>
            <FaFish className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/productos/salud" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Salud y bienestar</span>
            <FaHeartbeat className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/productos/accesorios" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Accesorios</span>
            <RiTShirt2Line className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/productos/juguetes" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Juguetes</span>
            <GiCat className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/productos/higiene" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Higiene y cuidado</span>
            <FaShower className="text-teal-600 text-6xl" />
          </button>
        </Link>
      </div>

      <GatoGeneral />
    </div>
  );
}
