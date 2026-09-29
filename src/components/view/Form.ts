import { ensureElement } from '../../utils/utils.ts';
import { Component } from "../base/Component.ts";

interface IForm {
    email?: string
    phone?: string
    address?: string
    payment?: string
    error: string
}

export class Form extends Component<IForm> {
    protected _handleButton: HTMLButtonElement;
    protected _errorElement: HTMLElement;

    constructor(container: HTMLFormElement) {
        super(container);
        this._handleButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
        this._errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    set errors(errors: string[]) {
        this._handleButton.disabled = errors.length > 0
        this._errorElement.innerHTML = errors.join(', ')
    }
}