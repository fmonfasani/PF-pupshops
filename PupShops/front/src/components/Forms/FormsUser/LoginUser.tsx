"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonForms, ButtonRedirectUser } from '@/components/Buttons/ButtonsForms';
import { validateLogin } from '@/utils/validationLogin';
import { fetchLoginUser } from '@/utils/fetchUser';
import { ILoginUser } from '@/Interfaces/interfaces';


///Agregar validaciones con back
///Corroborar con back que las propiedades e login sean "email" u "password"
//Agregar contexto de user
export default function LoginUser() {
  const router = useRouter();
  const [userData, setUserData] = useState<ILoginUser>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const { formIsValid, errors: validationErrors } = validateLogin({ ...userData, [name]: value });
    setErrors(validationErrors);
  };

  const handleRegisterRedirect = () => {
    router.push("/userDashboard/register");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Valida los datos del formulario
    const { formIsValid, errors: validationErrors } = validateLogin(userData);

    if (formIsValid) {
        try {
            const success = await fetchLoginUser(userData);

            if (success) {
                alert("Login exitoso");
                router.push("/home");
            } else {
                setErrors({ ...errors, general: "Usuario inválido" });
            }
        } catch (error) {
            console.error("Error durante el login:", error);
            setErrors({ ...errors, general: "Error durante el login" });
        }
    } else {
        setErrors(validationErrors); 
    }
};

  return (
    <section className="bg-gray-100 font-sans">
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg px-4 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-2xl pt-6 font-bold text-blue-950 sm:text-3xl">¡Bienvenido de vuelta a tu tienda de mascotas!</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">Inicia sesión para explorar productos y ofertas exclusivas</p>
        <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4  rounded-lg p-4  sm:p-6 lg:p-8">
           <div>
            <label htmlFor='email' className="sr-only"></label>
            <div className="relative">
            <input
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            placeholder='Email' 
            className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"/>
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
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            </div>
            <div>
            <label htmlFor='password' className="sr-only"></label>
            <div className="relative">
            <input
            name='password'
            type='password'
            value={userData.password}
            onChange={handleChange}
            placeholder='Contraseña' 
            className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"/>
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
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            </div>
            <ButtonForms text='Ingresar' disabled={Object.keys(errors).length > 0} type='submit' ></ButtonForms>
            <ButtonRedirectUser text="¿No posees una cuenta? Haz click aqui para registrarse" onClick={handleRegisterRedirect}  />
        </form>
    </div>
    </div>
    </section>
  )
}
