import { categoryMap } from "../../utils/constants.ts";
import { CardGeneral } from "./CardGeneral.ts";
import { ensureElement } from "../../utils/utils.ts";
import type { ICardCatalog } from "../../types/index.ts";

type CategoryKey = keyof typeof categoryMap;

export class CardCatalog extends CardGeneral {
    private _categoryElement: HTMLElement;
    private _imageElement: HTMLImageElement;

    constructor(container: HTMLElement, onAction: () => void) {
        super(container);
        this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

        this.container.addEventListener('click', () => {
            onAction();
        });
    }

    set data(value: ICardCatalog) {
        this.setImage(this._imageElement, value.image);

        this._categoryElement.textContent = value.category;
        this._categoryElement.className = `card__category ${categoryMap[value.category as CategoryKey]}`;
    }
}


