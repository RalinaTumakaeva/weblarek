import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from "../base/Events.ts";
import { Form } from './Form.ts';
import type { TPayment } from '../../types/index.ts';

interface IOrder {
    address: string;
    payment: TPayment;
}

export class Order extends Form {
    private _addressInput: HTMLInputElement;
    private _cashButton: HTMLButtonElement;
    private _cardButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, private events: IEvents) {
        super(container);

        this._addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
        this._cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this._cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('order:submit');
        });

        this._addressInput.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('order:address', { address: target.value.trim() });
        });

        this._cashButton.addEventListener('click', () => {
            this.events.emit('order:payment', { payment: 'cash' });
        });

        this._cardButton.addEventListener('click', () => {
            this.events.emit('order:payment', { payment: 'card' });
        });
    }

    set data(value: IOrder) {
        this._addressInput.value = value.address ?? '';
        this._cashButton.classList.remove('button_alt-active');
        this._cardButton.classList.remove('button_alt-active');

        if (value.payment === 'card') {
            this._cardButton.classList.add('button_alt-active');
        } else if (value.payment === 'cash') {
            this._cashButton.classList.add('button_alt-active');
        }
    }
}