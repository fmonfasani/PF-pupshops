"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from '@/Interfaces/interfaces';
import { fetchUserById } from "@/utils/fetchAdminCreateUser";
import { UserContext } from "@/context/userContext";
import { deleteUser } from "@/utils/fetchAdminCreateUser";
import { NotificationError } from "@/components/Notifications/NotificationError";
import { NotificationRegister } from "@/components/Notifications/NotificationRegister";
import { ButtonDeleteUser } from "@/components/Buttons/ButtonsForms";

const UserDetailsPage = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteAdvert, setShowDeleteAdvert] = useState(false);
    const [showNotificationDelete, setShowNotificationDelete] = useState(false);
    const [notificationMessageDelete, setNotificationMessageDelete] = useState("");
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { id } = params;
    const { token } = useContext(UserContext);

    useEffect(() => {
        if (id && token) {
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const userData = await fetchUserById(id, token);
                    setUser(userData);
                } catch (err) {
                    console.error("Error fetching user:", err);
                    setError("Error al obtener los detalles del usuario.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, token]); 

    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>No se encontró el usuario.</p>;

    const handleDeleteUser = async () => {
        if (token === null) {
            setErrorMessage("Token inválido. No se puede eliminar el usuario.");
            return;
        }

        try {
            await deleteUser(id, token);
            setNotificationMessageDelete("Usuario eliminado con éxito");
            setShowNotificationDelete(true);
            setTimeout(() => {
                setShowNotificationDelete(false);
                router.push("/adminDashboard/users/usersData");
            }, 3000);
        } catch (error) {
            console.error("Error deleting user:", error);
            setErrorMessage("Error al eliminar el usuario.");
            setShowErrorNotification(true);
        }
    };

    return (
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-36">
            <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">
                Detalles del Usuario: {user.name} {user.lastname}
            </h1>
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto"> 
                <h2 className="text-xl font-semibold text-teal-600 mb-2 text-center">
                    {user.name} {user.lastname}
                </h2>
                <p className="text-gray-600 mb-1 text-center">Email: {user.email}</p> 
                <p className="text-gray-600 mb-1 text-center">País: {user.country}</p>
                <p className="text-gray-600 mb-1 text-center">Ciudad: {user.city}</p>
                <p className="text-gray-600 mb-1 text-center">Teléfono: {user.phone}</p>
                <p className="text-gray-600 mb-1 text-center">
                    Rol: {user.isAdmin ? "Administrador" : "Usuario"}
                </p>
            </div>
            <button 
                type="button" 
                onClick={() => setShowDeleteAdvert(true)} 
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
            >
                Eliminar usuario
            </button>

            {showDeleteAdvert && (
                <ButtonDeleteUser 
                    onConfirm={handleDeleteUser}
                    onCancel={() => setShowDeleteAdvert(false)} 
                />
            )}

            {showNotificationDelete && (
                <NotificationRegister message={notificationMessageDelete} />
            )}
            {showErrorNotification && (
                <NotificationError
                    message={errorMessage}
                    onClose={() => setShowErrorNotification(false)}
                />
            )}
        </div>
    );
};

export default UserDetailsPage;     
