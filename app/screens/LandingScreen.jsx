import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#008073",
      }}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Talk A Byte</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("HomeStack", { screen: "HomeScreen" });
          }}
        >
          <Ionicons name="arrow-forward" size={25} color={"#008073"} />
        </TouchableOpacity>
      </View>
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
    color: "#FFC700",
    fontSize: 60,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 50,
    backgroundColor: "#FFC700",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
});
