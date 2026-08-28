import './scss/styles.scss';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { BasketModel } from './components/Models/BasketModel.ts';
import { CatalogModel } from './components/Models/CatalogModel.ts';
import { AppApi } from './components/api/AppApi.ts';
import { Api } from "./components/base/Api.ts";
import { IApi } from './types/index.ts';      // <-- обязательно этот импорт
import { API_URL } from './utils/constants.ts';
import { apiProducts } from './utils/data.ts';

const catalog = new CatalogModel();
const basket = new BasketModel();
const buyer = new BuyerModel();

// Заполняем каталог начальными данными (для тестов методов getProductById и т.п.)
catalog.saveProducts(apiProducts.items);
console.log('✅ Массив товаров из каталога (initial): ', catalog.getProducts());

// Заполняем корзину одним товаром
basket.addItem(apiProducts.items[0]);
console.log('✅ Массив товаров из корзины (initial): ', basket.getItems());

// Заполняем данные покупателя
buyer.updateData({
  email: 'ralina@gmail.com',
  phone: '+78005553535',
  address: 'Космическая ул.',
  payment: 'card' as any, 
});
console.log('✅ Данные покупателя (initial): ', buyer.getData());


// --- Тестирование CatalogModel ---
console.log('\n📦 Тестирование CatalogModel:');

// getProductById — ищем товар по ID (берём ID первого товара из исходных данных)
const firstProductId = apiProducts.items[0].id;
const productById = catalog.getProductById(firstProductId);
console.log(`🔍 getProductById(${firstProductId}):`, productById);

// setSelectedProduct — выбираем товар
if (productById) {
  catalog.setSelectedProduct(productById);
  const selected = catalog.getSelectedProduct();
  console.log('🎯 setSelectedProduct + getSelectedProduct:', selected);
} else {
  console.log('⚠️ Товар для setSelectedProduct не найден');
}


// --- Тестирование BasketModel ---
console.log('\n🛒 Тестирование BasketModel:');

// includeItem — проверяем, есть ли товар в корзине
const isIncluded = basket.hasItem(apiProducts.items[0].id);
console.log(`✅ includeItem (ожидается true):`, isIncluded);

// addItem — добавляем ещё один товар (если есть второй в массиве)
if (apiProducts.items.length > 1) {
  basket.addItem(apiProducts.items[1]);
  console.log('➕ После addItem второго товара:', basket.getItems());
}

// getCount — количество товаров в корзине
const count = basket.getCount();
console.log(`📊 getCount (количество товаров):`, count);

// getTotalPrice — общая стоимость
const totalPrice = basket.getTotalPrice();
console.log(`💰 getTotalPrice (сумма):`, totalPrice);

// removeItem — удаляем товар по ID
if (productById) {
  basket.removeItem(productById.id);
  console.log('➖ После removeItem:', basket.getItems());
  console.log('📉 getCount после удаления:', basket.getCount());
}

// clear — полностью очищаем корзину
basket.clear();
console.log('🧹 После clear:', basket.getItems());
console.log('📉 getCount после clear:', basket.getCount());


// --- Тестирование BuyerModel ---
console.log('\n👤 Тестирование BuyerModel:');

// validate — валидация корректных данных (ошибок быть не должно)
const errorsValid = buyer.validate();
console.log('✅ validate (корректные данные, ошибок нет):', errorsValid);

// clearData — очищаем данные покупателя
buyer.clearData();
console.log('🧹 После clearData:', buyer.getData());

// validate — валидация после очистки (должны появиться ошибки)
const errorsAfterClear = buyer.validate();
console.log('❌ validate (после clearData, ожидаются ошибки):', errorsAfterClear);


// --- Тестирование AppApi (коммуникационный слой) ---
console.log('\n🌐 Тестирование AppApi:');

const api: IApi = new Api(API_URL); // зависимость от интерфейса, а не класса
// Конструктор принимает только IApi, без моделей
const appApi = new AppApi(api);

async function runTests() {
  try {
    // loadProducts — получаем товары с сервера и вручную сохраняем в модель
    console.log('⬇️ Загрузка товаров с сервера через AppApi...');
    const serverProducts = await appApi.loadProducts();
    
    // Сохраняем в модель каталога (ответственность main.ts)
    catalog.saveProducts(serverProducts);
    
    console.log('✅ Массив товаров после loadProducts (из модели):', catalog.getProducts());
    
    // Дополнительно проверим getProductById после загрузки с сервера
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
