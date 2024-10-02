import { IProduct } from "@/Interfaces/ICart";

const BASE_URL = "http://localhost:3001/products";

// Función para obtener un producto por su ID
export const fetchProductsById = async (
  productId: number
): Promise<IProduct> => {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const product: IProduct = await response.json();
    product.price = Number(product.price);
    return product;
  } catch (error) {
    console.error("Error en fetchProductsById:", error);
    throw error;
  }
};

export const addToCart = async (
  userId: string,
  products: IProduct[],
  token: string
): Promise<void> => {
  try {
    const orderData = {
      userId,
      products: products.map((product) => ({
        id: product.id,
        quantity: product.quantity || 1,
      })),
    };

    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    console.log("Productos agregados al carrito en el servidor.");
  } catch (error) {
    console.error("Error al agregar al carrito en el servidor:", error);
    throw error;
  }
};