const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const schema = require('./api/schema');
const resolver = require('./api/resolve');
const db = require('./src/database');

db.connect();

const app = express();
app.use(cors());
app.use(/\/((?!api).)*/, bodyParser.urlencoded());

app.post('/login', passport.authenticate('local'));

const APISchema = buildSchema(schema);

app.use('/api', graphqlHTTP({
  schema: APISchema,
  rootValue: resolver,
  graphiql: true,
}));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
