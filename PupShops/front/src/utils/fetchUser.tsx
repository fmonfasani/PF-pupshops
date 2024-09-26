import {
  IAppointment,
  ILoginUser,
  IUserRegister
} from "@/Interfaces/interfaces";

export const fetchRegisterUser = async (user: IUserRegister) => {
  const response = await fetch(`http://localhost:3000/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Error en el registro. Por favor, verifica los datos.");
  }

  return response.json();
};

export const fetchLoginUser = async (userData: ILoginUser) => {
  const response = await fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión");
  }

  const data = await response.json();
  // Guardar el token y los datos del usuario en localStorage o en un contexto
  localStorage.setItem("token", data.token);
  return data.findUser; // Retorna los datos del usuario
};

export const fetchAppointment = async (appointment: IAppointment) => {
  const response = await fetch(`http://localhost:3000/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appointment)
  });
  const data = await response.json();
  console.log("Response data from appointment:", appointment);
  return data;
};
