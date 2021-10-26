import { makeAutoObservable, observable, action } from "mobx";
import { RouterStore } from "mobx-react-router";
import { AppRoutes, MyRoute } from "../Routing/AppRoutes";

/**
 * UI Store
 */
export class CaUiStore {

    selectedTab: number = 0;

    constructor(private routing: RouterStore) {
        makeAutoObservable(this, {
            actualRoute: observable,
            setActualPosition: action,
            selectedTab: observable,
            handleSelect: action.bound,
        });
    }

    handleSelect = (e: any) => {
        this.selectedTab = e.selected;
    };

    actualRoute?: MyRoute;

    setActualPosition(route: MyRoute) {
        this.actualRoute = AppRoutes.AllRoutes.find(i => i.name === route.name);
    }
}