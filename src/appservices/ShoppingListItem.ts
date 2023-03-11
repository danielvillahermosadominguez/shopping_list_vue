export default class ShoppingListItem {
    _name: string;
    _quanity: number;
        
    constructor(name = '', quantity = 0) {
        this._name = name;
        this._quanity = quantity;
    }
    public get name() {
        return this._name;
    }

    public set name(value:string) {
        this._name = value;
    }

    public get quantity() {
        return this._quanity;
    }

    public set quantity(value:number) {
        this._quanity = value
    }
}