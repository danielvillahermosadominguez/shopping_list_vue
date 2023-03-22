export default  class NameValidator {
    public check(input:string) : boolean|undefined {        
            if (input === "") {            
                return undefined;
            }
            const regex = new RegExp("^[A-Za-z0-9].");
            if (!regex.test(input)) {                
                return false;
            }            
            return true;
    }

}