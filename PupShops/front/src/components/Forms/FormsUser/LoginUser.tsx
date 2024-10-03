"use client";
import { validateLoginForm } from "../../../helpers/validate";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { ButtonForms } from "@/components/Buttons/ButtonsForms";
import { ILoginClientProps } from "@/Interfaces/interfaces";
import { NotificationError } from "@/components/Notifications/NotificationError";
import { NotificationRegister } from "@/components/Notifications/NotificationRegister";

function LoginPage({ setToken }: ILoginClientProps) {
  const router = useRouter();
  const { signIn } = useContext(UserContext);
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({ ...dataUser, [name]: value });
    const {formIsValid,errors} = validateLoginForm({...dataUser, [name]:value})
    setErrors(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { formIsValid, errors } = validateLoginForm(dataUser);

    if(formIsValid) {
      const credentials = {
        email: dataUser.email,
        password: dataUser.password
      };
      try {
        const success = await signIn(credentials); 
                 
        if (success) {
          
          const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
          if (token) {
            setToken(token); 
            setNotificationMessage(`Bienvenido`);
            setShowNotification(true);
            setTimeout(() => {
            setShowNotification(false);
            router.push("/home");
          }, 3000);
          }
        } else {
           setErrorMessage("Usuario inválido");
          setShowErrorNotification(true); 
          setTimeout(() => {
            setShowErrorNotification(false); 
          }, 3000);
        }
      } catch(error) {
        console.error("Error durante el registro:", error);
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
}
  
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
          <ButtonForms text="¿No posees una cuenta? Haz click aqui para registrarse" onClick={handleRegisterRedirect} /> 
          </p>
        </div>
      </div>
      {showNotification && <NotificationRegister message={notificationMessage} />}
      {showErrorNotification && <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />}
    </section>
  );
}

export default LoginPage;
