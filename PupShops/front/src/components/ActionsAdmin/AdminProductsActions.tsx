"use client";
import React, { useState } from 'react';
import { ButtonForms } from '../Buttons/ButtonsForms';
import { fetchDeleteProduct, fetchProductById, fetchUpdateProduct } from '@/utils/fetchAdmin';
import { IProduct } from '../CardList/Products';
import NotificationActionAdmin from '../Notifications/NotificationActionAdmin';

interface AdminProductActionsProps {
  id: string;
  onDeleteNotification: (message: string) => void;
  onErrorNotification: (message: string) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminProductActions: React.FC<AdminProductActionsProps> = ({
  id,
  onDeleteNotification,
  onErrorNotification,
  onDeleteProduct
}) => {
  const [showConfirm, setShowConfirm] = useState(false); // Estado para mostrar el modal de confirmación
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<IProduct>({
    id: "",
    name: "",
    price: 0,
    imgUrl: "",
    description: "",
    stock: 0,
    category: {
      id: "",
      name: "",
    }
  });

  const handleDelete = async () => {
    try {
      console.log(`Intentando eliminar el producto con id: ${id}`);
      await fetchDeleteProduct(id);
      onDeleteNotification('Producto eliminado con éxito');
      onDeleteProduct(id); 
    } catch (error) {
      console.error("Error al eliminar:", error);
      const message = error instanceof Error ? error.message : "Error desconocido.";
      onErrorNotification(message);
    }
  };

  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const product = await fetchProductById(id); // Obtener los datos del producto
      setProductData(product); // Establecer los datos del producto para edición
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al obtener el producto.";
      onErrorNotification(message);
    }
  };

  const handleSave = async () => {
    try {
      await fetchUpdateProduct(id, productData); // Lógica para enviar la actualización al backend
      onDeleteNotification('Producto actualizado con éxito');
      setIsEditing(false); // Cerrar modo edición
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al actualizar el producto.";
      onErrorNotification(message);
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirm(true); // Mostrar la confirmación antes de eliminar
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Cancelar la eliminación
  };

  const handleConfirmAction = async () => {
    setShowConfirm(false); // Ocultar la confirmación después de eliminar
    await handleDelete(); // Ejecutar la lógica de eliminación
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value, // Convertir a número si es necesario
    }));
  };

  return (
    <div className="flex flex-col gap-2 p-1 max-w-sm mx-auto"> 
      {isEditing ? (
        <div>
          <input 
            type="text" 
            name="name"
            value={productData.name} 
            onChange={handleChange} 
            placeholder="Nombre del producto"
            className="border rounded p-1 w-full mb-2" 
          />
          <input 
            type="number" 
            name="price"
            value={productData.price} 
            onChange={handleChange} 
            placeholder="Precio"
            className="border rounded p-1 w-full mb-2" 
          />
          <input 
            type="text" 
            name="imgUrl"
            value={productData.imgUrl} 
            onChange={handleChange} 
            placeholder="URL de la imagen"
            className="border rounded p-1 w-full mb-2" 
          />
          <input 
            type="text" 
            name="description"
            value={productData.description} 
            onChange={handleChange} 
            placeholder="Descripción"
            className="border rounded p-1 w-full mb-2" 
          />
          <input 
            type="number" 
            name="stock"
            value={productData.stock} 
            onChange={handleChange} 
            placeholder="Stock"
            className="border rounded p-1 w-full mb-2" 
          />
          <ButtonForms text="Guardar cambios" onClick={handleSave} />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center m-2"> 
          <div className="flex justify-center w-full"> 
            <ButtonForms text="Editar producto" onClick={handleEdit} />
          </div>
          <div className="my-1" /> 
          <div className="flex justify-center w-full"> 
            <ButtonForms text="Eliminar producto" onClick={handleConfirmDelete} />
          </div>
        </div>
      )}

      {/* Mostrar el modal de confirmación si showConfirm es true */}
      {showConfirm && (
        <NotificationActionAdmin 
          onConfirm={handleConfirmAction} // Ejecutar la eliminación si se confirma
          onCancel={handleCancelDelete} // Cerrar el modal sin eliminar
        />
      )}
    </div>
  );
}

export default AdminProductActions;
