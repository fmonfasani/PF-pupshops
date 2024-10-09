import {
  IAppointment,
  ILoginResponse,
  ILoginUser,
  IUserRegister,
} from "@/Interfaces/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchRegisterUser = async (user: IUserRegister) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido'); 
  }

  const data = await response.json();
  return data;
}


// Función para iniciar sesión
export const login = async (credentials: ILoginUser): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return { success: false, token: "", findUser: null }; 
    }

    const data = await response.json();
    console.log("Response data from login:", data);
    
    return {
      success: data.success,
      token: data.token,
      findUser: data.findUser,
    };
    
  } catch (error) {
    console.error("Error during login request:", error);
    return { success: false, token: "", findUser: null }; 
  }
};

//Crear turno
export const fetchAppointment = async (appointment: IAppointment, token: string) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(appointment),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el turno");
  }

  return await response.json();
};


//Turnos de un usuario
export const fetchUserAppointments = async (token: string) => {
  const response = await fetch(`${API_URL}/appointments/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener turnos');
  }

  return await response.json();
};

// Cancelar turno
export const cancelAppointment = async (appointmentId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: 'canceled',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'Error desconocido al cancelar el turno');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al cancelar el turno: ${error.message}`);
    } else {
      throw new Error('Error desconocido al cancelar el turno');
    }
  }
};




export const checkUserEmail = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/check-email?email=${email}`);
  return await response.json();
};



