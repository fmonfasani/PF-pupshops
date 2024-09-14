"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonForms, ButtonRedirectUser } from '@/components/Buttons/ButtonsForms';
import { validationRegister } from '@/utils/validationRegister';
import { IUserRegister } from '@/Interfaces/interfaces';

type Country = "Argentina" | "Chile" | "Colombia" | "México";

const cities: Record<Country, string[]> = {
    Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Santa Fe"],
    Chile: ["Santiago", "Valparaíso", "Concepción", "La Serena", "Temuco"],
    Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    México: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Cancún"]
};

export default function RegisterUser() {
    const router = useRouter();
    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        country: "" as Country,
        city: "",
        address: "",
        phone: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(validationRegister({
            ...userRegister,
            [name]: value
        }));
    };

    const handleRegisterRedirect = () => {
        router.push("/userDashboard/login");
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validationRegister(userRegister);

        if (Object.keys(validationErrors).length === 0) {
            const userRegisterData = {
                name: userRegister.name,
                lastname: userRegister.lastname,
                email: userRegister.email,
                password: userRegister.password,
                address: userRegister.address,
                phone: userRegister.phone,
                country: userRegister.country,
                city: userRegister.city,
            };
    
            // Agregar la lógica para enviar userRegisterData al servidor.
            //Agregar confirmacion al usuario de registro exitoso
    
            router.push('/userDashboard/login');
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <section className="bg-gray-100">
            <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6">
                <div className="rounded-lg bg-white py-8 px-4 shadow-lg lg:px-8">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="relative z-10 mt-0 bg-opacity-60 bg-white p-4 rounded-lg">
                            <h1 className="text-2xl font-bold text-center text-blue-950 mb-4">
                                Únete a Nuestra Comunidad
                            </h1>
                            <p className="max-w-xl text-sm text-gray-600 text-center">
                                Regístrate hoy mismo, podrás acceder a promociones especiales y conocer las últimas novedades de nuestra tienda.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
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
                            <div>
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
                            <div>
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
                            <div>
                                <label htmlFor="phone" className="sr-only">Celular</label>
                                <input
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    name="phone"
                                    type="tel"
                                    value={userRegister.phone}
                                    onChange={handleChange}
                                    placeholder="Celular"
                                />
                                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                            </div>
                            <div>
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
                            <div>
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
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                                <select
                                    id="country"
                                    name="country"
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    value={userRegister.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un país</option>
                                    {Object.keys(cities).map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                                <select
                                    id="city"
                                    name="city"
                                    className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                    value={userRegister.city}
                                    onChange={handleChange}
                                    disabled={!userRegister.country}
                                >
                                    <option value="">Selecciona una ciudad</option>
                                    {userRegister.country && Object.prototype.hasOwnProperty.call(cities, userRegister.country) &&
                                        cities[userRegister.country as Country]?.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <ButtonForms text='Registrarme' disabled={Object.keys(errors).length > 0} type='submit' />
                        <ButtonRedirectUser text="¿Ya posees una cuenta? Haz clic aquí para ingresar" onClick={handleRegisterRedirect} />
                    </form>
                </div>
            </div>
        </section>
    );
}
