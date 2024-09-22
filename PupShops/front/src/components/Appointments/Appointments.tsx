"use client";

import { useState } from "react";
import {
  isDateValid,
  getMinAndMaxDates,
} from "@/utils/validationFormAppointments";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  //TODO Obtener las fechas mínima y máxima permitidas

  const { minDate, maxDate } = getMinAndMaxDates();

  //TODO Manejar cambios en la fecha seleccionada

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    //TODO Si la fecha no es válida, limpiamos el campo y mostramos alerta

    if (!isDateValid(dateValue)) {
      alert(
        "La fecha no es válida. Debe ser a partir de mañana, dentro de 5 días y no ser domingo."
      );
      setSelectedDate("");
    } else {
      setSelectedDate(dateValue);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `Día seleccionado: ${selectedDate}, Horario seleccionado: ${selectedTime}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Reservar Turno
      </h2>
      <div className="flex flex-col">
        <label htmlFor="date" className="font-medium text-gray-700 mb-2">
          Día:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          min={minDate}
          max={maxDate}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="time" className="font-medium text-gray-700 mb-2">
          Horario:
        </label>
        <select
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="" disabled>
            Seleccionar horario
          </option>
          {generateTimeSlots().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
      >
        Reservar Turno
      </button>
    </form>
  );
};

//TODO Generar los horarios de 9:00 a 20:00 con incrementos de 1 hora
const generateTimeSlots = () => {
  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
  }
  return timeSlots;
};

export default AppointmentForm;
