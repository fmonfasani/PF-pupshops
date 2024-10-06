


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
