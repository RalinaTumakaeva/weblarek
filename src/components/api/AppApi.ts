import { IOrderData, IOrderResponse, IProductsResponse, IApi } from '../../types/index.ts';

export class AppApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  // loadProducts — возвращает сразу массив товаров (items), как требует ТЗ
  public async loadProducts(): Promise<IProductsResponse['items']> {
    const response = await this.api.get('/product/');
    return response.items; // возвращаем только массив, а не весь конверт
  }

  public async sendOrder(data: IOrderData): Promise<IOrderResponse> {
    return this.api.post('/order/', data, 'POST');
  }
}
