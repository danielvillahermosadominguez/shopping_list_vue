import { gql, ApolloServer, UserInputError} from 'apollo-server'
import { v1 as uuid } from 'uuid'

const shoppingLists = []

const typeDefinitions = gql (`
    type ShoppingListItem {
        name: String!
        quantity: Int!
    }

    type Query {        
        items:[ShoppingListItem]!        
    }

    type Mutation {
        add(
            name: String!   
            quantity:Int!       
        ): ShoppingListItem                  

        deleteAll: Int!   
        
        deleteItem(
            name: String!   
        ):Int!
    }    
`)

const resolvers = {
    Query: {
        
        items: () => {                                    
            return shoppingLists
        },        
    },

    Mutation: {
        add: async (root, args) => {                                    
            const itemFound = await shoppingLists.find(p=> p.name === args.name);
            let item = {...args}             
            if(itemFound === undefined) {                                
                shoppingLists.push(item)            
                return item;
            } 
            
            itemFound.quantity+= item.quantity;                                
            return itemFound;
        },
        deleteAll: (root) => {
            const numberOfItems = shoppingLists.length;
            shoppingLists.length = 0;            
            return numberOfItems;
        },
        deleteItem: async (root, args) => {            
            const index = await shoppingLists.findIndex(p=> p.name === args.name);
            if( index !== -1) {                                
                shoppingLists.splice(index,1);
                return 1;
            } 

            return 0;
        }
    }
}

function startServer() {   
    const server = new ApolloServer({
        typeDefs: typeDefinitions,
        resolvers
    });

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`)
    });
    return true;
}

startServer();
