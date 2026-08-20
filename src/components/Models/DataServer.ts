import { BasketModel } from "./BasketModel.ts";
import { BuyerModel } from "./BuyerModel.ts";
import { CatalogModel } from "./CatalogModel.ts";
import { Api } from "../api/Api.ts";
import { Order } from "../../types/index.ts";
import { ServerProducts } from "../../types/index.ts";

export class DataServer {
  private api: Api;
  private basket: BasketModel;
  private buyer: BuyerModel;
  private catalog: CatalogModel;
  
  constructor(
    api: Api, 
    basket: BasketModel,
    buyer: BuyerModel, 
    catalog: CatalogModel, 

  ) {
    this.api = api;
    this.catalog = catalog;
    this.buyer = buyer;
    this.basket = basket;
  }
public async loadProducts(): Promise<void> {
  const products: ServerProducts = await this.api.get('/product');
  this.catalog.saveProducts(products)
}
public async sendOrder(): Promise<void> {
  const buyerData = this.buyer.getData();
  if(!buyerData) {
     throw new Error('Заполните данные покупателя!');
  }
  const items = this.basket.getItems();
  const payload: Order = {
              items: items,
              buyer: buyerData
            };
  await this.api.post('/order/', payload);
}
}