import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <section className="relative bg-[url(https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-pink-100/80 sm:bg-transparent sm:from-pink-100/95 sm:to-pink-100/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Lo mejor para tu amigo
            <strong className="block font-extrabold text-teal-600">
              Encontralo aca
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-xl text-gray-700">
            Discover a world of love, care, and joy for your furry friends. From
            premium products to top-notch services, weve got everything your
            pet needs!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="#"
              className="block w-full rounded-full bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-orange-300 focus:outline-none focus:ring focus:ring-purple-300 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Shop Now
            </Link>

            <Link
              href="#"
              className="block w-full rounded-full bg-pink-100 px-12 py-3 text-sm font-medium text-teal-600 shadow hover:bg-pink-200 focus:outline-none focus:ring focus:ring-pink-300 sm:w-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden lg:block">
        <img
          src="/api/placeholder/300/300"
          alt="Happy dog"
          className="w-64 h-64 object-cover rounded-tl-full"
        />
      </div>
    </section>
  );
}
