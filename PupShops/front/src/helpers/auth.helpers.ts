import { ILoginProps, IRegisterProps } from "../Interfaces/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Función para registrar un usuario
export async function register(userData: IRegisterProps) {
  try {
    // Verificar si APIURL está definida
    if (!APIURL) {
      throw new Error("APIURL no está definida");
    }

    const res = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text(); // Captura la respuesta como texto
      throw new Error(`Failed to register: ${errorText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en el registro: ${error.message}`);
    }
    throw new Error("Error en el registro: Ocurrió un problema inesperado.");
  }
}

// Función para iniciar sesión
export async function login(userData: ILoginProps) {
  try {
    // Verificar si APIURL está definida
    if (!APIURL) {
      throw new Error("APIURL no está definida");
    }

    const res = await fetch(`${APIURL}/auth/signin`, {
      // Aquí se corrige la interpolación
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text(); // Captura la respuesta como texto
      throw new Error(`Failed to login: ${errorText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en el login: ${error.message}`);
    }
    throw new Error("Error en el login: Ocurrió un problema inesperado.");
  }
}
