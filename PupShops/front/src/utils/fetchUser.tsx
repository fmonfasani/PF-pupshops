import {
  IAppointment,
  ILoginUser,
  IUserRegister,
} from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegisterUser = async (user: IUserRegister) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`http://localhost:3001/auth/signup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });

  if (!response.ok) { // Comprueba si la respuesta no es exitosa
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido'); // Lanza un error con el mensaje recibido
  }

  const data = await response.json();
  return data;
}



// Función para iniciar sesión
export const login = async (credentials: ILoginUser) => {
  try {
    const response = await fetch("http://localhost:3001/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return { login: false, error: errorData }; // Indica que el login falló
    }

    const data = await response.json();
    console.log("Response data from login:", data);
    
    return {
      login: true,
      token: data.token,
      user: data.findUser,
    }; // Asegúrate de devolver el token y la información del usuario
  } catch (error) {
    console.error("Error during login request:", error);
    return { login: false, error: "Error desconocido" }; // Error de conexión
  }
};


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

