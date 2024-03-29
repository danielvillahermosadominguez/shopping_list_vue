import ShoppingListItem from "./ShoppingListItem";
export default interface AppService {    
  add(item: ShoppingListItem): Promise<void>;

  getItems(): Promise<Array<ShoppingListItem>>

  deleteAll():void;

  deleteItem(item: ShoppingListItem):void;

  updateItem(item: ShoppingListItem):void;

  serverIsReady(): Promise<boolean>
}