import { CardGeneral } from './CardGeneral.ts';
import { ensureElement } from '../../utils/utils.ts';
import type { IBasketCard } from '../../types/index.ts';

export class BasketCard extends CardGeneral<IBasketCard> {
    private _indexElement: HTMLElement;
    private _deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, onDelete: () => void) {
        super(container);

        this._indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this._deleteButton.addEventListener('click', () => {
            onDelete();
        });
    }

    set index(value: number) {
        this._indexElement.textContent = String(value);
    }
}
