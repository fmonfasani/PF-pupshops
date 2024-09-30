"use client";

import { login } from "@/utils/fetchUser";
import { validateLoginForm } from "../../../helpers/validate";
import { ILoginError, ILoginProps } from "../../../Interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginPage() {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(dataUser);
      console.log(response);

      if (response && response.token && response.findUser) {
        const { token, findUser } = response;

        // Guardar el token y el usuario en localStorage
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token, user: findUser })
        );

        // Actualiza el estado del contexto (opcional si usas Context API)
        // Verificar si el usuario es admin y redirigirlo a la página correspondiente
        if (findUser.isAdmin) {
          router.push("/products"); // Página de admin
        } else {
          router.push("/home"); // Página de usuario
        }
      } else {
        setErrors({
          ...errors,
          email: "Credenciales de inicio de sesión inválidas.",
        });
      }
    } catch (error: any) {
      const validationErrors = validateLoginForm(dataUser);
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <section className="bg-gray-100 p-4 mt-16">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
        <div className="rounded-lg bg-white py-8 px-4 shadow-lg lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative z-10 mt-0 bg-opacity-60 bg-white p-4 rounded-lg">
              <h1 className="text-2xl font-bold text-center text-blue-950 ">
                Iniciar sesión en tu cuenta
              </h1>
            </div>
            <div>
              <div>
                <a
                  href="/api/auth/login"
                  className="flex w-full justify-center rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-black shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar sesion con tu email
                </a>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={dataUser.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={dataUser.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                />

                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={errors.email ? true : false}
                type="submit"
                className="flex w-full justify-center rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-black shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No eres miembro?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-teal-600 hover:text-teal-300"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
