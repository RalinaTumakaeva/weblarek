import { IProduct } from "../../types/index.ts";

export class CatalogModel {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }
public saveProducts(products: IProduct[]): void {
    this.products = products;
  }
public getProducts(): IProduct[] {
  return this.products;
}
public getProductById(id: string): IProduct | undefined {
  return this.products.find(product => product.id === id);
}
public setSelectedProduct(product: IProduct): void {
  this.selectedProduct = product;
}
public getSelectedProduct(): IProduct | null {
  return this.selectedProduct;
}
}