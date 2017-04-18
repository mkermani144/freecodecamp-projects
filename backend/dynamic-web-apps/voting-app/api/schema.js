const schema = `
  type User {
    create(username: String!, password: String!): Int!
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
