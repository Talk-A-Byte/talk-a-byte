import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../queries";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dispatcher, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted: async (res) => {
      let token = null;
      if (res) token = res.login.token;
      await SecureStore.setItemAsync("token", token);
      setIsLoggedIn(true);
      navigation.navigate("HomeScreen");
    },
  });
  async function login() {
    try {
      await dispatcher({
        variables: {
          email,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#ffc800", "#4bcc99", "#008073"]}
        style={styles.content}
        start={{ x: 2, y: 0 }}
        end={{ x: 2, y: 1 }}
      >
        <Text style={styles.text}>Login</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "white",
            height: 48,
            padding: 10,
            width: 300,
            fontSize: 24,
            borderRadius: 10,
          }}
        />
        <TextInput
          placeholder="Password"
          keyboardType="numeric"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "white",
            height: 48,
            padding: 10,
            width: 300,
            fontSize: 24,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{ color: "#008073" }}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
            width: "50%",
            borderTopColor: "white",
            borderTopWidth: 2,
            padding: 5,
          }}
        >
          <Text style={{ color: "white" }}>Don't have an account?</Text>
          <Pressable
            style={{
              width: 150,
              height: 40,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 26,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={{ color: "white" }}>Register here</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "white",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
});
