import ShoppingListItem from "./ShoppingListItem";

export default class AppService {
    public add(item:ShoppingListItem) {
        throw new Error("Not implemented");
    }

    public getItems():Array<ShoppingListItem> {
        throw new Error("Not implemented");
    }
}