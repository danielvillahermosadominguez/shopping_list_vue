export default class ShoppingListItem {
    _id: string;
    _name: string;
    _quanity: number;
        
    constructor(name = '', quantity = 0) {
        this._id = '';
        this._name = name;
        this._quanity = quantity;
    }
    public get id() {
        return this._id;
    }

    public set id(value:string) {
        this._id = value;
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