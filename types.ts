
export enum Category {
  ELECTRONICS = 'Electronics',
  ELECTRICAL = 'Electrical',
  ACCESSORIES = 'Accessories',
  OTHERS = 'Others'
}

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  businessName?: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  description: string;
  image_url: string;
  userId: string;
}

export interface Purchase {
  id: string;
  product_id: string;
  quantity: number;
  purchase_price_per_unit: number;
  total_amount: number;
  supplier_name: string;
  date: string;
  invoice_number: string;
  document_url?: string;
  userId: string;
}

export interface Sale {
  id: string;
  product_id: string;
  quantity: number;
  selling_price_per_unit: number;
  total_amount: number;
  customer_name: string;
  date: string;
  payment_method: 'Cash' | 'Card' | 'MFS';
  document_url?: string;
  userId: string;
}

export interface Document {
  id: string;
  file_name: string;
  file_url: string;
  upload_date: string;
  related_to: 'Purchase' | 'Sale' | 'General';
  userId: string;
}

export interface AppState {
  user: User | null;
  products: Product[];
  purchases: Purchase[];
  sales: Sale[];
  documents: Document[];
  lookerStudioUrl: string;
}
