import { IUserRegister } from "@/Interfaces/interfaces";

export const validationRegister = (userRegister: IUserRegister, confirmPassword: string) => {
  let errors: { [key: string]: string } = {};

  // Validar nombre
  if (!userRegister.name) {
    errors.name = "Debes ingresar un nombre";
  } else if (userRegister.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  // Validar apellido
  if (!userRegister.lastname) {
    errors.lastname = "Debes ingresar un apellido";
  } else if (userRegister.lastname.length < 2) {
    errors.lastname = "El apellido debe tener al menos 2 caracteres";
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userRegister.email) {
    errors.email = "Debes ingresar un correo electrónico";
  } else if (!emailRegex.test(userRegister.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  // Validar contraseña
  if (!userRegister.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (userRegister.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  // Validar confirmar contraseña
  if (!confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (confirmPassword !== userRegister.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  // Validar dirección
  if (!userRegister.address) {
    errors.address = "Debes ingresar una dirección";
  } else if (userRegister.address.length < 5) {
    errors.address = "La dirección debe tener al menos 5 caracteres";
  }

  return errors;
};
