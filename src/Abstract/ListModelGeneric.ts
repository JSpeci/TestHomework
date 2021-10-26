import { observable, computed, action, makeObservable } from "mobx";

export class ListModelGeneric<T> {
    loading: boolean = false;
    protected findInput: string = "";
    private array: T[] = [];
    protected lastRequestDataTime?: Date;

    constructor() {
        makeObservable<ListModelGeneric<T>, "findInput" | "array" | "lastRequestDataTime">(this, {
            findInput: observable,
            array: observable.deep,
            Items: computed,
            SetFindInput: action,
            ResetFindInput: action,
            SetArray: action,
            loading: observable,
            AddItem: action,
            GetFindInput: computed,
            lastRequestDataTime: observable,
            ShouldRequestNewList: computed,
        });
    }

    get Items(): T[] {
        return this.array;
    }

    public SetFindInput(input: string | number | string[] | undefined): void {
        this.findInput = (input as string);
    }

    get GetFindInput(): string | number | string[] | undefined {
        return this.findInput;
    }

    get ShouldRequestNewList() {
        const cond1 = this.lastRequestDataTime === undefined
        const cond2 = (this.lastRequestDataTime || new Date()).getTime() + 300000 <= new Date().getTime();
        const cond3 = cond1 || cond2
        return cond3;
    }

    public ResetFindInput(): void {
        this.findInput = "";
    }

    public SetArray(array: T[]) {
        this.array = array;
        this.lastRequestDataTime = new Date();
    }

    public AddItem(item: T) {
        this.array.push(item);
    }

    public RemoveItem(item: T) {
        const index = this.array.indexOf(item);
        if (index > -1) {
            this.array.splice(index, 1);
        }
    }
}
