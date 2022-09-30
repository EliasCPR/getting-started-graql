import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto"
/**
 * O tipo `Query` como o próprio nome diz é só pra consulta
 * fazendo alusão ao http é como se fosse um endpoint com método GET
 * 
 * 
 * O tipo `Mutation` é para qualquer tipo de informação que possa inserir,deletar,
 * ou mudar os dados 
 * fazendo alusão ao http seria como se fosse os outros tipos de rota: 
 * POST,PUT,PATCH,DELETE
 */

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;
interface User{
  id: string
  name: string
}

const users: User[] = [];
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users
      }
    },
    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name
        }

        users.push(user);
        return user
      } 
    }
  }
});

server.listen().then(({url}) => {
  console.info(`Server listen in ${url} `)
})