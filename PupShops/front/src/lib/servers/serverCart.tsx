import { IProduct } from "@/Interfaces/ICart";


const BASE_URL = "http://localhost:3001/products";


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

export const fetchProductsByCategoryId = async (
  categoryId: string
): Promise<IProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/child/${categoryId}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const products: IProduct[] = await response.json();
    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return formattedProducts;
  } catch (error) {
    console.error("Error en fetchProductsByCategoryId:", error);
    throw error;
  }
};

export const addToCart = async (
  userId: string,
  products: IProduct[]
): Promise<void> => {
  try {
    const orderData = {
      userId,
      products: products.map((product) => ({
        id: product.id,
        quantity: product.quantity || 1, // Asegúrate de incluir quantity
      })),
    };


    const response = await fetch("http://localhost:3001/orders", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    console.log("Productos agregados al carrito con éxito");
  } catch (error) {
    console.error("Error al agregar productos al carrito:", error);
    throw error;
  }
};
