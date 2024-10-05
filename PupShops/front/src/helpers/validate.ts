import { ILoginUser, IUserRegister } from "@/Interfaces/interfaces";


export function validateLoginForm(values: ILoginUser) {
  let errors: { email?: string; password?: string } = {};
  let formIsValid = true;

  if (!values.email) {
    errors.email = "Email es requerido";
    formIsValid = false;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email es inválido";
    formIsValid = false;
  }

  if (!values.password) {
    errors.password = "Contraseña es requerida";
    formIsValid = false; 
  }

  return { formIsValid, errors };
}


export function validateRegisterForm(values: IUserRegister, existingEmails: string[]) {
  let errors: { name?: string; email?: string; password?: string; confirmPassword?:string; address?: string; phone?: string } = {};

  if (!values.name) {
    errors.name = "El nombre es requerido";
  }

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email es inválido";
  } else if (existingEmails.includes(values.email)) {
    errors.email = "Este email ya está registrado, por favor elige otro";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "La confirmación de contraseña es requerida";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}
 
