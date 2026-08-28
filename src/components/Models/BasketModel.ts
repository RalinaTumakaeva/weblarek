import { IProduct } from "../../types/index.ts";

export class BasketModel {
  private items: IProduct[] = [];

  constructor() {
    this.items = [];
  }
  getItems(): IProduct[] {
    return this.items;
  }
  addItem(item: IProduct): void {
    this.items.push(item);
  }
  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }
  clear(): void {
    this.items = [];
  }
  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      const price = item.price ?? 0;
      return total + price;
    }, 0)
  }
  getCount(): number {
    return this.items.length;
  }
  hasItem(itemId: string): boolean {
    return this.items.some(item => item.id === itemId);
  }
}
