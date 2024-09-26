import React from 'react';

interface NotificationActionAdminProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const NotificationActionAdmin: React.FC<NotificationActionAdminProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="text-lg font-bold">¿Deseas eliminar el producto?</h2>
      <div className="mt-4 flex gap-2">
        <button 
          type="button" 
          className="rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
          onClick={onConfirm} // Ejecutar confirmación
        >
          Eliminar
        </button>
        <button 
          type="button" 
          className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
          onClick={onCancel} // Ejecutar cancelación
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default NotificationActionAdmin;
