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

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          placeholder="Username"
          keyboardType="email-address"
          value={username}
          onChangeText={setUsername}
          style={{
            backgroundColor: "white",
            height: 48,
            marginBottom: 8,
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
            marginBottom: 8,
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
          <Text style={{ color: "#008073" }}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 20, // Perubahan dari marginBottom ke marginTop
    width: 150,
    height: 40,
    backgroundColor: "white",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
});
