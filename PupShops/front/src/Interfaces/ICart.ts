// ICart.ts
export interface IProduct {
  id: number; 
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryName: string;
}

export interface ICartContextType {
  cartItems: IProduct[];
  addToCart: (productId: number) => Promise<boolean>;
  removeFromCart: (productId: number) => void; 
  total: number;
  proceedToBuy: () => Promise<void>;
  purchasedItems: IProduct[];
}