import { gql, ApolloServer, UserInputError} from 'apollo-server'
import { v1 as uuid } from 'uuid'

const persons = [
    {
        name: "Midu",
        phone: "034",
        street: "Calle front",
        city: "Barcelona",
        id: "101"
    },
    {
        name: "Midu2",
        phone: "0343",
        street: "Calle front 2",
        city: "Barcelona 1",
        id: "1011"
    },
    {
        name: "Midu2",
        street: "Calle front 2",
        city: "Barcelona 1",
        id: "1011"
    }
]

const typeDefinitions = gql (`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }
    type Query {
        personCount: Int!
        allPersons:[Person]!
        findPerson(name: String!): Person
    }
    type Mutation {
        addPerson(
            name: String
            phone:String
            street:String
            city:String!
        ): Person
    }
`)

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: () => persons,
        findPerson: (root,args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },

    Mutation: {
        addPerson: (root, args) => {
            if(persons.find(p=> p.name === args.name)) {
                //throw new Error('Name must be unique')
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name
                })

            }
            const person = {...args, id: uuid()} //update database with new person            
            persons.push(person)
            return person
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
