import AppService from "./AppService";
import ShoppingListItem from "./ShoppingListItem";
const { v4 } = require("uuid");



export class InMemoryCacheAppServiceFake implements AppService {
    private shoppingLists: Array<ShoppingListItem> = new Array<ShoppingListItem>();
    async add(item: ShoppingListItem):Promise<void> {
        let itemFound = undefined;
        if (item.id !== '') {
            itemFound = await this.shoppingLists.find(p => p.id === item.id);
        }

        if (itemFound === undefined) {
            item.id = v4();
            this.shoppingLists.push(item)
            return;
        }

        itemFound.quantity += 1;
        return;
    }
    async getItems(): Promise<ShoppingListItem[]> {
        return new Promise((resolve) => {
            resolve(this.shoppingLists);
            return this.shoppingLists;
        })
    }
    async deleteAll() {
        this.shoppingLists = new Array<ShoppingListItem>();
    }
    async deleteItem(item: ShoppingListItem) {
        const index = this.shoppingLists.findIndex(p => p.id === item.id);
        if (index !== -1) {
            this.shoppingLists.splice(index, 1);
        }
    }
    async updateItem(item: ShoppingListItem) {
        let itemFound = undefined;
        if (item.id !== '') {
            itemFound = this.shoppingLists.find(p => p.id === item.id);
        }

        if (itemFound === undefined) {
            throw Error("You need to include a correct id. The id '" + item.id + "' is not related to an item");
        }

        itemFound.quantity = item.quantity;
        itemFound.name = item.name;
    }
    async serverIsReady(): Promise<boolean> {
        return new Promise((resolve) => {
            resolve(true);
            return true;
        });
    }

}