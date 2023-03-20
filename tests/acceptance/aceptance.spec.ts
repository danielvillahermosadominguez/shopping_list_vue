import { render, fireEvent, waitFor } from '@testing-library/vue';
import AppService from '@/appservices/AppService';
import '@testing-library/jest-dom';
import { MemoryServiceFixture } from '@/apolloserver/memoryservicefixture';
import HomeView from '@/views/HomeView.vue';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import '@/environment/loadvariables';
import flushPromises from 'flush-promises';

jest.setTimeout(10000);

describe('Shopping list acceptance tests', () => {
  const appService = new AppService(
    process.env.VUE_APP_SERVICE_BACKEND);
  const serviceFixture = new MemoryServiceFixture(appService,
    process.env.BACKEND_TIME_OUT ? parseInt(process.env.BACKEND_TIME_OUT) : undefined,
    process.env.BACKEND_TIME_OUT_INCREMENT ? parseInt(process.env.BACKEND_TIME_OUT_INCREMENT) : undefined);

  beforeAll(async () => {
    try {
      await serviceFixture.init();
    } catch (e: Error | unknown) {
      serviceFixture.disposeFixture();
      throw new Error("service fixture couldn't be initialized:" + e);
    }
    jest.setTimeout(5000);
  });

  afterEach(async () => {
    await appService.deleteAll();
  });

  afterAll(() => {
    serviceFixture.disposeFixture();
  });

  it(`Given an empty list 
      When the user add an item
      Then the list has an item`, async () => {
    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: 'bread' } });
    const addItemButton = rend.getByRole('addButton');

    await fireEvent.click(addItemButton);

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.getByText('1')).toBeInTheDocument();
    });
  })
  
  it(`Given a list with elements
  When the user add a new one element with a wrong format
  Then this element cannot be included in the list`, async () => {
    appService.add(new ShoppingListItem('bread', 1));
    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });

    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: '  bre' } });

    const addItemButton = rend.getByRole('addButton');

    await waitFor(async () => {
      expect(await rend.getByLabelText('Please, write the name of the item:')).toHaveValue('  bre');
      expect(rend.getByText('The text must start with A-Z, a-z or a number but no spaces before the first character')).toBeInTheDocument();
      expect(addItemButton).toBeDisabled();

    });

  })

  it(`Given a list with elements
           When the user delete all items
           And refuse this action
           Then no items are removed` , async () => {
    appService.add(new ShoppingListItem('bread', 5));
    appService.add(new ShoppingListItem('milk', 3));
    appService.add(new ShoppingListItem('carrots', 6));

    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();
    let bread: HTMLHtmlElement;
    let milk: HTMLHtmlElement;
    let carrots: HTMLHtmlElement;
    await waitFor(() => {
      bread = rend.getByText('bread');
      milk = rend.getByText('milk');
      carrots = rend.getByText('carrots');
      expect(bread).toBeInTheDocument();
      expect(milk).toBeInTheDocument();
      expect(carrots).toBeInTheDocument();
    });

    const deleteAllButton = rend.getByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    expect(rend.getByRole('questionForm')).toBeInTheDocument();
    const refuseDeleteAll = rend.getByText('Cancel');

    await fireEvent.click(refuseDeleteAll);

    await waitFor(() => {
      expect(bread).toBeInTheDocument();
      expect(bread).toBeInTheDocument();
      expect(bread).toBeInTheDocument();
      expect(deleteAllButton).toBeEnabled();
    });
  })

  it(`Given a list with elements
           When the user delete all items
           And verify this action
           Then all the items are removed` , async () => {
    appService.add(new ShoppingListItem('bread', 5));
    appService.add(new ShoppingListItem('milk', 3));
    appService.add(new ShoppingListItem('carrots', 6));

    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();
    let bread: HTMLHtmlElement;
    let milk: HTMLHtmlElement;
    let carrots: HTMLHtmlElement;
    await waitFor(() => {
      bread = rend.getByText('bread');
      milk = rend.getByText('milk');
      carrots = rend.getByText('carrots');
      expect(bread).toBeInTheDocument();
      expect(milk).toBeInTheDocument();
      expect(carrots).toBeInTheDocument();
    });

    const deleteAllButton = rend.getByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    expect(rend.getByRole('questionForm')).toBeInTheDocument();
    const acceptDeleteAll = rend.getByText('Accept');

    await fireEvent.click(acceptDeleteAll);

    await waitFor(() => {
      expect(bread).not.toBeInTheDocument();
      expect(milk).not.toBeInTheDocument();
      expect(carrots).not.toBeInTheDocument();
      expect(deleteAllButton).toBeDisabled();
    });
  })

  it(`Given a list with elements
          When the user remove one element
          And the user accept to delete it
          The item is removed`, async () => {
    appService.add(new ShoppingListItem('bread', 5));
    appService.add(new ShoppingListItem('milk', 3));
    appService.add(new ShoppingListItem('carrots', 6));

    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();
    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
    });

    const deleteItemButtons = rend.getAllByRole('deleteItem');
    const deleteBreadButton = deleteItemButtons[0];
    await fireEvent.click(deleteBreadButton);
    expect(rend.getByRole('questionForm')).toBeInTheDocument();
    const acceptButton = rend.getByText('Accept');

    await fireEvent.click(acceptButton);

    await waitFor(async () => {
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
      expect(await rend.queryByText('bread')).toBeNull();
    });
  })

  it(` Given a list with items
            When the user decrease the quantity of an element
            Then the quantity is decreased
  `, async () => {
    appService.add(new ShoppingListItem('bread', 5));    
    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();
    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();      
      expect(rend.getByText('5')).toBeInTheDocument();      
    });

    const decreaseItemButton = rend.getByRole('decreaseQuantity');    
    await fireEvent.click(decreaseItemButton);
      
    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();      
      expect(rend.getByText('4')).toBeInTheDocument();      
    });
  })

  it.skip(` Given a list with items
            When the user increase the quantity of an element
            Then the quantity is increased
  `, async () => {
    appService.add(new ShoppingListItem('bread', 5));    
    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();
    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();      
      expect(rend.getByText('5')).toBeInTheDocument();      
    });

    const decreaseItemButton = rend.getByRole('decreaseQuantity');    
    await fireEvent.click(decreaseItemButton);
      
    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();      
      expect(rend.getByText('6')).toBeInTheDocument();      
    });
  })

  it.skip(`Given a list with items
           When the user change the name of the item
           The item change`, async () => {
    appService.add(new ShoppingListItem('bread', 5));
    appService.add(new ShoppingListItem('milk', 3));
    appService.add(new ShoppingListItem('carrots', 6));

    const rend = render(HomeView, {
      props: {
        appService: appService
      }
    });
    await flushPromises();    
    await waitFor(() => {      
      expect(rend.getByText('bread')).toBeInTheDocument();              
      expect(rend.getByText('milk')).toBeInTheDocument();              
      expect(rend.getByText('carrots')).toBeInTheDocument();              
    });

    const deleteItemButtons = rend.getAllByRole('deleteItem');            
    const deleteBreadButton = deleteItemButtons[0];
    await fireEvent.click(deleteBreadButton);
    expect(rend.getByRole('questionForm')).toBeInTheDocument();            
    const acceptButton = rend.getByText('Accept');
    
    await fireEvent.click(acceptButton);

    await waitFor(async () => {                        
      expect(rend.getByText('milk')).toBeInTheDocument();              
      expect(rend.getByText('carrots')).toBeInTheDocument();
      expect(await rend.queryByText('bread')).toBeNull();
    });
  })

});