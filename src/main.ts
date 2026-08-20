import './scss/styles.scss';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { BasketModel } from './components/Models/BasketModel.ts';
import { CatalogModel } from './components/Models/CatalogModel.ts';
import { DataServer } from './components/Models/DataServer.ts';
import { apiProducts } from './utils/data.ts';
import { Api } from './components/api/Api.ts';
import { API_URL } from './utils/constants.ts';

const catalog = new CatalogModel();
catalog.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', catalog.getProducts()); 

const basket = new BasketModel();
basket.addItem(apiProducts.items[0]);
console.log('Массив товаров из корзины: ', basket.getItems()); 

const buyer = new BuyerModel();
buyer.updateData({ 
  email: 'ralina@gmail.com', 
  phone: '+78005553535', 
  address: 'Космическая ул.', 
  payment: 'card' 
});
console.log('Данные покупателя: ', buyer.getData()); 

const api = new Api(API_URL);
const dataService = new DataServer(api, basket, buyer, catalog);

async function testLoad() {
  await dataService.loadProducts();
  console.log('Товар из каталога', catalog.getProducts());
}
testLoad();
