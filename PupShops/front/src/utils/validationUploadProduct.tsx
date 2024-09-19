import { IUploadProduct } from "@/Interfaces/interfacesAdmin";

export const validateProduct = (productData: IUploadProduct) => {
  const errors: {
    name?: string;
    description?: string;
    price?: string;
    stock?: string;
    imgUrl?: string;
    category?: string;
    waist?: string;
    weight?: string;
  } = {};
  
  // Validar name
  if (!productData.name) {
    errors.name = "Debes ingresar un nombre para el producto";
  } else if (productData.name.length > 50) {
    errors.name = "El nombre no debe exceder los 50 caracteres";
  }

  // Validar description
  if (!productData.description) {
    errors.description = "Debes ingresar una descripción para el producto";
  }

  // Validar price
  if (productData.price === undefined || productData.price === null) {
    errors.price = "Debes ingresar un precio";
  } else if (productData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

   // Validar price
   if (productData.price === undefined || productData.price === null) {
    errors.price = "Debes ingresar un precio";
  } else if (productData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

  // Validar stock
  const stockString = productData.stock?.toString().trim(); // Convertir a cadena y eliminar espacios en blanco
  if (stockString === "" || stockString === "0") {
    errors.stock = "Debes ingresar un número de stock mayor a 0";
  } else {
    const stockNumber = Number(stockString); // Convertir a número
    if (!Number.isInteger(stockNumber)) {
      errors.stock = "El stock debe ser un número entero";
    } else if (stockNumber < 1) {
      errors.stock = "El stock debe ser un número entero mayor o igual a 1";
    }
  }

  // Validar URL de imagen
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  if (!productData.imgUrl) {
    errors.imgUrl = "Debes ingresar una URL de imagen";
  } else if (!urlRegex.test(productData.imgUrl)) {
    errors.imgUrl = "Debes ingresar una URL válida";
  }

   // Validar categoría
   if (!productData.category) {
    errors.category = "Debes seleccionar una categoría para el producto";
  }

  // Validar waist
  if (productData.waist === undefined || productData.waist === null) {
    errors.waist = "Debes ingresar un valor para el talle";
  } else if (productData.waist < 0) {
    errors.waist = "El talle no puede ser un valor negativo";
  }

  // Validar peso (weight)
  if (!productData.weight) {
    errors.weight = "Debes ingresar un valor para el peso";
  }

  return errors;
};