
export abstract class Component<T> {
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    get element(): HTMLElement {
        return this.container;
    }

    render(data?: Partial<T>): HTMLElement {
        if (data) {
            Object.assign(this, data);
        }
        return this.container;
    }
}
