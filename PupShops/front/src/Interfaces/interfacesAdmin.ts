export interface ICategory {
    id?: string;
    name: string;
  }
  
export interface IUploadProduct {
    id?:string;
    name: string;
    description: string;
    price:number;
    imgUrl:string;
    stock:number;
    category: ICategory | null
    waist:number;
    weight:string;

}

export interface IUploadProductComponentProps {
  onPreview?: (product: IUploadProduct) => void;
}