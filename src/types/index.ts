export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cash';
export type TPaymentModel = TPayment | null;
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
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
  payment: TPaymentModel;
}

export interface IForm {
    valid: boolean;
    errors: string[];
}

export interface IOrderForm {
    address: string;
    payment: TPayment;
}

export interface IContactsForm {
    email: string;
    phone: string;
}

export interface IOrderData extends IBuyer {
  items: string[];
  total: number;
} 

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface ICardGeneral {
  title: string;
  price: number | null;
}

export interface IBasketCard extends ICardGeneral {
    index: number;
}

export interface ICardCatalog extends ICardGeneral {
  category: string;
  image: string;
}

export interface ICardPreview extends ICardGeneral {
  category: string;
  description: string;
  image: string;
  inBasket?: boolean;
  buttonText: string;
  buttonDisabled: boolean;
}



