import { IProductDetail } from "../app/products/[id]/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getAllProducts = async (
  page: number = 1,
  limit: number = 10,
  categoryId?: string
) => {
  try {
    const url = categoryId
      ? `${BASE_URL}/products?categoryId=${categoryId}&page=${page}&limit=${limit}`
      : `${BASE_URL}/products?page=${page}&limit=${limit}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching products:", errorMessage);
    return { error: errorMessage };
  }
};

export const fetchProductDetail = async (
  id: string
): Promise<IProductDetail | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details: ${response.statusText}`
      );
    }
    const product = await response.json();
    return product;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching product detail:", errorMessage);
    return null;
  }
};
