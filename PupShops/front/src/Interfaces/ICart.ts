export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  categoryName: string;
  quantity?: number;
  orderId?: string;
}

export interface IOrder {
  id?: string;
  date?: string;
  status?: string;
  items?: IProduct[];
}

export interface ICartContextType {
  cartItems: IProduct[];

  addToCart: (productId: number, quantity?: number) => Promise<boolean>;
  removeFromCart: (productId: number) => void;

  total: number;
  proceedToBuy: () => Promise<{
    orderId: string;
    finalTotal: number;
  } | null>;

  purchasedItems: IProduct[];
}
