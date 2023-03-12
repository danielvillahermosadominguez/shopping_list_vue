import { render, fireEvent, waitFor } from '@testing-library/vue';
import AppService from '@/appservices/AppService';
import '@testing-library/jest-dom';
import { MemoryServiceFixture } from '@/apolloserver/memoryservicefixture';
import HomeView from '@/views/HomeView.vue';
import ShoppingListItem from '@/appservices/ShoppingListItem';

describe('Shopping list acceptance tests', () => {
  const appService = new AppService();
  const serviceFixture = new MemoryServiceFixture(appService);

  beforeAll(async () => {
    await serviceFixture.init();
  });

  afterEach(async () => {
    await appService.deleteAll();
  });

  afterAll(async () => {
    serviceFixture.disposeFixture();
  });

  it(`Given an empty list 
      When the user add an item
      Then the list has an item`, async () => {    
    const rend = render(HomeView as any);
    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: 'bread' } });
    const addItemButton = rend.getByRole('addButton');
    
    await fireEvent.click(addItemButton);

    let result;

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.getByText('1')).toBeInTheDocument();
    });
  })

  it(`Given a list with an element       
      When the user add a new one element
      Then the list has two items of the same element`, async () => {    
    appService.add(new ShoppingListItem('bread', 1));        
    const rend = render(HomeView as any);
    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: 'bread' } });
    const addItemButton = rend.getByRole('addButton');

    await fireEvent.click(addItemButton);

    let result;

    await waitFor(() => {      
      expect(rend.getByText('bread')).toBeInTheDocument();            
      expect(rend.getByText('2')).toBeInTheDocument();
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