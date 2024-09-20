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

  // Validar stock
  if (productData.stock === undefined || productData.stock === null) {
    errors.stock = "Debes ingresar un número de stock";
  } else if (productData.stock <= 0) {
    errors.stock = "El stock debe ser mayor a 0";
  } 

  // Validar URL de imagen
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  if (!productData.imgUrl) {
    errors.imgUrl = "Debes ingresar una URL de imagen";
  } else if (!urlRegex.test(productData.imgUrl)) {
    errors.imgUrl = "Debes ingresar una URL válida";
  }

  // Validar categoría
  if (!productData.categoryName) {
    errors.category = "Debes seleccionar una categoría para el producto";
  }

  // Validar waist
  if (productData.waist === undefined || productData.waist === null) {
    errors.waist = "Debes ingresar un valor para el talle";
  } else if (productData.waist.trim() === '') {
    errors.waist = "El talle no puede estar vacío";
  }

  // Validar peso (weight)
  if (productData.weight === undefined || productData.weight === null || productData.weight.trim() === '') {
    errors.weight = "Debes ingresar un valor para el peso";
  }

  return errors;
};
