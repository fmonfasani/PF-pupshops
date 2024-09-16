import React from "react";
import { IButtonProps } from "@/Interfaces/interfaces";

export const ButtonForms: React.FC<IButtonProps> = ({text, onClick, type='submit',disabled=false}) => {
    return(
        <button type={type}
        onClick={onClick}
        disabled={disabled}
        className="block w-full rounded-lg bg-sky-950 px-5 py-3 text-sm text-center font-medium text-white hover:cursor-pointer hover:bg-cyan-900">
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



