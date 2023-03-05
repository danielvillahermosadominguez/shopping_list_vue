import {render, fireEvent, waitFor} from '@testing-library/vue';
import '@testing-library/jest-dom'
import ShoppingList from '@/components/ShoppingList.vue';


describe.skip('Shopping list acceptance tests',  () => {
  it('The user can add an item', async () => {   
    const rend = render(ShoppingList as any);    
    const input = rend.getByRole('itemInput');    
    fireEvent.input(input,{target: {value: 'bread'}});         
    const addItemButton = rend.getByRole('addButton');
    fireEvent.click(addItemButton);     
    const result = await rend.queryAllByText('BREAD');
    expect(result.length).toBe(1);    
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