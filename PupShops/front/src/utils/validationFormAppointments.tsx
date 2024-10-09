export const isDateValid = (dateStr: string): boolean => {
  const selectedDate = new Date(dateStr);
  const today = new Date();

  // Día siguiente
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Máximo 5 días desde hoy
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  // Verificar que no sea domingo (0) y esté dentro del rango
  return (
    selectedDate >= tomorrow &&
    selectedDate <= maxDate &&
    selectedDate.getDay() !== 0
  );
};

// Obtener la fecha mínima (mañana) y máxima (5 días después) en formato YYYY-MM-DD
export const getMinAndMaxDates = (): { minDate: string; maxDate: string } => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];
  return { minDate: formatDate(minDate), maxDate: formatDate(maxDate) };
};
