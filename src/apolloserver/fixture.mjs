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
    }
    
`)

const resolvers = {
    Query: {
        
        items: () => { 
            console.log("items is called")
            return shoppingLists
        },        
    },

    Mutation: {
        add: (root, args) => {
            console.log("add is called")
            if(shoppingLists.find(p=> p.name === args.name)) {                
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name
                })

            }
            const item = {...args} //update database with new person            
            shoppingLists.push(item)
            console.log("push in the list is called")
            return item
        },
        deleteAll: (root) => {
            const numberOfItems = shoppingLists.length;
            shoppingLists.length = 0;
            console.log("delete all" + ":" + numberOfItems+ " deleted items");
            return numberOfItems;
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
