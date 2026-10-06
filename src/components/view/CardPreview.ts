import { categoryMap } from "../../utils/constants.ts";
import { ensureElement } from "../../utils/utils.ts";
import { CardGeneral } from "./CardGeneral.ts";
import type { ICardPreview } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends CardGeneral<ICardPreview> {
    private _categoryElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _imageElement: HTMLImageElement;
    private _buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
        this._descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
        this._imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
        this._buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

        this._buttonElement.addEventListener("click", (e) => {
            e.stopPropagation();
            this.events.emit("preview:submit");
        });
    }

    set image(url: string) {
    super.setImage(this._imageElement, url);
    }

    set category(value: string) {
        this._categoryElement.textContent = value;
        this._categoryElement.className = `card__category ${categoryMap[value as CategoryKey]}`;
    }

    set description(value: string) {
        this._descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this._buttonElement.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this._buttonElement.disabled = value;
    }
}
