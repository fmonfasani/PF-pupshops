import { ButtonForms } from '@/components/Buttons/ButtonsForms'
import { IUploadProduct, ICategory } from '@/Interfaces/interfacesAdmin';
import { fetchUploadProduct } from '@/utils/fetchAdmin';
import { validateProduct } from '@/utils/validationUploadProduct';
import React, { useState } from 'react'

//waist haria S M L XL
//Modificar o eliminar producto?
//Hacer vista previa del producto?
//Establecer porcentaje de descuento
const categories: ICategory[] = [
  { name: 'Alimento balanceado' },
  { name: 'Ropa' },
  { name: 'Jueguetes' },
 ];

export default function UploadProductComponent() {
  const [dataProduct, setDataProduct] = useState<IUploadProduct>({
    name: '',
    description: '',
    price: 0,
    imgUrl: '',
    stock: 0,
    category: null,
    waist: 0,
    weight: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updateProduct = {
      ...dataProduct, [name]: value
    };
    setDataProduct(updateProduct);
    setErrors(validateProduct(updateProduct));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = categories.find(cat => cat.name === selectedCategoryName) || null;
    setDataProduct(prevData => ({
      ...prevData,
      category: selectedCategory
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product: IUploadProduct = {
      name: dataProduct.name,
      description: dataProduct.description,
      price: dataProduct.price,
      imgUrl: dataProduct.imgUrl,
      stock: dataProduct.stock,
      category: dataProduct.category,
      waist: dataProduct.waist,
      weight: dataProduct.weight
    };
    console.log('Producto que se está enviando:', product);
    try {
      await fetchUploadProduct(product);
      alert("Carga de producto exitosa");
      setDataProduct({
        name: '',
        description: '',
        price: 0,
        imgUrl: '',
        stock: 0,
        category: null,
        waist: 0,
        weight: ''
      });
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert(error instanceof Error ? error.message : "Error desconocido.");
    }
  };

  return (
    <section className="bg-gray-100 font-sans">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl px-4 rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl pt-6 font-bold text-blue-950 sm:text-3xl">Agregar nuevo producto</h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Complete el siguiente formulario para agregar un nuevo producto. Al presionar click en <strong>agregar producto</strong>, se registrará y podrás verlo en su categoría correspondiente
          </p>
          <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
              <div className="col-span-1">
                <label htmlFor='name' className="sr-only">Nombre del producto</label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={dataProduct.name}
                  onChange={handleChange}
                  placeholder='Nombre del producto'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
  
              <div className="col-span-1">
                <label htmlFor='description' className="block text-sm font-medium text-gray-700">Descripción</label>
                <input
                  id='description'
                  name='description'
                  type='text'
                  value={dataProduct.description}
                  onChange={handleChange}
                  placeholder='Descripción del producto'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
              </div>
  
              <div className="col-span-1">
                <label htmlFor='price' className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  id='price'
                  name='price'
                  type='number'
                  value={dataProduct.price}
                  onChange={handleChange}
                  placeholder='Precio del producto'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
              </div>
            </div>
  
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor='imgUrl' className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                <input
                  id='imgUrl'
                  name='imgUrl'
                  type='text'
                  value={dataProduct.imgUrl}
                  onChange={handleChange}
                  placeholder='URL de la imagen del producto'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.imgUrl && <span className="text-red-500 text-sm">{errors.imgUrl}</span>}
              </div>
  
              <div className="col-span-1">
                <label htmlFor='stock' className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  id='stock'
                  name='stock'
                  type='number'
                  value={dataProduct.stock}
                  onChange={handleChange}
                  placeholder='Cantidad en stock'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}
              </div>
            </div>
  
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
              <div className="col-span-1">
                <label htmlFor='category' className="block text-sm font-medium text-gray-700">Categoría</label>
                <select
                  id='category'
                  name='category'
                  value={dataProduct.category?.name || ''}
                  onChange={handleCategoryChange}
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
              </div>
  
              <div className="col-span-1">
                <label htmlFor='waist' className="block text-sm font-medium text-gray-700">Waist</label>
                <input
                  id='waist'
                  name='waist'
                  type='number'
                  value={dataProduct.waist}
                  onChange={handleChange}
                  placeholder='Waist size'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.waist && <span className="text-red-500 text-sm">{errors.waist}</span>}
              </div>
  
              <div className="col-span-1">
                <label htmlFor='weight' className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  id='weight'
                  name='weight'
                  type='text'
                  value={dataProduct.weight}
                  onChange={handleChange}
                  placeholder='Weight description'
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm"
                />
                {errors.weight && <span className="text-red-500 text-sm">{errors.weight}</span>}
              </div>
            </div>
  
            <ButtonForms text='Agregar producto' disabled={Object.keys(errors).length > 0} type='submit' />
          </form>
        </div>
      </div>
    </section>
  )
  
}  
