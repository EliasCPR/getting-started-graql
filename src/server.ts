import "reflect-metadata"

import path from 'node:path'

import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql";
import {AppointmentsResolver} from "./resolvers/appointments-resolver"

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })

  const server = new ApolloServer({
    schema
  });

  server.listen().then(({url}) => {
    console.info(`Server listen in ${url} `)
  })
}

bootstrap()