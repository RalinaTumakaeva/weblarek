import { ensureElement } from '../../utils/utils.ts';
import { Component } from "../base/Component.ts";
import { TPayment } from '../../types/index.ts';

interface IForm {
    valid: boolean;
    errors: string[];
    address?: string;
    payment?: TPayment;
    email?: string;
    phone?: string;
}

export class Form extends Component<IForm> {
    protected _handleButton: HTMLButtonElement;
    protected _errorElement: HTMLElement;

    constructor(container: HTMLFormElement) {
        super(container);
        this._handleButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
        this._errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    set valid(value: boolean) {
        this._handleButton.disabled = !value;
    }

    set errors(value: string[]) {
        this._errorElement.innerHTML = value.join(', ');
    }

    render(data?: Partial<IForm>): HTMLElement {
        if (data?.valid !== undefined) {
            this.valid = data.valid;
        }
        if (data?.errors !== undefined) {
            this.errors = data.errors;
        }
        return this.container;
    }
}
