import ProductsPage from "@/components/CardList/Products";
import Image from "next/image";
import Link from "next/link";

export default function PageProducts() {
  return (
    <div>
      <div className="flex mt-28 gap-8 mb-12 items-center justify-center">
        <Link href="../Categorias/Perro">
          <div className="text-center flex flex-col justify-center items-center cursor-pointer">
            <h1 className="bg-teal-600 p-1 m-2 w-42 text-cyan-50 rounded-xl hover:bg-orange-300 hover:text-black transition clicker">
              Productos para Perro
            </h1>
            <Image
              className="rounded-lg mt-2 transition-transform transform hover:scale-105 mb-16" // Añade el efecto de hover
              alt="perro"
              src="https://c4.wallpaperflare.com/wallpaper/26/58/362/animales-corre-hierba-perro-wallpaper-preview.jpg"
              width={600}
              height={300}
            />
          </div>
        </Link>

        <Link href="../Categorias/Gato">
          <div className="text-center flex flex-col justify-center items-center cursor-pointer">
            <h1 className="bg-teal-600 p-1 m-2 w-40 text-cyan-50 rounded-xl hover:bg-orange-300 hover:text-black transition clicker">
              Productos para Gato
            </h1>
            <Image
              className="rounded-lg mt-2 transition-transform transform hover:scale-105 mb-16"
              alt="Gato"
              src="https://s1.1zoom.me/b6055/825/Cats_Kittens_Glance_518714_1920x1080.jpg"
              width={600}
              height={300}
            />
          </div>
        </Link>
      </div>
      
      <ProductsPage />
    </div>
  );
}
