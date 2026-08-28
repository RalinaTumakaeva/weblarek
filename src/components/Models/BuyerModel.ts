import { IBuyer, TPayment, TBuyerErrors } from "../../types/index.ts";

export class BuyerModel {
  private payment: TPayment | null;
  private email: string;
  private phone: string;
  private address: string;

  constructor() {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }
  updateData(data: Partial<IBuyer>): void {
    if(data.payment !== undefined) {
      this.payment = data.payment
    }
    if(data.email !== undefined) {
      this.email = data.email
    }
    if(data.phone !== undefined) {
      this.phone = data.phone
    }
    if(data.address !== undefined) {
      this.address = data.address
    }
  }
  getData(): IBuyer {
  return {
    payment: this.payment,
    email: this.email,
    phone: this.phone,
    address: this.address,
  };
}

  clearData(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }
  
  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (this.payment === null) {
      errors.payment = 'Выберите вид оплаты';
    }
    if (this.email.length === 0) {
      errors.email = 'Укажите ваш email';
    }
    if (this.phone.length === 0) {
      errors.phone = 'Укажите номер телефона';
    }
    if (this.address.length === 0) {
      errors.address = 'Укажите адрес доставки';
    }
    return errors;
  }
}