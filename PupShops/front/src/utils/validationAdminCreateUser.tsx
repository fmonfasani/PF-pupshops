import { IAdminRegisterUser } from "@/Interfaces/interfaces";


export const validationAdminCreateUSer = (adminRegisterUser: IAdminRegisterUser) => {
  let errors: { [key: string]: string } = {};

  // Validar nombre
  if (!adminRegisterUser.name) {
    errors.name = "Debes ingresar un nombre";
  } else if (adminRegisterUser.name.length > 50) {
    errors.name = "El nombre debe tener hasta 50 caracteres";
  }

  // Validar apellido
  if (!adminRegisterUser.lastname) {
    errors.lastname = "Debes ingresar un apellido";
  } else if (adminRegisterUser.lastname.length > 50) {
    errors.lastname = "El apellido debe tener hasta 50 caracteres";
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!adminRegisterUser.email) {
    errors.email = "Debes ingresar un correo electrónico";
  }

  // Validar contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!adminRegisterUser.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (!passwordRegex.test(adminRegisterUser.password)) {
    errors.password = "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
  }

// Validar confirmar contraseña
if (!adminRegisterUser.confirmPassword) {
  errors.confirmPassword = "Debes confirmar la contraseña";
} else if (adminRegisterUser.confirmPassword !== adminRegisterUser.password) {
  errors.confirmPassword = "Las contraseñas no coinciden";
}


  // Validar dirección
  if (!adminRegisterUser.address) {
    errors.address = "Debes ingresar una dirección";
  } else if (adminRegisterUser.address.length > 80) {
    errors.address = "La dirección debe tener hasta 80 caracteres";
  }

  
// Validar teléfono
if (!adminRegisterUser.phone) {
  errors.phone = "Debes ingresar un número de teléfono";
} else {
  const phoneString = adminRegisterUser.phone.toString();
  if (phoneString.length < 10) {
    errors.phone = "El número de teléfono debe tener al menos 10 dígitos.";
  } else if (phoneString.length > 15) {
    errors.phone = "El número de teléfono no puede tener más de 15 dígitos.";
  }
}



  // Validar país
  if (!adminRegisterUser.country) {
    errors.country = "Debes ingresar un país";
  } else if (adminRegisterUser.country.length > 20) {
    errors.country = "El país debe tener hasta 20 caracteres";
  }

  // Validar ciudad
  if (!adminRegisterUser.city) {
    errors.city = "Debes ingresar una ciudad";
  } else if (adminRegisterUser.city.length > 20) {
    errors.city = "La ciudad debe tener hasta 20 caracteres";
  }

    // Validar checkbox (aceptar términos)
    if (!adminRegisterUser.isAdmin) {
        errors.isChecked = "Debe aceptar los términos y condiciones";
      }
    
      return errors;
    
};
