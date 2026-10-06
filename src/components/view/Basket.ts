import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IEvents } from "../base/Events.ts";

interface IBasket {
    list: HTMLElement[];
    totalPrice: number;
    isOrderAvailable: boolean;
}

export class Basket extends Component<IBasket> {
    private _buttonElement: HTMLButtonElement;
    private _listElement: HTMLUListElement;
    private _totalPriceElement: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._listElement = ensureElement<HTMLUListElement>(".basket__list", this.container);
        this._totalPriceElement = ensureElement<HTMLElement>(".basket__price", this.container);
        this._buttonElement = ensureElement<HTMLButtonElement>(".basket__button", this.container);
        this._buttonElement.disabled = true;

        this._buttonElement.addEventListener("click", () => {
            this.events.emit("basket:submit");
        });
    }

    set list(value: HTMLElement[]) {
        this._listElement.replaceChildren(...value);
    }

    set totalPrice(value: number) {
        this._totalPriceElement.textContent = String(value) + " синапсов";
    }

    set isOrderAvailable(value: boolean) {
        this._buttonElement.disabled = !value;
    }
}
