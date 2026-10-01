import { ensureElement } from '../../utils/utils';
import { Component } from "../base/Component";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    private _modalContent: HTMLElement;
    private _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this._modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this._closeButton.addEventListener('click', () => {
            this.close();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    open(content: HTMLElement): void {
        this.setContent(content);
        this.container.classList.add('modal_active');
    }

    setContent(content: HTMLElement): void {
        this._modalContent.replaceChildren(content);
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this._modalContent.innerHTML = '';
    }
}
