// src/utils/appointments.ts
export const fetchAppointments = async () => {
  const response = await fetch("/api/appointments"); // Asegúrate de que esta sea la ruta correcta
  const data = await response.json();
  return data;
};

export const fetchUserAppointments = async (userId: string) => {
  const response = await fetch(`/api/appointments/user/${userId}`);
  const data = await response.json();
  return data;
};
