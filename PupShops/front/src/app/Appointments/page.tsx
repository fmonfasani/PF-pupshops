import AppointmentForm from "@/components/Appointments/Appointments";

const TurnosPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Reservar Turno</h1>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default TurnosPage;
