import {render, fireEvent, waitFor} from '@testing-library/vue';
import '@testing-library/jest-dom'
import ShoppingList from '@/components/ShoppingList.vue';
import AppService from '@/appservices/AppService';
import ShoppingListItem from '@/appservices/ShoppingListItem';
jest.mock('@/appservices/AppService');

describe('Shopping list', () => {
    it("should have an input without any initial value", ()=> {
        const rend = render(ShoppingList as any);    
        
        const input = rend.getByRole('itemInput');
        
        expect(input).toBeInTheDocument();
        expect(input).not.toHaveValue();
        expect(input).not.toHaveValue();
    });

    it("should have a label with describing the input", ()=> {
        const rend = render(ShoppingList as any);    
        
        const input = rend.getByLabelText('Please, write the name of the item:');
        
        expect(input).toBeInTheDocument();
        expect(input).not.toHaveValue();
        expect(input).not.toHaveValue();
    });


    it("should have a button to add items", ()=> {
        const rend = render(ShoppingList as any);    
        
        const addItemButton = rend.getByRole('addButton');

        expect(addItemButton).toBeInTheDocument();        
    });

    it("should disable the button when the input is empty", ()=> {        
        const rend = render(ShoppingList as any);    
        const input = rend.getByRole('itemInput');             
    
        const addItemButton = rend.getByRole('addButton');        
    
        expect(input).not.toHaveValue();
        expect(addItemButton).toBeDisabled();
    });

    it("should enable the button when the input is not empty", ()=> {        
        const rend = render(ShoppingList as any);    
        const input = rend.getByRole('itemInput');             
        fireEvent.input(input,{target: {value: 'bread'}});                
    
        const addItemButton = rend.getByRole('addButton');        
    
        expect(input).toHaveValue();
        waitFor(()=>{
            expect(addItemButton).toBeEnabled();
        })
    });

    it("should not have any value in the input when the button is clicked",  async ()=> {        
        const appService = new AppService();
        appService.add = jest.fn((item:ShoppingListItem)=>  new Promise( ()=> {}));  
        appService.getItems = jest.fn(()=>  new Promise( ()=> []));  
        
        const rend = render(ShoppingList as any, {
            propsData : {
                appService: appService
            }
        });    
        const input = rend.getByRole('itemInput');     
        fireEvent.input(input,{target: {value: 'bread'}});                
        const addItemButton = rend.getByRole('addButton');
    
        fireEvent.click(addItemButton);        
    
        await waitFor(()=>{
            expect(input).not.toHaveValue();
        })        
    });

    it("should shown the headers of the Shopping list empty when there is not elements",  async ()=> {        
        const rend = render(ShoppingList as any);  
        const table = rend.getByRole('itemList');
        
        const itemHeader = await rend.queryAllByText('Item');
        const quantityHeader = await rend.queryAllByText('Quantity');

        expect(itemHeader.length).toBe(1);
        expect(quantityHeader.length).toBe(1);
    });

    it("should shown an item when a new element is added",  async ()=> {        
        const shoppingList: Array<ShoppingListItem> = new Array<ShoppingListItem>();
        const appService = new AppService();
        appService.add = async (item:ShoppingListItem) => {  return new Promise<undefined>( (resolve, reject)=> {            
            shoppingList.push(item);  
            resolve(undefined);
            return undefined;                      
        })};  
        appService.getItems = jest.fn(async ()=>  new Promise<Array<ShoppingListItem>>( (resolve, reject)=>{             
            resolve(shoppingList);
            return shoppingList;
        }));  
        
        const rend = await render(ShoppingList as any, {
            propsData : {
                appService: appService
            }
        });           
                       
        const input = await rend.getByRole('itemInput');     
        await fireEvent.input(input,{target: {value: 'bread'}});                
        const addItemButton = rend.getByRole('addButton');
    
        await fireEvent.click(addItemButton);        
        
        await waitFor(()=>{            
            expect(rend.getByText('bread')).toBeInTheDocument();            
            expect(rend.getByText('1')).toBeInTheDocument();            
        });
    });

    
    it.skip("should show an element in the list when an item is added",  async ()=> {        
        const rend = render(ShoppingList as any);    
        const input = rend.getByRole('itemInput');     
        fireEvent.input(input,{target: {value: 'bread'}});                
        const addItemButton = rend.getByRole('addButton');
     
        fireEvent.click(addItemButton);        
     
        waitFor(()=>{
            expect(input).not.toHaveValue();
        })     
                
        const result = await rend.queryAllByText('BREAD');
        expect(result.length).toBe(1);    
    });
     
  });