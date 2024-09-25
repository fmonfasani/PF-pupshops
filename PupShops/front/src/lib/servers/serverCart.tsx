import { IProduct } from "@/Interfaces/ICart";

export const fetchProductsById = async (id: string): Promise<IProduct> => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.statusText}`);
    }

    const product: IProduct = await response.json();
    return product;
  } catch (error) {
    console.error("Error en fetchProductsById:", error);
    throw error; //
  }
};
