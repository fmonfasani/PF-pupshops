"use client"
import { fetchProductDetail } from "@/helpers/product.helper";
import React from "react";

export interface IProductDetail {
    id: string;
    name: string;
    price: string;
    imgUrl: string;
    description: string;
    
  }

export async function ProductDetail({ params }: { params: { id: string } }) {
    const product: IProductDetail = await fetchProductDetail(params.id);
    
    const { name, imgUrl, description, price } = product;
  
    const handleAddToCart = (productId: string) => {
        console.log(`Producto ${productId} añadido al carrito`); 
      };

      return (
        <div className="mt-28 mb-24">
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12">
          <img
            src={imgUrl}
            alt={name}
            className="h-48 w-full object-cover"
          />
          <div className="py-6 px-8">
            <h2 className="text-teal-600 font-bold text-xl mb-2 hover:text-purple-800 hover:cursor-pointer">
              {name}
            </h2>
            <p className="text-gray-700 tracking-wide mb-4">{description}</p>
            <span className="text-lg font-bold text-purple-800">
              ${parseFloat(price).toFixed(2)}
            </span>
          </div>
          
          <div className="p-4 text-center">
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="flex-1 py-2 bg-teal-600 text-white font-medium rounded-full shadow hover:bg-purple-900 transition duration-300 ease-in-out"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        </div>
      );
    }      

export default ProductDetail;
