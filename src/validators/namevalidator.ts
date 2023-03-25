export default class NameValidator {
    public isShoppingListItemNameCorrect(input: string): boolean {      
        const regex = new RegExp("^[A-Za-z0-9].");
        if (!regex.test(input)) {
            return false;
        }
        return true;
    }
}