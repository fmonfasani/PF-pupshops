import { IProductDetail } from "../app/products/[id]/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getAllProducts = async () => {
  try {
    const res = await fetch(`http://localhost:3001/products`);
    console.log("Raw response:", res); 
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await res.json();
    console.log("Products:", products); 
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export async function fetchProductDetail(id: string): Promise<IProductDetail> {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
}
