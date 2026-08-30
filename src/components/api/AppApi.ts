import { IOrderData, IOrderResponse, IProductsResponse, IApi } from '../../types/index.ts';

export class AppApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public async loadProducts(): Promise<IProductsResponse['items']> {
    const response = await this.api.get<IProductsResponse>('/product/');
    return response.items; 
  }

  public async sendOrder(data: IOrderData): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', data, 'POST');
  }
}
