import { IUploadProduct } from "@/Interfaces/interfacesAdmin";

//Cargar  productos
export const fetchUploadProduct = async (product:IUploadProduct) => {
    const response = await fetch(`https://localhost:3001/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      
  if (!response.ok) {
    throw new Error("Error al cargar producto. Por favor, verifica los datos.");
  }

  return response.json();
};