const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoConnect } = require("./config/mongoConnection");
const { userTypeDefs, userResolvers } = require("./schemas/users");
const authentication = require("./utils/authentication");
const { scanTypeDefs, scanResolvers } = require("./schemas/scans");
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs: [userTypeDefs, scanTypeDefs],
  resolvers: [userResolvers, scanResolvers],
  introspection: true,
});

(async () => {
  try {
    await mongoConnect();
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      context: async ({ req, res }) => {
        return {
          auth: async () => {
            return await authentication(req);
          },
        };
      },
    });
    console.log(`Server deployed at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
