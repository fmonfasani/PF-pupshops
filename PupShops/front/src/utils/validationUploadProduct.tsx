import { IUploadProduct } from "@/Interfaces/interfacesAdmin";
export const validateProduct = (productData: IUploadProduct) => {
  const errors: {
    name?: string;
    description?: string;
    price?: string;
    stock?: string;
    imgUrl?: string;
    categoryName?: string;  
    waist?: string;
    weight?: string;
  } = {};

  // Validar name
  if (!productData.name) {
    errors.name = "Debes ingresar un nombre para el producto";
    console.log("Error en el campo name:", errors.name); 
  } else if (productData.name.length > 50) {
    errors.name = "El nombre no debe exceder los 50 caracteres";
    console.log("Error en el campo name:", errors.name);  
  }

  // Validar description
  if (!productData.description) {
    errors.description = "Debes ingresar una descripción para el producto";
    console.log("Error en el campo description:", errors.description);  
  }

  // Validar price
  if (productData.price === undefined || productData.price === null) {
    errors.price = "Debes ingresar un precio";
    console.log("Error en el campo price:", errors.price); 
  } else if (productData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
    console.log("Error en el campo price:", errors.price); 
  }

  // Validar stock
  if (productData.stock === undefined || productData.stock === null) {
    errors.stock = "Debes ingresar un número de stock";
    console.log("Error en el campo stock:", errors.stock);  
  } else if (productData.stock <= 0) {
    errors.stock = "El stock debe ser mayor a 0";
    console.log("Error en el campo stock:", errors.stock);  
  }

   // Validar URL de imagen en validateProduct
if (!productData.imgUrl) {
  errors.imgUrl = "Haz click en Subir para realizar la carga";
}


  // Validar categoría
  if (!productData.categoryName) {
    errors.categoryName = "Debes seleccionar una categoría para el producto";
    console.log("Error en el campo categoryName:", errors.categoryName); 
  }

  // Validar waist
  if (!productData.waist) {
    errors.waist = "Debes seleccionar una categoría para el talle";
    console.log("Error en el campo waist:", errors.waist);  
  }

  // Validar peso (weight)
  if (!productData.weight) {
    errors.weight = "Debes seleccionar una categoría para el peso del alimento";
    console.log("Error en el campo weight:", errors.weight);  
  }

  console.log("Errores totales:", errors);  
  return errors;
};

