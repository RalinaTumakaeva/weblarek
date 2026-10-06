import { ensureElement } from '../../utils/utils.ts';
import { Component } from "../base/Component.ts";
import type { IForm } from '../../types/index.ts';

export class Form<T> extends Component<IForm & T> {
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
}
