"use client"; 
import { validateLoginForm } from "../../../utils/validate";
import { useRouter } from "next/navigation";

import React, { useContext, useState } from "react";

import { UserContext } from "@/context/userContext";
import {  ButtonRedirectUser } from "@/components/Buttons/ButtonsForms";
import { NotificationError } from "@/components/Notifications/NotificationError";
import { NotificationRegister } from "@/components/Notifications/NotificationRegister";
import { ILoginClientProps } from "@/Interfaces/interfaces";

function LoginPage({ setToken }: ILoginClientProps) {
  const router = useRouter();
  const { signIn } = useContext(UserContext);
  const [dataUser, setDataUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [showNotificationWelcome, setShowNotificationWelcome] = useState(false);
  const [notificationMessageWelcome, setNotificationMessageWelcome] =
    useState("");

  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });

    const { errors } = validateLoginForm({ ...dataUser, [name]: value });

    setErrors(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { formIsValid, errors } = validateLoginForm(dataUser);

  
    if (formIsValid) {
      const credentials = { email: dataUser.email, password: dataUser.password };
      try {
        const success = await signIn(credentials); 
  
        if (success) {
          const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
          if (token) {
            setToken(token); 

            setNotificationMessageWelcome(`Bienvenido`);
            setShowNotificationWelcome(true);
            setTimeout(() => {
              setShowNotificationWelcome(false);
              router.push("/home");
            }, 3000);
          }
        } else {
          if (!dataUser.email) {
            setErrorMessage("Por favor ingresa tu correo electrónico");
          } else if (!dataUser.password) {
            setErrorMessage("Por favor ingresa tu contraseña");
          } else {
            setErrorMessage("Credenciales inválidas. Verifica tu correo electrónico y contraseña.");
          }
          setShowErrorNotification(true);
          setTimeout(() => setShowErrorNotification(false), 3000); 
        }
      } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        setErrorMessage(error instanceof Error ? error.message : "Error desconocido."); 
        setShowErrorNotification(true); 
        setTimeout(() => setShowErrorNotification(false), 3000); 

      }
    } else {
      setErrors(errors);
    }
  };


  const handleRegisterRedirect = () => {
    router.push("/userDashboard/register");
  };

  return (
    <section className="bg-gray-100 p-4 mt-16">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
        <div className="rounded-lg bg-white py-8 px-4 shadow-lg lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative z-10 mt-0 bg-opacity-60 bg-white p-4 rounded-lg">
              <h1 className="text-2xl font-bold text-center text-blue-950">
                Iniciar sesión en tu cuenta
              </h1>
            </div>
  
            {/* Botón para iniciar sesión con email */}
            <div className="text-center">
              <a
                href="/api/auth/login"
                className="w-full md:w-2/5 mx-auto block justify-center rounded-lg bg-teal-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-center hover:text-black shadow-sm hover:bg-orange-300"
              >
                Iniciar sesión con tu email
              </a>
            </div>
  
            {/* Campo de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
            </div>
  
            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </div>
  
            {/* Botón de iniciar sesión */}
            <div className="text-center">
              <button
                disabled={!!errors.email}
                type="submit"
                className="w-full md:w-2/5 mx-auto block justify-center rounded-lg bg-teal-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-center hover:text-black shadow-sm hover:bg-orange-300"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
  
          {/* Texto de registro */}
          <p className="mt-10 text-center text-sm">
            <ButtonRedirectUser
              text="¿No posees una cuenta? Haz clic aquí para registrarse"
              onClick={handleRegisterRedirect}
            />
          </p>
        </div>
      </div>
  
      {/* Notificaciones */}
      {showNotificationWelcome && (
        <NotificationRegister message={notificationMessageWelcome} />
      )}
      {showErrorNotification && (
        <NotificationError
          message={errorMessage}
          onClose={() => setShowErrorNotification(false)}
        />
      )}
    </section>
  );
}  

export default LoginPage;
