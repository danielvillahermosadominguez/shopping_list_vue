import ShoppingListItem from "./ShoppingListItem";
import { ApolloClient, DefaultOptions } from 'apollo-client'
import 'cross-fetch/polyfill';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { QUERY_GET_ITEMS, MUTATION_ADD, MUTATION_DELETE_ALL, MUTATION_DELETE_ITEM } from '@/graphql/shoppinglist';

export default class AppService {
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  public constructor(url = '') {
    console.log("Connecting to graphql service:" + url);
    const httpLink = createHttpLink({
      uri: url,
    })

    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }

    this.apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true,
      defaultOptions
    })

  }

  public async add(item: ShoppingListItem) {
    await this.addAux(item);
  }

  private async addAux(item: ShoppingListItem) {

    const name: string = item.name;
    const quantity: number = item.quantity;
    await this.apolloClient.mutate({
      mutation: MUTATION_ADD,
      variables: {
        name, quantity
      },
    });
  }

  public async getItems(): Promise<Array<ShoppingListItem>> {
    const result = Array<ShoppingListItem>();

    const { data } = await this.apolloClient.query({
      query: QUERY_GET_ITEMS
    });

    const { items } = data;
    items.forEach((element: { name: string | undefined; quantity: number | undefined; }) => {
      result.push(new ShoppingListItem(element.name, element.quantity));
    });

    return result;
  }

  public async deleteAll() {
    await this.apolloClient.mutate({
      mutation: MUTATION_DELETE_ALL,
    });
  }

  public async deleteItem(item: ShoppingListItem) {    
    const name: string = item.name;
    await this.apolloClient.mutate({
      mutation: MUTATION_DELETE_ITEM,
      variables: {
        name
      },
    });
  }

  public async serverIsReady(): Promise<boolean> {
    let result = false;
    try {
      await this.getItems();
      result = true;
    } catch {
      result = false;
    }
    return result;
  }
}