const { ApolloServer } = require("apollo-server");
const { connectDb } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  playground: true,
  introspection: true,
});
const port = process.env.PORT || 8080;
connectDb()
  .then(() => {
    return server.listen(port);
  })
  .then((res) => console.log(`🚀 Server ready at ${res.url}`))
  .catch((err) => console.log(err));
