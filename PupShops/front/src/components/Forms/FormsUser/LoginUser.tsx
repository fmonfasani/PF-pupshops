"use client";
<<<<<<< HEAD
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ButtonForms,
  ButtonRedirectUser
} from "@/components/Buttons/ButtonsForms";
import { validateLogin } from "@/utils/validationLogin";
import { fetchLoginUser } from "@/utils/fetchUser";
import { ILoginUser } from "@/Interfaces/interfaces";
import NotificationLogin from "@/components/Notifications/NotificationLogin";
import { NotificationError } from "@/components/Notifications/NotificationError";

//Agregar contexto de user

export default function LoginUser() {
=======
import { login } from "@/helpers/auth.helpers";
import { validateLoginForm } from "../../../helpers/validate";
import { ILoginError, ILoginProps } from "../../../Interfaces/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginPage() {
>>>>>>> 0b8f7965c6e6cd37ee3d88bbaabca02ca3eceeb9
  const router = useRouter();
  const initialState = {
    email: "",
    password: ""
<<<<<<< HEAD
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showNotification, setShowNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const { formIsValid, errors: validationErrors } = validateLogin({
      ...userData,
      [name]: value
    });
    setErrors(validationErrors);
=======
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
>>>>>>> 0b8f7965c6e6cd37ee3d88bbaabca02ca3eceeb9
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(dataUser);
      console.log(response);

      if (response && response.token && response.findUser) {
        const { token, findUser } = response;
        localStorage.setItem(
          "userSession",
          JSON.stringify({ token, user: findUser })
        );

<<<<<<< HEAD
    const { formIsValid, errors: validationErrors } = validateLogin(userData);

    if (formIsValid) {
      try {
        const success = await fetchLoginUser(userData);

        if (success) {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            router.push("/home");
          }, 3000);
        } else {
          setErrors({ ...errors, general: "Usuario inválido" });
        }
      } catch (error) {
        console.error("Error durante el login:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "Error desconocido."
        );
        setShowErrorNotification(true);
        setTimeout(() => setShowErrorNotification(false), 3000);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="bg-gray-100 mt-10 font-sans">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg px-4 rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl pt-6 font-bold text-blue-950 sm:text-3xl">
            ¡Bienvenido de vuelta a tu tienda de mascotas!
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Inicia sesión para explorar productos y ofertas exclusivas
          </p>
          <form
            onSubmit={onSubmit}
            className="mb-0 mt-6 space-y-4  rounded-lg p-4  sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="email" className="sr-only"></label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only"></label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
=======
        router.push("/");
      } else {
        setErrors({ ...errors, email: "Invalid login credentials." });
      }
    } catch (error: any) {
      const errors = validateLoginForm(dataUser);
      setErrors(errors);
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
>>>>>>> 0b8f7965c6e6cd37ee3d88bbaabca02ca3eceeb9
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
<<<<<<< HEAD
            <ButtonForms
              text="Ingresar"
              disabled={Object.keys(errors).length > 0}
              type="submit"
            ></ButtonForms>
            <ButtonRedirectUser
              text="¿No posees una cuenta? Haz click aqui para registrarse"
              onClick={handleRegisterRedirect}
            />
          </form>
        </div>
      </div>
      {showNotification && <NotificationLogin />}
      {showErrorNotification && (
        <NotificationError
          message={errorMessage}
          onClose={() => setShowErrorNotification(false)}
        />
      )}
=======

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
>>>>>>> 0b8f7965c6e6cd37ee3d88bbaabca02ca3eceeb9
    </section>
  );
}

export default LoginPage;
