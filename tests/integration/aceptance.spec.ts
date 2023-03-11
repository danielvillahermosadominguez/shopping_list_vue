import {render, fireEvent, waitFor} from '@testing-library/vue';
import '@testing-library/jest-dom'
import ShoppingList from '@/components/ShoppingList.vue';
import AppService from '@/appservices/AppService';
import {MemoryServiceFixture} from '@/apolloserver/memoryservicefixture';


describe('Shopping list acceptance tests',  () => {
  const serviceFixture = new MemoryServiceFixture();
  const appService = new AppService();
  let finalizado = false;  

  const waitingForServer =  async ()=>{
    let fin = false;
    let list = [];
    while(!fin) {
      try {
        list = await appService.getItems();
        fin = true;
      } catch {
        fin = false;
      }        
    }
  };

  const waitingForEmpty =  async ()=>{
    let fin = false;
    let list = [];
    while(!fin) {
      list = await appService.getItems();
      fin =  list.length === 0;
    }
  };

  
  beforeAll(async ()=>{
    serviceFixture.init();
    await waitingForServer();  
  });  

  beforeEach(async ()=> {        
   
  });

  afterEach (async()=> {
    appService.deleteAll();
    await waitingForEmpty();
  });

  it('The user can add an item', async () => {     
    setTimeout(() => {  console.log("World!"); }, 10000);
    const appService = new AppService();
    const rend = render(ShoppingList as any, {
      propsData : {
          appService: appService
      }
    });
    const input = rend.getByRole('itemInput');    
    fireEvent.input(input,{target: {value: 'bread'}});         
    const addItemButton = rend.getByRole('addButton');

    await fireEvent.click(addItemButton);     
    
    let result;

    await waitFor(()=> {
      result = rend.queryAllByText('bread');
      expect(result.length).toBe(1);    
    });
  })

  it('The user can add an item 2', async () => {     
    setTimeout(() => {  console.log("World!"); }, 10000);
    const appService = new AppService();
    const rend = render(ShoppingList as any, {
      propsData : {
          appService: appService
      }
    });
    const input = rend.getByRole('itemInput');    
    fireEvent.input(input,{target: {value: 'bread'}});         
    const addItemButton = rend.getByRole('addButton');

    await fireEvent.click(addItemButton);     
    
    let result;

    await waitFor(()=> {
      result = rend.queryAllByText('bread');
      expect(result.length).toBe(1);    
    });
  })

  it.skip('The user can remove a selected item', () => {    
    throw new Error("Not implemented");    
  })

  it.skip('The user can modify the name of an item', () => {    
    throw new Error("Not implemented");    
  })

  it.skip('The user can delete all the items, but it should be warned about this action', () => {    
    throw new Error("Not implemented");    
  })  
});