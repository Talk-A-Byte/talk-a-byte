import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createHttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import * as SecureStore from "expo-secure-store";
const httpLink = createHttpLink({
  uri: "http://localhost:3000/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});
// export it
export default client;
