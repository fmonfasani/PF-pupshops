import AppointmentForm from "@/components/Appointments/Appointments";
import Image from "next/image";
import pups from "../../../public/pups.png"

const TurnosPage = () => {
  return (
    <div className="min-h-screen flex items-center mt-16 justify-center bg-gray-100">
      <div className="bg-white flex items-center gap-5 p-8 rounded-md shadow-lg">
        <Image src={pups} alt="logo" width={150} height={150}/>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default TurnosPage;
