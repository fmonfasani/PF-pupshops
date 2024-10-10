"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserRegister } from "@/Interfaces/interfaces";
import { UserContext } from "@/context/userContext";

export default function RegisterUser() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const {signUp} = useContext(UserContext)
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<IUserRegister>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    address: "",
    phone: 0,
  });

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        const response = await fetch(`http://localhost:3001/auth/check-email?email=${user.email}`);
        const data = await response.json();
        if (data.succes) {
          router.push("/home"); // Redirigir a la home si el usuario ya está registrado
        } else {
          setIsFirstVisit(true); // El usuario no está registrado
        }
      }
    };

    if (!isLoading) {
      checkUser();
    }
  }, [user, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      const success = true; // Simulación de éxito o error en la llamada a la API

      if (success) {
        alert("Registro exitoso");
      } else {
        alert("Error en el registro");
      }
      if (response) {
        router.push("/home"); 
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  if (isLoading) return <div className="mt-32">Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
    {isFirstVisit && (
      <form onSubmit={handleSubmit} className="mt-20 space-y-4">
        <input 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Nombre" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="lastname" 
          value={formData.lastname} 
          onChange={handleInputChange} 
          placeholder="Apellido" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="password" 
          value={formData.password} 
          onChange={handleInputChange} 
          type="password" 
          placeholder="Contraseña" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          type="password" 
          placeholder="Confirmar Contraseña" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="country" 
          value={formData.country} 
          onChange={handleInputChange} 
          placeholder="País" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="city" 
          value={formData.city} 
          onChange={handleInputChange} 
          placeholder="Ciudad" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="address" 
          value={formData.address} 
          onChange={handleInputChange} 
          placeholder="Dirección" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <input 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          type="number" 
          placeholder="Teléfono" 
          className="w-full rounded-lg border border-gray-200 p-3 text-sm" 
          required 
        />
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Registrar
        </button>
      </form>
    )}
  </div>
  
  );
}
