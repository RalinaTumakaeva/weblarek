import './scss/styles.scss';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { BasketModel } from './components/Models/BasketModel.ts';
import { CatalogModel } from './components/Models/CatalogModel.ts';
import { AppApi } from './components/api/AppApi.ts';
import { Api } from "./components/base/Api.ts";
import { IApi } from './types/index.ts';     
import { API_URL } from './utils/constants.ts';
import { apiProducts } from './utils/data.ts';

const catalog = new CatalogModel();
const basket = new BasketModel();
const buyer = new BuyerModel();

catalog.saveProducts(apiProducts.items);
console.log('✅ Массив товаров из каталога (initial): ', catalog.getProducts());

basket.addItem(apiProducts.items[0]);
console.log('✅ Массив товаров из корзины (initial): ', basket.getItems());

buyer.updateData({
  email: 'ralina@gmail.com',
  phone: '+78005553535',
  address: 'Космическая ул.',
  payment: 'card', 
});
console.log('✅ Данные покупателя (initial): ', buyer.getData());


console.log('\n📦 Тестирование CatalogModel:');

const firstProductId = apiProducts.items[0].id;
const productById = catalog.getProductById(firstProductId);
console.log(`🔍 getProductById(${firstProductId}):`, productById);

if (productById) {
  catalog.setSelectedProduct(productById);
  const selected = catalog.getSelectedProduct();
  console.log('🎯 setSelectedProduct + getSelectedProduct:', selected);
} else {
  console.log('⚠️ Товар для setSelectedProduct не найден');
}

console.log('\n🛒 Тестирование BasketModel:');

const isIncluded = basket.hasItem(apiProducts.items[0].id);
console.log(`✅ includeItem (ожидается true):`, isIncluded);

if (apiProducts.items.length > 1) {
  basket.addItem(apiProducts.items[1]);
  console.log('➕ После addItem второго товара:', basket.getItems());
}

const count = basket.getCount();
console.log(`📊 getCount (количество товаров):`, count);

const totalPrice = basket.getTotalPrice();
console.log(`💰 getTotalPrice (сумма):`, totalPrice);

if (productById) {
  basket.removeItem(productById.id);
  console.log('➖ После removeItem:', basket.getItems());
  console.log('📉 getCount после удаления:', basket.getCount());
}

basket.clear();
console.log('🧹 После clear:', basket.getItems());
console.log('📉 getCount после clear:', basket.getCount());

console.log('\n👤 Тестирование BuyerModel:');

const errorsValid = buyer.validate();
console.log('✅ validate (корректные данные, ошибок нет):', errorsValid);

buyer.clearData();
console.log('🧹 После clearData:', buyer.getData());

const errorsAfterClear = buyer.validate();
console.log('❌ validate (после clearData, ожидаются ошибки):', errorsAfterClear);

console.log('\n🌐 Тестирование AppApi:');

const api: IApi = new Api(API_URL);
const appApi = new AppApi(api);

async function runTests() {
  try {
    console.log('⬇️ Загрузка товаров с сервера через AppApi...');
    const serverProducts = await appApi.loadProducts();
    
    catalog.saveProducts(serverProducts);
    
    console.log('✅ Массив товаров после loadProducts (из модели):', catalog.getProducts());
    
    if (serverProducts.length > 0) {
      const firstServerProduct = serverProducts[0];
      const found = catalog.getProductById(firstServerProduct.id);
      console.log(`🔍 Проверка getProductById после loadProducts:`, found);
    }

  } catch (error) {
    console.error('💥 Ошибка при loadProducts:', error);
  }
}

runTests();
