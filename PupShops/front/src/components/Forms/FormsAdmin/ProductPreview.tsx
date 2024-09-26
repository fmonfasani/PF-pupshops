
import React from 'react';
import { IUploadProduct } from '@/Interfaces/interfacesAdmin';


const ProductPreview: React.FC<{ product: IUploadProduct }> = ({ product }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col">
        {/* Imagen del producto */}
        <div className="relative overflow-hidden h-80">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-cover transform transition duration-300 scale-100 group-hover:scale-95"
          />
        </div>

        {/* Detalles del producto */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-teal-600 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
            <p className="text-gray-600 mb-4 text-sm">Precio: ${product.price}</p>
            <p className="text-gray-600 mb-4 text-sm">Stock: {product.stock}</p>
            <p className="text-gray-600 mb-4 text-sm">Waist: {product.waist}</p>
            <p className="text-gray-600 mb-4 text-sm">Weight: {product.weight}</p>
          </div>

          {/* Enlaces de acción */}
          <div className="mt-auto">
            <a
              href="#"
              className="block w-full text-center rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-300 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-2"
            >
              Más Información
            </a>
            <a
              href="#"
              className="block w-full text-center rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-300 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-2"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
