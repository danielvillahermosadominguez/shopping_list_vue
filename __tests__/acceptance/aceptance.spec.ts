import { render, fireEvent, waitFor } from '@testing-library/vue';
import AppService from '@/appservices/AppService';
import '@testing-library/jest-dom';
import HomeView from '@/views/HomeView.vue';
import ShoppingListItem from '@/appservices/ShoppingListItem';
import '@/environment/loadvariables';
import { FactoryServiceFixture } from '@/apolloserver/fixtureServiceFactory';
import BackendServiceFixture from '@/apolloserver/BackendServiceFixture';

const $t = (s:string) => s;

describe('Shopping list acceptance tests', () => {
  const TEMPORAL_MAXIMUM_DELAY_FOR_JEST_TO_WAIT_FIXTURE = 10000;
  const DEFAULT_DELAY_FOR_JEST = 10000;
  const serviceFixture: BackendServiceFixture = FactoryServiceFixture.createBasedOnConfiguration();
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
    const {getByText} = renderHomeViewPage();     

    await waitFor(() => {
      expect(getByText('bread')).toBeInTheDocument();
      expect(getByText('milk')).toBeInTheDocument();
      expect(getByText('carrots')).toBeInTheDocument();
    });
  })

  it(`Given an empty list 
      When the user add an item
      Then the list has an item`, async () => {
    const {getByRole, getByText} = renderHomeViewPage();
    const input = getByRole('itemInput');
    await fireEvent.input(input, { target: { value: 'bread' } });
    const addItemButton = getByRole('addButton');

    await fireEvent.click(addItemButton);

    await waitFor(() => {
      expect(getByText('bread')).toBeInTheDocument();
      expect(getByText('1')).toBeInTheDocument();
    });
  })

  it(`Given a list with elements
  When the user add a new one element with a wrong format
  Then this element cannot be included in the list`, async () => {    
    await appService.add(new ShoppingListItem('bread', 1));
    const {getByRole, getByText, getByLabelText} = renderHomeViewPage();
    const input = getByRole('itemInput');
    fireEvent.input(input, { target: { value: '  bre' } });

    const addItemButton = getByRole('addButton');

    await waitFor(async () => {
      expect(getByLabelText($t("shopping-list-please-write-the-name"))).toHaveValue('  bre');
      expect(getByText($t("validation-the_text_must_start"))).toBeInTheDocument();
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
    const {getByRole, getByText, findByText} = renderHomeViewPage();
    const deleteAllButton = getByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    const refuseDeleteAll = await findByText($t("question-cancel"));

    await fireEvent.click(refuseDeleteAll);

    await waitFor(() => {
      expect(getByText('bread')).toBeInTheDocument();
      expect(getByText('milk')).toBeInTheDocument();
      expect(getByText('carrots')).toBeInTheDocument();
    });
  })

  it(`Given a list with elements
           When the user delete all items
           And verify this action
           Then all the items are removed` , async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));
    const {queryByText, findByRole, findByText} = renderHomeViewPage();
    const deleteAllButton = await findByRole('deleteAllButton');
    await fireEvent.click(deleteAllButton);
    const acceptDeleteAll = await findByText($t("question-accept"));

    await fireEvent.click(acceptDeleteAll);

    await waitFor(() => {
      expect(queryByText('bread')).toBeNull();
      expect(queryByText('milk')).toBeNull();
      expect(queryByText('carrots')).toBeNull();

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
    const {getByText,queryByText, findAllByRole, findByText} = renderHomeViewPage();
    const deleteItemButtons = await findAllByRole('deleteItem');
    const deleteBreadButton = deleteItemButtons[0];
    await fireEvent.click(deleteBreadButton);    
    const acceptButton = await findByText($t("question-accept"));

    await fireEvent.click(acceptButton);

    await waitFor(() => {
      expect(getByText('milk')).toBeInTheDocument();
      expect(getByText('carrots')).toBeInTheDocument();
      expect(queryByText('bread')).toBeNull();
    });
  })

  it(` Given a list with items
            When the user decrease the quantity of an element
            Then the quantity is decreased
  `, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    const {getByText, findByRole, findByText} = renderHomeViewPage();
    const decreaseItemButton = await findByRole('decreaseQuantity');

    await fireEvent.click(decreaseItemButton);
    
    await waitFor(async () => {
      expect(await findByText('4')).toBeInTheDocument();
      expect(getByText('bread')).toBeInTheDocument();   
    });
  })

  it(` Given a list with items
            When the user increase the quantity of an element
            Then the quantity is increased
  `, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    const {getByText,queryByText, findByRole} = renderHomeViewPage();

    const increaseItemButton = await findByRole('increaseQuantity');
    await fireEvent.click(increaseItemButton);    

    await waitFor(() => {      
      expect(queryByText('5')).toBeNull();
      expect(getByText('6')).toBeInTheDocument();
      expect(getByText('bread')).toBeInTheDocument();
    });
  })

  it(`Given a list with items
           When the user change the name of the item
           The item change`, async () => {
    await appService.add(new ShoppingListItem('bread', 5));
    await appService.add(new ShoppingListItem('milk', 3));
    await appService.add(new ShoppingListItem('carrots', 6));

    const {getByText, findAllByRole, findByRole, queryByText} = renderHomeViewPage();

    const editButtons = await findAllByRole('editItem');
    const editBreadButton = editButtons[0];
    await fireEvent.click(editBreadButton);    
    let inputEdit = await findByRole('nameInput');
    await fireEvent.input(inputEdit, { target: { value: 'RANDOM_ITEM' } });
    const acceptButton = getByText($t("question-accept"));

    await fireEvent.click(acceptButton);    

    await waitFor(async () => {
      expect(getByText('milk')).toBeInTheDocument();
      expect(getByText('carrots')).toBeInTheDocument();
      expect(getByText('RANDOM_ITEM')).toBeInTheDocument();
    });
  })

  const renderHomeViewPage = () => {
    return render(HomeView, {
      props: {
        appService: appService
      },
      mocks:{ $t }
    });
  }
});