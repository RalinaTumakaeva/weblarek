import type { IBuyer, TPaymentModel, TBuyerErrors } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class BuyerModel {
    private __payment: TPaymentModel | null = null;
    private __address: string = '';
    private __email: string = '';
    private __phone: string = '';

    constructor(private events: IEvents) {}

    setData(data: Partial<IBuyer>): void {
        if (data.address !== undefined) this.__address = data.address;
        if (data.email !== undefined) this.__email = data.email;
        if (data.phone !== undefined) this.__phone = data.phone;
        if (data.payment !== undefined) this.__payment = data.payment;
        this.events.emit('customer:changed');
    }

    getData(): IBuyer {
        return {
            address: this.__address,
            email: this.__email,
            phone: this.__phone,
            payment: this.__payment,
        };
    }

    clear(): void {
        this.__address = '';
        this.__email = '';
        this.__phone = '';
        this.__payment = null;
        this.events.emit('customer:changed');
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (this.__address === '') {
            errors.address = 'Укажите адрес';
        }
        if (this.__email === '') {
            errors.email = 'Укажите email';
        }
        if (this.__phone === '') {
            errors.phone = 'Укажите телефон';
        }
        if (this.__payment === null) {
            errors.payment = 'Не выбран способ оплаты';
        }
        return errors;
    }
}
