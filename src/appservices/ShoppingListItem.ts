export default class ShoppingListItem {
    _name: string;
    _quanity: number;
    constructor() {
        this._name = '';
        this._quanity = 0;
    }
    get name() {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get quantity() {
        return this._quanity;
    }

    set quantity(value:number) {
        this._quanity = value
    }
}