"use client";
import { IUserSession } from "../../Interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("userSession");
    if (userData) {
      setUserSession(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !userSession) {
      router.push("/userDashboard/login");
      alert("Debes loguearte primero");
    }
  }, [userSession, loading, router]);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    router.push("/userDashboard/login");
  };

  return (
    <section className="bg-gray-100 p-4 mt-16">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-blue-950 mb-4">
            Perfil de Usuario
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Detalles de la cuenta:</h3>
            {userSession ? (
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> {userSession.user.email}
                </p>
                <p>
                  <strong>Nombre:</strong> {userSession.user.name}
                </p>
                <p>
                  <strong>Apellido:</strong>
                  {userSession.user.lastname}
                </p>
                <p>
                  <strong>Telefono:</strong> {userSession.user.phone}
                </p>
                <p>
                  <strong>Direccion:</strong> {userSession.user.address}
                </p>
                <p>
                  <strong>Id Interno:</strong> {userSession.user.id}
                </p>
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
