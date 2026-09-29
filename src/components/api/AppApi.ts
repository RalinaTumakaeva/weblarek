import { IOrderData, IOrderResponse, IProductsResponse, IApi } from '../../types/index.ts';

export class AppApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    postOrder(data: IOrderData): Promise<IOrderResponse> {
        return this.api.post('/order/', data, 'POST');
    }

     getProducts(): Promise<IProductsResponse> {
        return this.api.get('/product/');
    }
}