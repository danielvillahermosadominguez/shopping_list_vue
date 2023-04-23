import { gql, ApolloServer} from 'apollo-server'
import { v1 as uuid } from 'uuid'

const shoppingLists = []

const typeDefinitions = gql (`
    type ShoppingListItem {
        id: String!
        name: String!
        quantity: Int!
    }

    type Query {        
        items:[ShoppingListItem]!        
    }

    type Mutation {
        add(           
            id: String! 
            name: String!   
            quantity:Int!       
        ): ShoppingListItem                  

        update(
            id:String!
            name: String!   
            quantity:Int!       
        ): ShoppingListItem 

        deleteAll: Int!   
        
        deleteItem(
            id: String!
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
            console.log("add an item");  
            let item = {...args}             
            let itemFound = undefined;
            console.log("add an item");            
            if(item.id !=='') {
                itemFound = await shoppingLists.find(p=> p.id === item.id);                                
            }

            if(itemFound === undefined) {           
                item.id = uuid();                                                         
                shoppingLists.push(item)            
                return item;
            } 
            
            itemFound.quantity+= 1;                                
            return itemFound;
        },
        update: async (root, args) => {                
            let item = {...args}           
            console.log("update item");  
            let itemFound = undefined;
            if(item.id !=='') {
                itemFound = await shoppingLists.find(p=> p.id === item.id);                                
            }

            if(itemFound === undefined) {           
                throw Error("You need to include a correct id. The id '"+item.id+"' is not related to an item");
            } 
            
            itemFound.quantity = item.quantity;                                
            itemFound.name = item.name;                                
            return itemFound;
        },
        deleteAll: (root) => {
            console.log("delete all");  
            const numberOfItems = shoppingLists.length;
            shoppingLists.length = 0;            
            return numberOfItems;
        },
        deleteItem: async (root, args) => {            
            console.log("delete item");  
            const index = await shoppingLists.findIndex(p=> p.id === args.id);
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

    server.listen({port:443}).then(({ url }) => {
        console.log(`Server ready at ${url}`)
    });
    return true;
}

startServer();
