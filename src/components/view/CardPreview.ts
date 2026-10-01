import { categoryMap, CDN_URL } from "../../utils/constants.ts";
import { ensureElement } from "../../utils/utils.ts";
import { CardGeneral } from "./CardGeneral.ts";
import type { ICardPreview } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

type CategoryKey = keyof typeof categoryMap;

export class CardPreview extends CardGeneral {
    private _categoryElement: HTMLElement;
    private _descriptionElement: HTMLElement;
    private _imageElement: HTMLImageElement;
    private _buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);
        this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this._descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this._buttonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.events.emit('preview:submit');
        });
    }

    set image(url: string) {
        const src = url.startsWith('http') ? url : `${CDN_URL}/${url}`;
        super.setImage(this._imageElement, src);
    }

    set category(value: string) {
        this._categoryElement.textContent = value;
        this._categoryElement.className = `card__category ${categoryMap[value as CategoryKey]}`;
    }

    set description(value: string) {
        this._descriptionElement.textContent = value;
    }

    set buttonState(state: { text: string; disabled: boolean }) {
        this._buttonElement.textContent = state.text;
        this._buttonElement.disabled = state.disabled;
    }

    render(data?: Partial<ICardPreview>): HTMLElement {
        if (data?.image !== undefined) {
            this.image = data.image;
        }
        if (data?.category !== undefined) {
            this.category = data.category;
        }
        if (data?.description !== undefined) {
            this.description = data.description;
        }

        if (
            data?.price !== undefined ||
            data?.inBasket !== undefined
        ) {
            if (data.price === null) {
                this.buttonState = { text: 'Недоступно', disabled: true };
            } else {
                const text = data.inBasket ? 'Удалить из корзины' : 'В корзину';
                this.buttonState = { text, disabled: false };
            }
        }

        return this.container;
    }
}
