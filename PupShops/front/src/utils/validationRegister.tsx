import { IUserRegister } from "@/Interfaces/interfaces";

export const validationRegister = (userRegister: IUserRegister) => {
  const errors: { [key: string]: string } = {};

  // Validar nombre
  if (!userRegister.name) {
    errors.name = "Debes ingresar un nombre";
  } else if (userRegister.name.length > 50) {
    errors.name = "El nombre debe tener hasta 50 caracteres";
  }

  // Validar apellido
  if (!userRegister.lastname) {
    errors.lastname = "Debes ingresar un apellido";
  } else if (userRegister.lastname.length > 50) {
    errors.lastname = "El apellido debe tener hasta 50 caracteres";
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userRegister.email) {
    errors.email = "Debes ingresar un correo electrónico";
  } else if (!emailRegex.test(userRegister.email)) {
    errors.email = "El correo electrónico no es válido"; // Mensaje de error si el email no coincide con el regex
  }

  // Validar contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!userRegister.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (!passwordRegex.test(userRegister.password)) {
    errors.password = "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
  }

  // Validar confirmar contraseña
  if (!userRegister.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (userRegister.confirmPassword !== userRegister.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  // Validar dirección
  if (!userRegister.address) {
    errors.address = "Debes ingresar una dirección";
  } else if (userRegister.address.length > 80) {
    errors.address = "La dirección debe tener hasta 80 caracteres";
  }

  // Validar teléfono
  if (!userRegister.phone) {
    errors.phone = "Debes ingresar un número de teléfono";
  } else {
    const phoneString = userRegister.phone.toString();
    if (phoneString.length < 10) {
      errors.phone = "El número de teléfono debe tener al menos 10 dígitos.";
    } else if (phoneString.length > 15) {
      errors.phone = "El número de teléfono no puede tener más de 15 dígitos.";
    }
  }

  // Validar país
  if (!userRegister.country) {
    errors.country = "Debes ingresar un país";
  } else if (userRegister.country.length > 20) {
    errors.country = "El país debe tener hasta 20 caracteres";
  }

  // Validar ciudad
  if (!userRegister.city) {
    errors.city = "Debes ingresar una ciudad";
  } else if (userRegister.city.length > 20) {
    errors.city = "La ciudad debe tener hasta 20 caracteres";
  }

  return errors;
};
