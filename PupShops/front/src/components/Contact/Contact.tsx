import React from "react";

export default function Contact() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Contáctanos
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Estamos aquí para atenderte y responder todas tus consultas sobre
          nuestros productos y servicios para tus mascotas. No dudes en
          comunicarte con nosotros.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Información de contacto */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Información de Contacto
            </h3>
            <p className="text-gray-700 mb-4">
              <strong>WhatsApp:</strong>{" "}
              <a
                href="https://wa.me/1234567890"
                className="text-purple-600 underline"
              >
                +123 456 7890
              </a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@tiendamascotas.com"
                className="text-purple-600 underline"
              >
                info@tiendamascotas.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Dirección:</strong> Calle Principal 123, Ciudad, País
            </p>
          </div>

          {/* Integración de Google Maps */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              Nuestra Ubicación
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188398.85660916765!2d-64.20473382893982!3d-31.52281730769655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942cd4a109dac635%3A0xe72d300f810e899e!2sC%C3%B3rdoba%2C%20Argentina!5e0!3m2!1ses-419!2sco!4v1726885137571!5m2!1ses-419!2sco"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">
            Envíanos un Mensaje
          </h3>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-purple-600"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-purple-600"
                placeholder="Tu correo"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:ring-2 focus:ring-purple-600"
                placeholder="Escribe tu mensaje"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
