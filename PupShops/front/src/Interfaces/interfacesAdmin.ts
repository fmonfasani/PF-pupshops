import { IUserRegister } from "./interfaces";

export interface ICategory {
    id?: string;
    name: string;
  }

  export interface ISubCategory {
    id?: string;
    name: string;
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

