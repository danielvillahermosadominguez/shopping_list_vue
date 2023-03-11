import ShoppingListItem from "./ShoppingListItem";
import {ApolloClient, DefaultOptions}  from 'apollo-client'
import 'cross-fetch/polyfill';
import { HttpLink, createHttpLink} from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag';

export default class AppService {    
    private apolloClient: any;
 
    public constructor() {
      const httpLink = createHttpLink({
        uri: 'http://localhost:4000/graphql',
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

    public async add(item:ShoppingListItem) {
        await this.addAux(item);       
    }

    private async addAux(item:ShoppingListItem) {
        
        const ADD_MUTATION = gql`        
        mutation ($name:String!, $quantity:Int!) {
            add(name:$name,quantity:$quantity) {
                name,
                quantity
            }            
        }
        `   
        const name:string = item.name;
        const quantity: number = item.quantity;
        await this.apolloClient.mutate({
            mutation: ADD_MUTATION,
            variables: {
              name,quantity},
          });        
    }    
       
    public async getItems():Promise<Array<ShoppingListItem>> {
        const result = Array<ShoppingListItem>();
        const GET_ITEMS_QUERY = gql`
            query {
                items {
                    name
                    quantity
                }
            }
        `

        const { data }  = await this.apolloClient.query({
            query: GET_ITEMS_QUERY
          });        
                
        const { items } = data;        
        items.forEach((element: { name: string | undefined; quantity: number | undefined; }) => {
            result.push(new ShoppingListItem(element.name,element.quantity));
        });

        return result;
    }

    public deleteAll() {          
        this.deleteAllAux();        
    }

    public async deleteAllAux() {
        const DELETE_ALL_MUTATION = gql`        
        mutation {
            deleteAll 
        }
        `   
        
        await this.apolloClient.mutate({
            mutation: DELETE_ALL_MUTATION,
          });        
    }
}