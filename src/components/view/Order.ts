import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';
import { Form } from './Form.ts';
import type { IOrderForm } from '../../types/index.ts';
import type { TPayment } from '../../types/index.ts';

export class Order extends Form<IOrderForm> {
    private _addressElement: HTMLInputElement;
    private _paymentButtons: HTMLButtonElement[];

    constructor(container: HTMLFormElement, private events: IEvents) {
        super(container);

        this._addressElement = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
        this._paymentButtons = Array.from(
            this.container.querySelectorAll<HTMLButtonElement>('.button_alt')
        );

        this._addressElement.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('order:address', { address: target.value.trim() });
        });

        this._paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.payment = button.name as TPayment;
                this.events.emit('order:payment', { payment: button.name as TPayment });
            });
        });

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('order:submit');
        });
    }

    set address(value: string) {
        this._addressElement.value = value ?? '';
    }

    set payment(value: TPayment) {
        this._paymentButtons.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === value);
        });
    }
}
