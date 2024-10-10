import { IAppointment } from "@/Interfaces/interfaces";
import { IAppointmentAdmin } from "@/Interfaces/interfacesAdmin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAppointments = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los turnos');
    }

    const appointments: IAppointmentAdmin[] = await response.json();
    return appointments;
  } catch (error) {
    console.error('Error en fetchAppointments:', error);
    throw error;
  }
};

export const fetchUserAppointments = async (userId: number, token: string) => {
  try {
    const response = await fetch(`${API_URL}/appointments/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los turnos del usuario');
    }

    const userAppointments: IAppointment[] = await response.json();
    return {
      scheduledAppointments: userAppointments.filter((appt: IAppointment) => appt.status === 'reserved'),
      historicalAppointments: userAppointments.filter((appt: IAppointment) => appt.status !== 'reserved')
    };
  } catch (error) {
    console.error('Error en fetchUserAppointments:', error);
    throw error;
  }
};

//Eliminar turno 
export const deleteAppointment = async (token: string, id: string) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 204) {
    return;
  }

  if (!response.ok) {
    throw new Error('Error al eliminar el turno'); 
  }
};