const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');

// const schema = require('./api/schema');
// const resolver = require('./api/resolve');
const db = require('./src/database');

db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const APISchema = buildSchema(schema);

// app.use('/api', graphqlHTTP({
//   schema: APISchema,
//   rootValue: resolver,
//   graphiql: true,
// }));

app.post('/api/finduser', async (req, res) => {
  const result = await db.findUser(User, req.body.username);
  res.json({ userExists: result !== 0 });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
