import { makeObservable, observable, action, computed } from "mobx";

export class ADetailModel<DTOType> {
    loading: boolean = false;

    id?: string;
    dto?: DTOType;

    constructor() {
        makeObservable(this, {
            loading: observable,
            id: observable,
            dto: observable.deep,
            setDto: action,
            Dto: computed,
        });
    }

    setDto(dto: DTOType) {
        this.dto = dto;
    }

    get Dto(): DTOType | undefined {
        return this.dto;
    }

}