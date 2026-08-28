export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cash';
export type ServerProducts = IProduct[];
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IApi {
  // Перегрузка для /product/ — сразу говорит TS, что вернётся IProductsResponse
  get(url: '/product/'): Promise<IProductsResponse>;
  
  // Общий случай для остальных запросов
  get<T = any>(url: string, params?: Record<string, any>): Promise<T>;
  post<T = any>(
    url: string,
    data: any,
    method?: 'POST' | 'PUT'
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  email: string;
  phone: string;
  address: string;
  payment: TPayment | null;
}

export interface Order {
  items: string[];
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
} 

export interface IOrderData {
    items: string[];
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IProductsResponse{
    total: number;
    items: IProduct[]
}



