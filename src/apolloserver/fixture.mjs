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
            return shoppingLists
        },        
    },

    Mutation: {
        add: (root, args) => {            
            if(shoppingLists.find(p=> p.name === args.name)) {                
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name
                })

            }
            const item = {...args} //update database with new person            
            shoppingLists.push(item)            
            return item
        },
        deleteAll: (root) => {
            const numberOfItems = shoppingLists.length;
            shoppingLists.length = 0;            
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
