import { render, fireEvent, waitFor } from '@testing-library/vue';
import AppService from '@/appservices/AppService';
import '@testing-library/jest-dom';
import { BackendScriptServiceFixture } from '@/apolloserver/backendscriptservicefixture';
import HomeView from '@/views/HomeView.vue';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import '@/environment/loadvariables';
import { FactoryServiceFixture } from '@/apolloserver/fixtureServiceFactory';

describe('Shopping list acceptance tests', () => {
  const TEMPORAL_MAXIMUM_DELAY_FOR_JEST_TO_WAIT_FIXTURE = 10000;
  const DEFAULT_DELAY_FOR_JEST = 10000;
  const serviceFixture: BackendScriptServiceFixture = FactoryServiceFixture.createBasedOnConfiguration();
  const appService: AppService = serviceFixture.appService;


  beforeAll(async () => {
    jest.setTimeout(TEMPORAL_MAXIMUM_DELAY_FOR_JEST_TO_WAIT_FIXTURE);
    await serviceFixture.init();
    jest.setTimeout(DEFAULT_DELAY_FOR_JEST);
  });

  afterEach(async () => {
    await appService.deleteAll();
  });

  afterAll(() => {
    serviceFixture.disposeFixture();
  });

  it(`Given a list with elements
           When the user load the page           
           the list is showed` , async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));
    const rend = renderHomeViewPage();

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
    });
  })

  it(`Given an empty list 
      When the user add an item
      Then the list has an item`, async () => {
    const rend = renderHomeViewPage();
    const input = rend.getByRole('itemInput');
    await fireEvent.input(input, { target: { value: 'bread' } });
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
    await appService.add(new ShoppingListItem('bread', 1));
    const rend = renderHomeViewPage();
    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: '  bre' } });

    const addItemButton = rend.getByRole('addButton');

    await waitFor(async () => {
      expect(rend.getByLabelText('Please, write the name of the item:')).toHaveValue('  bre');
      expect(rend.getByText('The text must start with A-Z, a-z or a number but no spaces before the first character')).toBeInTheDocument();
      expect(addItemButton).toBeDisabled();
    });

  })

  it(`Given a list with elements
           When the user delete all items
           And refuse this action
           Then no items are removed` , async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));
    const rend = renderHomeViewPage();
    const deleteAllButton = rend.getByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    const refuseDeleteAll = await rend.findByText('Cancel');

    await fireEvent.click(refuseDeleteAll);

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
    });
  })

  it(`Given a list with elements
           When the user delete all items
           And verify this action
           Then all the items are removed` , async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));
    const rend = renderHomeViewPage();
    const deleteAllButton = await rend.findByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    const acceptDeleteAll = await rend.findByText('Accept');

    await fireEvent.click(acceptDeleteAll);

    await waitFor(() => {
      expect(rend.queryByText('bread')).toBeNull();
      expect(rend.queryByText('milk')).toBeNull();
      expect(rend.queryByText('carrots')).toBeNull();

    });
    expect(deleteAllButton).toBeDisabled();
  })

  it(`Given a list with elements
          When the user remove one element
          And the user accept to delete it
          The item is removed`, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));
    const rend = renderHomeViewPage();
    const deleteItemButtons = await rend.findAllByRole('deleteItem');
    const deleteBreadButton = deleteItemButtons[0];
    await fireEvent.click(deleteBreadButton);
    expect(rend.getByRole('questionForm')).toBeInTheDocument();
    const acceptButton = rend.getByText('Accept');

    await fireEvent.click(acceptButton);

    await waitFor(() => {
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
      expect(() => rend.getByText('bread')).toThrowError();
    });
  })

  it(` Given a list with items
            When the user decrease the quantity of an element
            Then the quantity is decreased
  `, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    const rend = renderHomeViewPage();
    const decreaseItemButton = await rend.findByRole('decreaseQuantity');

    await fireEvent.click(decreaseItemButton);

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.queryByText('4')).not.toBeNull();
    });
  })

  it(` Given a list with items
            When the user increase the quantity of an element
            Then the quantity is increased
  `, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    const rend = renderHomeViewPage();

    const increaseItemButton = await rend.findByRole('increaseQuantity');
    await fireEvent.click(increaseItemButton);    

    await waitFor(() => {
      expect(rend.getByText('bread')).toBeInTheDocument();
      expect(rend.queryByText('5')).toBeNull();
      expect(rend.getByText('6')).toBeInTheDocument();
    });
  })

  it(`Given a list with items
           When the user change the name of the item
           The item change`, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));

    const rend = renderHomeViewPage();

    const editButtons = await rend.findAllByRole('editItem');
    const editBreadButton = editButtons[0];
    await fireEvent.click(editBreadButton);    
    let inputEdit = await rend.findByRole('nameInput');
    await fireEvent.input(inputEdit, { target: { value: 'RANDOM_ITEM' } });
    const acceptButton = rend.getByText('Accept');

    await fireEvent.click(acceptButton);    

    await waitFor(async () => {
      expect(rend.getByText('milk')).toBeInTheDocument();
      expect(rend.getByText('carrots')).toBeInTheDocument();
      expect(await rend.queryByText('RANDOM_ITEM')).toBeNull();
    });
  })

  const renderHomeViewPage = () => {
    return render(HomeView, {
      props: {
        appService: appService
      }
    });
  }
});