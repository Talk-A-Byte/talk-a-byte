import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";

export default function RecorderScreen() {
  const [started, setStarted] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("en-NZ");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setExtractedText(result.value[0]);
    Speech.speak(result.value[0]);
    setStarted(false);
    4;
  };

  const onSpeechError = (error) => {
    setStarted(false);
    console.log(error);
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={{ marginTop: 20 }}
        onPress={() => {
          console.log("aduh kepencet");
        }}
      >
        <Ionicons name="arrow-back" size={25} color={"white"} />
      </Pressable>
      <View style={{ alignItems: "center" }}>
        <View style={styles.textBoard}>
          <Pressable
            style={{
              alignItems: "flex-end",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
            onPress={() => {
              console.log("copy that");
            }}
          >
            <Ionicons name="copy-outline" size={45} color={"#008073"} />
          </Pressable>
          <Text>{extractedText}</Text>
        </View>
        {!started ? (
          <Pressable onPress={startSpeechToText}>
            <View style={styles.cardButton}>
              <Ionicons name="mic-outline" size={100} color={"#008073"} />
            </View>
          </Pressable>
        ) : undefined}
        {started ? (
          <Pressable onPress={stopSpeechToText}>
            <View style={styles.cardButton}>
              <Ionicons name="mic-outline" size={100} color={"red"} />
            </View>
          </Pressable>
        ) : undefined}
        <Pressable
          onPress={() => {
            Speech.speak(extractedText);
          }}
        >
          <View style={styles.cardButton}>
            <Ionicons name="mic-outline" size={100} color={"#008073"} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#008073",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    width: 300,
    height: 359,
    borderRadius: 54,
    marginVertical: 10,
    marginRight: 15,
  },
  cardButton: {
    width: 150,
    height: 150,
    backgroundColor: "yellow",
    borderRadius: 24,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textBoard: {
    width: 320,
    height: 350,
    backgroundColor: "white",
    marginVertical: 40,
    borderRadius: 24,
  },
});
