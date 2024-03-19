import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Button,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";

export default function RecorderScreen() {
  const navigation = useNavigation();

  const [started, setStarted] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [onSpeak, setOnSpeak] = useState(false);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleInputChange = (input) => {
    setExtractedText(input);
    setStarted(false);
  };

  const startSpeechToText = async () => {
    await Voice.start("en-NZ");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    if (!result) {
      Speech.speak(extractedText);
      setStarted(false);
    }
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
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={25} color={"white"} />
      </Pressable>
      <View style={{ alignItems: "center" }}>
        <View style={styles.textBoard}>
          <Pressable
            style={{
              alignItems: "flex-end",
            }}
            onPress={() => {
              console.log("copy that");
            }}
          >
            <Ionicons name="copy" size={45} color={"#008073"} />
          </Pressable>
          <TextInput
            onChangeText={handleInputChange}
            value={extractedText}
            style={{ fontSize: 24, fontWeight: "bold", flex: 1 }}
            multiline={true}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {!started ? (
            <Pressable onPress={startSpeechToText}>
              <View style={styles.cardButton}>
                <Ionicons name="mic" size={100} color={"#008073"} />
              </View>
            </Pressable>
          ) : undefined}
          {started ? (
            <Pressable onPress={stopSpeechToText}>
              <View style={styles.cardButton}>
                <Ionicons name="pause" size={100} color={"#008073"} />
              </View>
            </Pressable>
          ) : undefined}
          {onSpeak ? (
            <Pressable
              onPress={() => {
                Speech.stop();
                setOnSpeak(false);
              }}
              style={styles.cardButton}
            >
              <Ionicons name="volume-mute" size={100} color={"#008073"} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                Speech.speak(extractedText);
                setOnSpeak(true);
              }}
              style={styles.cardButton}
            >
              <Ionicons name="volume-medium" size={100} color={"#008073"} />
            </Pressable>
          )}
        </View>
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
    padding: 20,
  },
});
