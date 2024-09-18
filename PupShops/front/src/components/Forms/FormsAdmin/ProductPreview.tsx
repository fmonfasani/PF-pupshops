
import React from 'react';
import { IUploadProduct } from '@/Interfaces/interfacesAdmin';

interface ProductPreviewProps {
  product: IUploadProduct;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-blue-950">Vista Previa</h2>
      <div className="mt-4">
        <p className="text-gray-800"><strong>Nombre:</strong> {product.name}</p>
        <p className="text-gray-800"><strong>Descripción:</strong> {product.description}</p>
        <p className="text-gray-800"><strong>Precio:</strong> ${product.price}</p>
        <p className="text-gray-800"><strong>Stock:</strong> {product.stock}</p>
        <p className="text-gray-800"><strong>Categoría:</strong> {product.category?.name}</p>
        <p className="text-gray-800"><strong>Waist:</strong> {product.waist}</p>
        <p className="text-gray-800"><strong>Weight:</strong> {product.weight}</p>
        {product.imgUrl && (
          <img
            src={product.imgUrl}
            alt={product.name}
            className="mt-4 w-12 h-12 object-cover"
            style={{ width: '50px', height: '50px' }} 
          />
        )}
      </div>
    </div>
  );
};

export default ProductPreview;
