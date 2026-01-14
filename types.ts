
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  isVIP?: boolean;
  status: 'active' | 'blocked';
}

export interface Category {
  id: number;
  name:string;
  image: string;
  isFeatured: boolean;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending Confirmation' | 'Placed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  createdAt: string;
  address: string;
}

export interface AIRecommendation {
    name: string;
    reason: string;
}