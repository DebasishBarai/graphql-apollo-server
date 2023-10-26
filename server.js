import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { TODOS } from './todo.js';
import { USERS } from './user.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const init = async () => {
  const typeDefs = `
type Todo {
    userId: ID!
    id: ID!
    title: String
    completed: Boolean
}

type User {
    id: ID!
    name: String
    userName: String
    email: String
}
type Query {
    getTodos: [Todo]
    getUsers: [User]
}
`;

  const resolvers = {
    Query: {
      getTodos: () => TODOS,
      getUsers: () => USERS,
    },
  };

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/', expressMiddleware(server));
  const port = 3000;

  app.listen(port, () => {
    console.log(`app listenning on port ${port}`);
  });
};

init();
