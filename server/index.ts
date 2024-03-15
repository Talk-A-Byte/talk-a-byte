import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mongoConnect } from "./config/mongoConnection";
import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from "./schemas/users";
import { jwtAuthentication as authentication } from "./utils/authentication";
const PORT: number | number = +process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
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
