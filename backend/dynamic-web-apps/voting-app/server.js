const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { User } = require('./api/schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded());

app.post('/login', passport.authenticate('local'));

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
