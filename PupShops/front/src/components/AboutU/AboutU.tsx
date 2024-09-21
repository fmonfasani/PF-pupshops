import React from "react";

export default function AboutU() {
  return (
    <div>
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Quiénes Somos
          </h2>
          <p className="text-center text-gray-700 mb-6">
            En PUPSHOPS, somos apasionados por el bienestar y la felicidad de
            tus mascotas. Nos dedicamos a ofrecer una amplia gama de servicios y
            productos que garantizan el mejor cuidado para tus fieles amigos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Nuestros Servicios
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Accesorios para mascotas de alta calidad.</li>
                <li>Servicios de baño y peluquería profesional.</li>
                <li>Venta de alimentos nutritivos y balanceados.</li>
                <li>
                  Atención personalizada y asesoría en el cuidado de tus
                  mascotas.
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-700">
                Proporcionar productos y servicios de primera calidad para el
                cuidado de mascotas, asegurando la satisfacción de nuestros
                clientes y el bienestar de sus compañeros peludos.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Nuestro Compromiso
            </h3>
            <p className="text-gray-700 mb-4">
              En PUPSHOPS, nos comprometemos a ofrecer solo lo mejor para tus
              mascotas. Todos nuestros productos son seleccionados
              cuidadosamente, y nuestro equipo está formado por expertos en el
              cuidado animal.
            </p>
            <p className="text-gray-700">
              Únete a nuestra comunidad de amantes de mascotas y descubre todo
              lo que tenemos para ofrecerte. Estamos aquí para ayudarte a cuidar
              y consentir a tu amigo de cuatro patas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
