import { IProduct } from "@/Interfaces/ICart";
import clothesCatArray from "@/helpers/clothesCatArray"; // Importa el array

export const fetchProductsById = async (id: string): Promise<IProduct> => {
  try {
    console.log("Buscando producto con ID:", id);
    
    // Busca el producto en el array local
    const product = clothesCatArray.find(item => item.id === parseInt(id));
    
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return product;
  } catch (error) {
    console.error("Error en fetchProductsById:", error);
    throw error;
  }
};
