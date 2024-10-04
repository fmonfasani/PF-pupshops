import { IProductDetail } from "../app/products/[id]/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getAllProducts = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await fetch(`http://localhost:3001/products?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return await res.json();
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
