import { ILoginProps, IRegisterProps } from "../Interfaces/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Función para registrar un usuario
export async function register(userData: IRegisterProps) {
  if (!APIURL) {
    throw new Error("APIURL no está definida");
  }

  try {
    const res = await fetch(`${APIURL}/auth/signup`, {
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
    const res = await fetch(`${APIURL}/auth/signin`, {
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
