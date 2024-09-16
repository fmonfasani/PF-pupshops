import { ILoginUser } from "@/Interfaces/interfaces";

export const validateLogin = (userData: ILoginUser) => {
  const errors: { email?: string; password?: string } = {};
  let formIsValid = true;

  if (!userData.email) {
    formIsValid = false;
    errors.email = "El campo email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    formIsValid = false;
    errors.email = "Por favor ingrese un email válido.";
  }

  if (!userData.password) {
    formIsValid = false;
    errors.password = "La contraseña es obligatoria";
  } else if (userData.password.length < 6) {
    formIsValid = false;
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return { formIsValid, errors };
};
