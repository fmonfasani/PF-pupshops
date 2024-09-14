import { IUserRegister } from "@/Interfaces/interfaces";


export const validationRegister = (userRegister: IUserRegister) => {
    const errors: { [key: string]: string } = {};
  
    // Validate name
    if (!userRegister.name) {
      errors.name = "El nombre es obligatorio.";
    }
  
    // Validate lastname
    if (!userRegister.lastname) {
      errors.lastname = "El apellido es obligatorio.";
    }
  
    // Validate email
    if (!userRegister.email) {
      errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(userRegister.email)) {
      errors.email = "El email no es válido.";
    }
  
    // Validate phone
    if (userRegister.phone && !/^\d+$/.test(userRegister.phone)) {
      errors.phone = "El teléfono debe contener solo números.";
    }
  
    // Validate address
    if (!userRegister.address) {
      errors.address = "La dirección es obligatoria.";
    }
  
    // Validate password
    if (!userRegister.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (userRegister.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
  
    // Validate confirm password
    if (userRegister.password !== userRegister.confirmpassword) {
      errors.confirmpassword = "Las contraseñas no coinciden.";
    }
  
    // Validate country
    if (!userRegister.country) {
      errors.country = "El país es obligatorio.";
    }
  
    // Validate city
    if (!userRegister.city) {
      errors.city = "La ciudad es obligatoria.";
    }
  
    return errors;
  }