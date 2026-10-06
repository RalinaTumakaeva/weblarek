import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';
import { Form } from './Form.ts';
import type { IContactsForm } from '../../types/index.ts';

export class Contacts extends Form<IContactsForm> {
    private _emailElement: HTMLInputElement;
    private _phoneElement: HTMLInputElement;

    constructor(container: HTMLFormElement, private events: IEvents) {
        super(container);

        this._emailElement = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this._phoneElement = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

        this._phoneElement.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('contacts:phone', { phone: target.value.trim() });
        });

        this._emailElement.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit('contacts:email', { email: target.value.trim() });
        });

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('contacts:submit');
        });
    }

    set email(value: string) {
        this._emailElement.value = value ?? '';
    }

    set phone(value: string) {
        this._phoneElement.value = value ?? '';
    }
}
