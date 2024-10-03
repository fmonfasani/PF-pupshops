import React from "react";
import { IButtonProps } from "@/Interfaces/interfaces";

export const ButtonForms: React.FC<IButtonProps> = ({text, onClick, type='submit',disabled=false}) => {
    return(
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className="block w-full rounded-lg bg-teal-600 hover:bg-orange-300 hover:text-black px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer">
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

