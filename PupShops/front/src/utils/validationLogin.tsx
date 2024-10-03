import { ILoginUser } from "@/Interfaces/interfaces";

export const validateLogin = (userData: ILoginUser) => {
  const errors: { email?: string; password?: string } = {};
  let formIsValid = true;

// Validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!userData.email) {
  errors.email = "Debes ingresar un correo electrónico";
}

  // Validar contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!userData.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (!passwordRegex.test(userData.password)) {
    errors.password = "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
  }


  return { formIsValid, errors };
};
