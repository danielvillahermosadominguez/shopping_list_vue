import gql from 'graphql-tag';

export const QUERY_GET_ITEMS = gql`
            query {
                items {
                    name
                    quantity
                }
            }
`

export const MUTATION_ADD = gql`        
mutation ($name:String!, $quantity:Int!) {
    add(name:$name,quantity:$quantity) {
        name,
        quantity
    }            
}
`

export const MUTATION_DELETE_ALL = gql`        
        mutation {
            deleteAll 
        }
        `
