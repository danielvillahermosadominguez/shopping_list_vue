import { render, fireEvent, waitFor } from '@testing-library/vue';
import ShoppingList from '@/components/ShoppingList.vue';
import AppService from '@/appservices/AppService';
import { MemoryServiceFixture } from '@/apolloserver/memoryservicefixture';

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

  it('The user can add an item', async () => {
    const appService = new AppService();
    const rend = render(ShoppingList as any, {
      propsData: {
        appService: appService
      }
    });
    const input = rend.getByRole('itemInput');
    fireEvent.input(input, { target: { value: 'bread' } });
    const addItemButton = rend.getByRole('addButton');

    await fireEvent.click(addItemButton);

    let result;

    await waitFor(() => {
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