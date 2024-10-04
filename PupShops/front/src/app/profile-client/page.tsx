"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="mt-32">Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <section className="bg-gray-100 p-4 mt-20">
        <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 sm:p-10">
            <h2 className="text-2xl font-bold  text-blue-950 mb-4">
              Perfil de Usuario
            </h2>
            <div className="mt-32 text-center">
              {user.picture && (
                <div className="flex justify-center">
                  <img
                    className="max-w-full h-auto"
                    src={user.picture}
                    alt={user.name || "Usuario"}
                  />
                </div>
              )}
              <div className="mt-2">
                <p>
                  <strong>Nombre:</strong> {user.name || "Nombre no disponible"}
                </p>
              </div>
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> {user.email || "Email no disponible"}
                </p>
              </div>
            </div>
            <div>
              <a
                href="/api/auth/logout"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  );
}