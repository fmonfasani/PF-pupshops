import { IAppointment } from "@/Interfaces/interfaces";

// Obtener los turnos
export const fetchAppointments = async (): Promise<IAppointment[]> => {
    const res = await fetch("http://localhost:3000/appointments");
    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }
    return res.json();
  }
  

  export const fetchUserAppointments = async (): Promise<{ 
    scheduledAppointments: IAppointment[], 
    historicalAppointments: IAppointment[] 
  }> => {
    const res = await fetch("http://localhost:3000/appointments/user"); // Ruta para obtener turnos del usuario
  
    if (!res.ok) {
      throw new Error("Failed to fetch user appointments");
    }
  
    const data = await res.json();
  
    // Validamos que los datos tengan la estructura esperada
    if (!data.scheduledAppointments || !data.historicalAppointments) {
      throw new Error("Unexpected data format");
    }
  
    return data;
  };