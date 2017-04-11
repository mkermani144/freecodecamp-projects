const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { User } = require('./src/api/schema');

const app = express();

const APISchema = buildSchema(`
  type User {
    createUser: Int
    username: String
    password: String
  }
  type Query {
    user(username: String, password: String): User
  }
`);
const root = {
  user: ({username, password}) => {
    return new User(username, password);
  }
};

app.use('/api', graphqlHTTP({
  schema: APISchema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
