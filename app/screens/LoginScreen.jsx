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

export default function LoginScreen() {
  const navigation = useNavigation();

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(password, username);
          }}
        >
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
