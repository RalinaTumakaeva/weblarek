import { IProduct } from "../../types/index.ts";

export class BasketModel {
  private items: IProduct[] = [];

  constructor() {
    this.items = [];
  }
  public getItems(): IProduct[] {
    return this.items;
  }
  public addItem(item: IProduct): void {
    this.items.push(item);
  }
  public removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }
  public clear(): void {
    this.items = [];
  }
  public getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      const price = item.price ?? 0;
      return total + price;
    }, 0)
  }
  public getCount(): number {
    return this.items.length;
  }
  public includeItem(itemId: string): boolean {
    return this.items.some(item => item.id === itemId);
  }
}
