import { IProduct } from "@/components/CardList/Products";
import { IUploadProduct } from "@/Interfaces/interfacesAdmin";



//Cargar  productos
export const fetchUploadProduct = async (product:IUploadProduct) => {
    const response = await fetch(`http://localhost:3001/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      
  if (!response.ok) {
    throw new Error("Error al cargar producto. Por favor, verifica los datos o si el producto ya existe.");
  }

  return response.json();
};


// Eliminar productos
export const fetchDeleteProduct = async (id: string) => {
  
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); 
      throw new Error(`Error al eliminar el producto: ${errorData}`);
    }

    console.log('Producto eliminado con éxito');
   
  } catch (error) {
    console.error("Error en fetchDeleteProduct:", error);
    throw error; 
  }
};



 //Obtener producto por id  
export const fetchProductById = async (id:string) => {
  const response = await fetch(`http://localhost:3001/products/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el producto: ${response.statusText}`);
  }
  return await response.json();
};


//Modificar producto
export const fetchUpdateProduct = async(id:string, product:IProduct) => {
  const response = await fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  
if (!response.ok) {
throw new Error("Error al modificar producto");
}

return response.json();
};

