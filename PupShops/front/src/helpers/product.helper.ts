const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async (page: number = 1, limit: number = 10) => {
  try {
    const res = await fetch(`${APIURL}/products?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return await res.json(); // Debería devolver un JSON con la lista de productos
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
