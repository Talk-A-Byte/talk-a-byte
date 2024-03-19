import { StyleSheet } from "react-native";
import MainStack from "./stacks/MainStack";
import { LoginProvider } from "./contexts/LoginContext";
import { ApolloProvider } from "@apollo/client";
import client from "./configs";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainStack />
      </LoginProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    height: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
    textAlign: "center",
  },
  heading2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
});
