import { IUserRegister } from "./interfaces";
import { IProduct } from "./ICart";

export interface ICategory {
    id?: string;
    name: string;
  }

  export interface ISubCategory {
    id?: string;
    name: string;
  }

  export interface ICreateAdmin {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    city: string;
    address: string;
    phone: number;
    isAdmin?:boolean;
    isActive?: boolean; // Esto indica que el usuario está activo por defecto
  }
  
  
  export interface IUploadProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    stock: number;
    categoryName: string; 
    waist?: string;
    weight?: string | null;
  }
  

export interface IUploadProductComponentProps {
  onPreview?: (product: IUploadProduct) => void;
}

export interface IOrder {
  id: string;
  date: string; 
  status: string;
  userId: string; 
}

