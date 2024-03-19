import { Ionicons } from "@expo/vector-icons";
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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState();

  const [registDispatcher, { error, loading, data }] =
    useMutation(REGISTER_USER);

  async function register() {
    try {
      await registDispatcher({
        variables: {
          payload: {
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password,
            pfpUrl: form.pfpUrl,
          },
        },
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log(error);
      const message = error.message.split(`"`);
      console.log(message[1]);
      setErrorMsg(message[1]);
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("mau login");
          }}
        >
          <Text style={{ color: "#008073" }}>Register</Text>
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
