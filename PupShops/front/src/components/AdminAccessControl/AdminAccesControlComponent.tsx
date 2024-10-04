"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonForms, ButtonRedirectUser } from '@/components/Buttons/ButtonsForms';
import { validationRegister } from '@/utils/validationRegister';
import { IUserRegister } from '@/Interfaces/interfaces';
import { NotificationRegister } from '@/components/Notifications/NotificationRegister';
import { NotificationError } from '@/components/Notifications/NotificationError';
import { UserContext } from '@/context/userContext';


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

export default function RegisterUser() {
    const router = useRouter();
    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword:"",
        country: "",
        city: "",
        address: "",
        phone: 0,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {signUpRegister} = useContext(UserContext);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        const updatedUser = {
            ...userRegister,
            [name]: value 
        };
        setUserRegister(updatedUser);
        
        setErrors(validationRegister(updatedUser));
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const user: IUserRegister = {
            name: userRegister.name,
            lastname: userRegister.lastname,
            email: userRegister.email,
            password: userRegister.password,
            confirmPassword: userRegister.confirmPassword,
            address: userRegister.address,
            phone: Number(userRegister.phone),
            country: userRegister.country,
            city: userRegister.city,
        };
        
        console.log('User que se está enviando:', user);
        
        try {
            const success = await signUpRegister(user);
            
            if (success) {
                setNotificationMessage(`Registro de nuevo administrador exitoso`);
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    router.push("/home");
                }, 3000);
                setUserRegister({
                    name: "",
                    lastname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    address: "",
                    phone: 0,
                    country: "",
                    city: ""
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
            <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
                <div className="rounded-lg bg-white py-8 px-4 shadow-lg lg:px-8">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="relative z-10 mt-0 bg-opacity-60 bg-white p-4 rounded-lg">
                            <h1 className="text-2xl font-bold text-center text-blue-950 ">
                                Nuevo administrador
                            </h1>
                            <p className="max-w-xl text-sm text-gray-600 text-center">
                               Completa los datos del usuario a quien quieras darle permisos de administrador 
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6">
                            <div className="md:col-span-1 lg:col-span-1">
                                <label htmlFor="name" className="sr-only">Nombre</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    name="name"
                                    type="text"
                                    value={userRegister.name}
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
                                    value={userRegister.lastname}
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
                                    value={userRegister.email}
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
                                    value={userRegister.phone}
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
                                    value={userRegister.address}
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
                                    value={userRegister.password}
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
                                    value={userRegister.confirmPassword}
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
                            value={userRegister.country}
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
                            value={userRegister.city}
                            onChange={handleChange}
                            disabled={!userRegister.country || !isValidCountry(userRegister.country)}
                        >
                            <option value="">Selecciona una ciudad</option>
                            {isValidCountry(userRegister.country) && cities[userRegister.country]?.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <ButtonForms text='Registrar administrador' disabled={Object.keys(errors).length > 0} type='submit' />            </form>
        </div>
    </div>
    {showNotification && <NotificationRegister message={notificationMessage} />}
    {showErrorNotification && <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />}
</section>
)
}