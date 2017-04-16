const schema = `
  type User {
    userExists(username: String!): Int!
  }
  type Database {
    user: User
  }
  type Query {
    database: Database
  }
`;

module.exports = schema;
