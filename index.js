const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const {ApolloEngine} = require('apollo-engine');

const engine = new ApolloEngine({
  apiKey: 'test-id'
});

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: {books: () => books}
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({schema, tracing: true, cacheControl: true})
);

engine.listen({port: PORT, expressApp: app});
