import { makeObservable, observable, action, computed } from "mobx";

export abstract class ModalDialogModel {
    protected visible = false;

    constructor() {
        makeObservable<ModalDialogModel, "visible">(this, {
            visible: observable,
            show: action,
            hide: action,
            Visible: computed
        });
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    get Visible(): boolean {
        return this.visible;
    }
}
