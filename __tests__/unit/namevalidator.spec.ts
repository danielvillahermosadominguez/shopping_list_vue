import NameValidator from "@/validators/namevalidator";

describe("test validator", () => {
    let validator: NameValidator;

    beforeAll(()=> {
        validator = new NameValidator();
    });

    it.each([
        ["less than 1 character", "a"],
        ["one space", " "],
        ["some spaces and characters", "  aa11"]

    ])("should return false if the string input %s='%s'", (_: string, param: string) => {        
        expect(validator.isShoppingListItemNameCorrect(param)).toBeFalsy();
    })

    it.each([
        ["has 3  characters without spaces in the middle", "a2a"],
        ["has >3  characters without spaces in the middle", "a2a121221312321"],
        ["has >3  characters with spaces in the middle", "a2a12122     1312321"]
    ])("should return true if the string %s ='%s", (_: string, param: string) => {        
        expect(validator.isShoppingListItemNameCorrect(param)).toBeTruthy();
    })
});