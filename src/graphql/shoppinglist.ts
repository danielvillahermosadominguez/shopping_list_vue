import gql from 'graphql-tag';

export const QUERY_GET_ITEMS = gql`
            query {
                items {
                    id
                    name
                    quantity
                }
            }
`

export const MUTATION_ADD = gql`        
mutation ($id:String!,$name:String!, $quantity:Int!) {
    add(id:$id,name:$name,quantity:$quantity) {
        id,
        name,
        quantity
    }            
}
`

export const MUTATION_UPDATE = gql`        
mutation ($id:String!,$name:String!, $quantity:Int!) {
    update(id:$id,name:$name,quantity:$quantity) {
        id,
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
export const MUTATION_DELETE_ITEM = gql`
        mutation ($id:String!) {
            deleteItem(id:$id)
        }
`