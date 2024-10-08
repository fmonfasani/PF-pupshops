import Image from "next/image";
import { FaHeartbeat, FaBone, FaShower } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi"; 
import { RiTShirt2Line } from "react-icons/ri";
import perritos2 from "../../../../public/perritos2.png";
import PerroGeneral from "../../../components/Productos/Perro/perro"; 
import Link from "next/link";

export default function Perro() {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="mb-8">
        <Image
          src={perritos2}
          alt="perritos"
          width={400}
          height={100}
          className="object-cover mt-24"
        />
        <hr className="border-teal-600 border-2 w-full my-4" />
      </div>
      <h1 className="text-2xl font-bold mb-6">Categorias</h1>
     
      <div className="flex justify-center gap-6">
        <Link href="/Categorias/Perro/SubCategorias/Alimento" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Alimentos</span>
            <FaBone className="text-teal-600 text-6xl" />
           
          </button>
        </Link>

        <Link href="/Categorias/Perro/SubCategorias/Salud" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Salud y bienestar</span>
            <FaHeartbeat className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/Categorias/Perro/SubCategorias/Accesorios" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Accesorios</span>
            <RiTShirt2Line className="text-teal-600 text-6xl" />
          </button>
        </Link>

        <Link href="/productos/juguetes" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Juguetes</span>
            <GiSoccerBall className="text-teal-600 text-6xl" />{" "}
      
          </button>
        </Link>

        <Link href="/productos/higiene" passHref>
          <button className="flex flex-col items-center justify-center text-center hover:text-orange-400 transition">
            <span className="text-lg mb-2">Higiene y cuidado</span>
            <FaShower className="text-teal-600 text-6xl" />
          </button>
        </Link>
      </div>
      <PerroGeneral />
    </div>
  );
}
