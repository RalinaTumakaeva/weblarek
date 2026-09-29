import { Component } from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';
import type { ICardGeneral } from "../../types/index.ts"

export class CardGeneral extends Component<ICardGeneral> {
    private _priceElement: HTMLElement;
    private _titleElement: HTMLElement;
    
    constructor(container: HTMLElement) {
        super(container)
        this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this._priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set data(value: ICardGeneral) {
        this._titleElement.textContent = value.title;
        this._priceElement.textContent = value.price ? `${value.price} синапсов` : 'Бесценно';
    }
}