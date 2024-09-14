import { IUserRegister } from "@/Interfaces/interfaces";

export const validationRegister = (userRegister: IUserRegister, confirmPassword: string) => {
  const errors: { [key: string]: string } = {};
  
  let formIsValid = true;

  // Validar nombre
  if (!userRegister.name) {
    formIsValid = false;
    errors.name = "El campo nombre es obligatorio";
  } else if (userRegister.name.length < 4) {
    formIsValid = false;
    errors.name = "El nombre debe tener al menos 4 caracteres.";
  }

  // Validar apellido
  if (!userRegister.lastname) {
    formIsValid = false;
    errors.lastname = "El apellido es obligatorio.";
  } else if (userRegister.lastname.length < 1) {
    formIsValid = false;
    errors.lastname = "El apellido debe tener al menos 1 carácter.";
  }

  // Validar email
  if (!userRegister.email) {
    formIsValid = false;
    errors.email = "El campo email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(userRegister.email)) {
    formIsValid = false;
    errors.email = "Por favor ingrese un email válido.";
  }

  // Validar contraseña
  if (!userRegister.password) {
    formIsValid = false;
    errors.password = "La contraseña es obligatoria";
  } else if (userRegister.password.length < 6) {
    formIsValid = false;
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  // Validar dirección
  if (!userRegister.address) {
    formIsValid = false;
    errors.address = "El campo dirección es obligatorio";
  } else if (userRegister.address.length < 5) {
    formIsValid = false;
    errors.address = "La dirección debe tener al menos 5 caracteres.";
  }

  // Validar teléfono
  if (!userRegister.phone) {
    formIsValid = false;
    errors.phone = "El campo celular es obligatorio";
  } else if (!/^\d{10}$/.test(userRegister.phone)) {
    formIsValid = false;
    errors.phone = "Por favor ingrese un número de celular válido (10 dígitos).";
  }

  // Validar confirmar contraseña
  if (userRegister.password && confirmPassword && userRegister.password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  // Validar país
  if (!userRegister.country) {
    errors.country = "El país es obligatorio.";
  }

  // Validar ciudad
  if (!userRegister.city) {
    errors.city = "La ciudad es obligatoria.";
  }

  return { formIsValid, errors };
};
