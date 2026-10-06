import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";

export class CardGeneral<T> extends Component<T> {
    protected _titleElement: HTMLElement;
    protected _priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this._priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this._titleElement.textContent = value;
    }

    set price(value: number) {
        this._priceElement.textContent = value > 0
            ? `${value} синапсов`
            : 'Бесценно';
    }

    protected setImage(el: HTMLImageElement, src: string): void {
        el.src = src;
        el.alt = '';
    }
}
