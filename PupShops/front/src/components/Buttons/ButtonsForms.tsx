import React from "react";
import { IButtonProps, IButtonPropsDelete } from "@/Interfaces/interfaces";

export const ButtonForms: React.FC<IButtonProps> = ({text, onClick, type='submit',disabled=false}) => {
    return(
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className="block w-full rounded-lg bg-teal-950 hover:bg-orange-300 hover:text-black px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer">
            {text}
        </button>
    )
}



export const ButtonRedirectUser: React.FC<IButtonProps> = ({text, onClick, type='submit',disabled=false}) => {
    return(
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className="text-center text-sm text-gray-500 hover:cursor-pointer hover:font-bold">
            {text}
        </button>
    )
}

export const ButtonAdvert: React.FC<IButtonProps> = ({text, onClick, type="button"}) => {
    return (
        <button type={type} 
        onClick={onClick}
        className="w-40  bg-red-600 text-customText py-2 px-4 shadow-md rounded hover:cursor-pointer hover:bg-slate-700 hover:text-customText border ">
            {text}
        </button>
    )
}

export const ButtonDeleteUser: React.FC<IButtonPropsDelete> = ({ onConfirm, onCancel }) => {
    return (
        <div className="flex justify-center mt-6 text-center">
            <div className="rounded-lg bg-neutral-800 text-white p-8 w-3/6 shadow-2xl">
                <h2 className="text-lg font-bold">¿Estás seguro que deseas eliminar a esta cuenta?</h2>
                <div className="mt-4 flex justify-center gap-2"> 
                    <button 
                        type="button" 
                        onClick={onConfirm}
                        className="rounded bg-red-600 hover:cursor-pointer hover:bg-red-500 px-4 py-2 text-sm font-medium text-red-100"
                    >
                        Sí, eliminar
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel}
                        className="rounded bg-gray-50 hover:cursor-pointer hover:bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
                    >
                        No, volver atrás
                    </button>
                </div>
            </div>
        </div>
    );
};
