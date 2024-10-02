import {
  IAppointment,
  ILoginUser,
  IUserRegister,
} from "@/Interfaces/interfaces";
import { ILoginProps } from "../Interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegisterUser = async (user: IUserRegister) => {
  const response = await fetch(`http://localhost:3001/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log("Respuesta del servidor:", data); // Log para ver el cuerpo de la respuesta

  if (!response.ok) {
    throw new Error("Error en el registro. Por favor, verifica los datos.");
  }

  return data;
};



// Función para iniciar sesión
export async function login(userData: ILoginProps) {
  try {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      return res.json();
    } else {
      throw Error("Failed to Login");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export const fetchAppointment = async (appointment: IAppointment) => {
  const response = await fetch(`http://localhost:3001/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  const data = await response.json();
  console.log("Response data from appointment:", appointment);
  return data;
};

