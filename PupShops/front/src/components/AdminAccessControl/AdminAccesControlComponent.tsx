"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonForms } from '@/components/Buttons/ButtonsForms';
import { validationAdminCreateUSer } from '@/utils/validationAdminCreateUser';
import { IAdminRegisterUser } from '@/Interfaces/interfaces';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';
import { NotificationError } from '@/components/Notifications/NotificationError';
import { fetchAdminCreateUser } from '@/utils/fetchAdminCreateUser';
import { UserContext } from '@/context/userContext';



export default function AdminAccesControlComponent() {
  


type Country = "Argentina" | "Chile" | "Colombia" | "México";

const cities: Record<Country, string[]> = {
    Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Santa Fe", "Tafi viejo"],
    Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Temuco"],
    Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    México: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Cancún"]
};

const isValidCountry = (country: string): country is Country => {
    return ["Argentina", "Chile", "Colombia", "México"].includes(country);
};
    const router = useRouter();
    const [adminRegisterUser, setadminRegisterUser] = useState<IAdminRegisterUser>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword:"",
        country: "",
        city: "",
        address: "",
        phone: 0,
        isAdmin:false
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
        const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { user, isAdmin } = useContext(UserContext)
   
  
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [loading, setLoading] = useState(true);
  
    //Ruta privada
    useEffect(() => {
        if (!isAdmin) {
            setNotificationMessage(`Debes ser administrador para ver permisos`);
            setShowNotification(true);
            setLoading(false);
            
            setTimeout(() => {
                setShowNotification(false);
                router.push("/home");
            }, 2000);
            return; 
        } 
        setLoading(false);
    }, [isAdmin, router]);
    
    
    
  
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
      const updatedUser = {
          ...adminRegisterUser,
          [name]: type === 'checkbox' ? isChecked : value // Si es un checkbox, usa 'checked', de lo contrario usa 'value'
      };
        setadminRegisterUser(updatedUser);
        
        setErrors(validationAdminCreateUSer(updatedUser));
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const user: IAdminRegisterUser = {
            name: adminRegisterUser.name,
            lastname: adminRegisterUser.lastname,
            email: adminRegisterUser.email,
            password: adminRegisterUser.password,
            confirmPassword: adminRegisterUser.confirmPassword,
            address: adminRegisterUser.address,
            phone: Number(adminRegisterUser.phone),
            country: adminRegisterUser.country,
            city: adminRegisterUser.city,
            isAdmin:adminRegisterUser.isAdmin
        };
        
        console.log('User que se está enviando:', user);
        
        try {
         
            const success = await fetchAdminCreateUser(user);
            
            if (success) {
                setNotificationMessage(`Registro de nuevo administardor exitoso.`);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    router.push("/home");
                }, 3000);
                setadminRegisterUser({
                    name: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    address: "",
                    phone: 0,
                    country: "",
                    city: "",
                    isAdmin:false
                });
            } else {
                setErrors({ ...errors, general: "Registro inválido" });
            }
        } catch (error) {
            console.error("Error durante el registro:", error);
            setErrorMessage(error instanceof Error ? error.message : "Error desconocido."); 
            setShowErrorNotification(true); 
            setTimeout(() => setShowErrorNotification(false), 3000); 
        }
    };
    

    return (
        <section className="bg-gray-100 p-4 mt-16">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <>
                    <div>
                        <div className="mt-20 text-2xl font-bold text-center text-blue-950 mb-4">
                            Permisos de usuarios
                        </div>
                        <p className='max-w-xl text-sm text-gray-600 text-center mx-auto mb-8'>
                            Aquí puedes otorgar a usuarios permisos de administrador. Para realizarlo, debes hacer el registro con sus datos.
                        </p> 
                    </div>
                    <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
                        <div className="rounded-lg bg-white py-8 px-4 shadow-lg lg:px-8">
                            <form onSubmit={onSubmit} className="space-y-4">
                                <div className="relative z-10 mt-0 bg-opacity-60 bg-white p-4 rounded-lg">
                                    <h1 className="text-2xl font-bold text-center text-blue-950 ">
                                        Únete a Nuestra Comunidad
                                    </h1>
                                    <p className="max-w-xl text-sm text-gray-600 text-center">
                                        Regístrate hoy mismo, podrás acceder a promociones especiales y conocer las últimas novedades de nuestra tienda.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6">
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="name" className="sr-only">Nombre</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="name"
                                            type="text"
                                            value={adminRegisterUser.name}
                                            onChange={handleChange}
                                            placeholder="Nombre"
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="lastname" className="sr-only">Apellido</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="lastname"
                                            type="text"
                                            value={adminRegisterUser.lastname}
                                            onChange={handleChange}
                                            placeholder="Apellido"
                                        />
                                        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="email"
                                            type="email"
                                            value={adminRegisterUser.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="phone" className="sr-only">Celular</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="phone"
                                            type="number"
                                            value={adminRegisterUser.phone}
                                            onChange={handleChange}
                                            placeholder="Celular"
                                        />
                                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                                    </div>
                                    <div className="md:col-span-2 lg:col-span-2">
                                        <label htmlFor="address" className="sr-only">Dirección</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="address"
                                            type="text"
                                            value={adminRegisterUser.address}
                                            onChange={handleChange}
                                            placeholder="Dirección"
                                        />
                                        {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="password" className="sr-only">Contraseña</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="password"
                                            type="password"
                                            value={adminRegisterUser.password}
                                            onChange={handleChange}
                                            placeholder="Contraseña"
                                        />
                                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
                                        <input
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                            name="confirmPassword"
                                            type="password"
                                            value={adminRegisterUser.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirmar Contraseña"
                                        />
                                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                                        <select
                                            id="country"
                                            name="country"
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm hover:cursor-pointer"
                                            value={adminRegisterUser.country}
                                            onChange={handleChange}
                                        >
                                            <option value="">Selecciona un país</option>
                                            {Object.keys(cities).map((country) => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-1 lg:col-span-1">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                                        <select
                                            id="city"
                                            name="city"
                                            className="w-full rounded-lg border border-gray-200 p-3 text-sm hover:cursor-pointer"
                                            value={adminRegisterUser.city}
                                            onChange={handleChange}
                                            disabled={!adminRegisterUser.country || !isValidCountry(adminRegisterUser.country)}
                                        >
                                            <option value="">Selecciona una ciudad</option>
                                            {isValidCountry(adminRegisterUser.country) && cities[adminRegisterUser.country]?.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="md:col-span-2 lg:col-span-2">
                                    <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">
                                        ¿Es administrador?
                                    </label>
                                    <input
                                        id="isAdmin"
                                        name="isAdmin"
                                        type="checkbox"
                                        checked={adminRegisterUser.isAdmin}
                                        onChange={handleChange}
                                        className="ml-2 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                <ButtonForms text='Registrar administrador' disabled={Object.keys(errors).length > 0} type='submit' />
                            </form>
                        </div>
                    </div>
                    {showNotification && <NotificationRegister message={notificationMessage} />}
                    {showErrorNotification && <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />}
                </>
            )}
        </section>
    );
}