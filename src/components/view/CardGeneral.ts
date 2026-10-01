import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import type { ICardGeneral } from "../../types/index.ts";

export class CardGeneral extends Component<ICardGeneral> {
    private _priceElement: HTMLElement;
    private _titleElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this._priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this._titleElement.textContent = value;
    }

    set price(value: number | null) {
        if (value === null || value === undefined) {
            this._priceElement.textContent = 'Бесценно';
        } else {
            this._priceElement.textContent = `${value} синапсов`;
        }
    }

    render(data?: Partial<ICardGeneral>): HTMLElement {
        if (data?.title !== undefined) {
            this.title = data.title;
        }
        if (data?.price !== undefined) {
            this.price
              }
        return this.container;
    }
}
