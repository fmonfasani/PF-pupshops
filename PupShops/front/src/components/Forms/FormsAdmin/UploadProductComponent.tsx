"use client"
import { ButtonForms } from '@/components/Buttons/ButtonsForms';
import { IUploadProduct } from '@/Interfaces/interfacesAdmin';
import { fetchUploadProduct } from '@/utils/fetchAdmin';
import { validateProduct } from '@/utils/validationUploadProduct';
import React, { useContext, useState } from 'react';
import { NotificationError } from '@/components/Notifications/NotificationError';
import { NotificationUploadProduct } from '@/components/Notifications/NotificationUploadProduct';
import ImageUpload from '@/components/Cloudinary/imageUpload';
import { UserContext } from '@/context/userContext';

const categories = [
  { name: 'Perro', subcategories: ['Alimento para perros', 'Accesorios para Perro', 'Juguetes de Perro'] },
  { name: 'Gato', subcategories: ['Alimento para gatos', 'Accesorios para gatos', 'Juguetes de Gato'] }
];

const sizes = ['Pequeña', 'Mediana', 'Grande'];
const weights = ['sin especificar', '2kg', '7kg', '15kg'];

export default function UploadProductComponent() {
  const { isAdmin } = useContext(UserContext);

  

  const [dataProduct, setDataProduct] = useState<IUploadProduct>({
    name: '',
    description: '',
    price: 0,
    imgUrl: '',
    stock: 0,
    categoryName: '',
    waist: '',
    weight: null,
  });

  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' || name === 'stock' ? Number(value) : value;
    const updatedProduct = {
      ...dataProduct,
      [name]: updatedValue
    };
    setDataProduct(updatedProduct);
    setErrors(validateProduct(updatedProduct));
  };

  const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedMainCategory(selectedCategory);
    setSelectedSubCategory('');
    setDataProduct(prevData => ({
      ...prevData,
      categoryName: '', 
    }));
    console.log('Categoría principal seleccionada:', selectedCategory);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategory = e.target.value;
    setSelectedSubCategory(selectedSubCategory);
    setDataProduct(prevData => ({
      ...prevData,
      categoryName: selectedSubCategory 
    }));
    console.log('Subcategoría seleccionada:', selectedSubCategory);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataProduct(prevData => ({
      ...prevData,
      waist: e.target.value
    }));
    console.log('Tamaño seleccionado:', e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataProduct(prevData => ({
      ...prevData,
      weight: e.target.value === '' ? null : e.target.value
    }));
    console.log('Peso seleccionado:', e.target.value === '' ? 'null' : e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateProduct(dataProduct);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const product: IUploadProduct = {
      ...dataProduct,
      price: Number(dataProduct.price),
      stock: Number(dataProduct.stock),
    };
    console.log('Producto que se está enviando:', product);

    try {
      const success = await fetchUploadProduct(product);
      if (success) {
        setNotificationMessage('Carga de producto exitosa');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        setDataProduct({
          name: '',
          description: '',
          price: 0,
          imgUrl: '',
          stock: 0,
          categoryName: '',
          waist: '',
          weight: null,
        });
      } else {
        setErrors({ ...errors, general: 'Error al cargar productos' });
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido.');
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    }
  };
  if (!isAdmin) {
    return <p className='mt-20'>No tienes permisos para cargar productos.</p>; 
  }
  return (
    <section className="bg-gray-100 font-sans mt-9">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl px-4 rounded-lg shadow-lg bg-white">
          <h1 className="text-center text-2xl pt-6 font-bold text-blue-950 sm:text-3xl">Agregar nuevo producto</h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Complete el siguiente formulario para agregar un nuevo producto.
          </p>
          <form onSubmit={onSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor='name' className="block text-sm font-medium text-gray-700">Nombre del producto</label>
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
  
              <div>
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
  
              <div>
                <label htmlFor='mainCategory' className="block text-sm font-medium text-gray-700">Mascota</label>
                <select
                  id='mainCategory'
                  value={selectedMainCategory}
                  onChange={handleMainCategoryChange}
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm hover:cursor-pointer"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor='subcategory' className="block text-sm font-medium text-gray-700">Subcategoría</label>
                <select
                  id='subcategory'
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm hover:cursor-pointer"
                >
                  <option value="">Selecciona una subcategoría</option>
                  {categories
                    .find(category => category.name === selectedMainCategory)
                    ?.subcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                {errors.subcategory && <span className="text-red-500 text-sm">{errors.subcategory}</span>}
                </select>
              </div>
  
              <div>
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
  
              <div>
                <label htmlFor='waist' className="block text-sm font-medium text-gray-700">Tamaño</label>
                <select
                  id='waist'
                  name='waist'
                  value={dataProduct.waist}
                  onChange={handleSizeChange}
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm hover:cursor-pointer"
                >
                  <option value="">Selecciona un tamaño</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <label htmlFor='weight' className="block text-sm font-medium text-gray-700">Peso</label>
                <select
                  id='weight'
                  name='weight'
                  value={dataProduct.weight ?? ''}
                  onChange={handleWeightChange}
                  className="w-full rounded-lg border border-gray-200 p-4 text-sm shadow-sm hover:cursor-pointer"
                >
                  <option value="">Selecciona un peso</option>
                  {weights.map(weight => (
                    <option key={weight} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Imagen</label>
  <ImageUpload onUpload={(url: string) => setDataProduct(prev => ({ ...prev, imgUrl: url }))} />
  
</div>

  
              {/* Campo de precio agregado aquí */}
              <div>
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
  
            <ButtonForms text='Cargar producto' disabled={Object.keys(errors).length > 0} type='submit' />
          </form>
        </div>
      </div>
      {showNotification && <NotificationUploadProduct message={notificationMessage} />}
      {showErrorNotification && <NotificationError message={errorMessage} onClose={() => setShowErrorNotification(false)} />}
    </section>
  );
  
}
