


export const fetchAppointments = async (token: string) => {
  try {
    const response = await fetch('http://localhost:3001/appointments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los turnos');
    }

    const appointments = await response.json();
    return appointments;
  } catch (error) {
    console.error('Error en fetchAppointments:', error);
    throw error;
  }
};

export const fetchUserAppointments = async (userId: number, token: string) => {
  try {
    const response = await fetch(`http://localhost:3001/appointments/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los turnos del usuario');
    }

    const userAppointments = await response.json();
    return {
      scheduledAppointments: userAppointments.filter((appt: any) => appt.status === 'reserved'),
      historicalAppointments: userAppointments.filter((appt: any) => appt.status !== 'reserved')
    };
  } catch (error) {
    console.error('Error en fetchUserAppointments:', error);
    throw error;
  }
};

//Eliminar turno 
export const deleteAppointment = async (token: string, id: string) => {
  const response = await fetch(`http://localhost:3001/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Maneja el código de estado
  if (response.status === 204) {
    // Si el código de respuesta es 204, no hay contenido, la eliminación fue exitosa.
    return;
  }

  if (!response.ok) {
    throw new Error('Error al eliminar el turno'); // Lanza un error si la respuesta no es correcta
  }
};


