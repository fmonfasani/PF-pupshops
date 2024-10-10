export interface IProduct {
  id: number;
  name: string;
  originalTotal: number;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryName: string;
  quantity?: number;
  orderId?: string;
}

export interface ICartContextType {
  cartItems: IProduct[];

  addToCart: (productId: number, quantity?: number) => Promise<boolean>;
  removeFromCart: (productId: number) => void;

  total: number; 
  originalTotal: number; 
  discountTotal: number;
  proceedToBuy: () => Promise<void>;
  purchasedItems: IProduct[];
}

