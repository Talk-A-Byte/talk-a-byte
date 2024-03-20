import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function RecorderScreen() {
  const [fontsLoaded] = useFonts({
    "OpenDyslexic3-Regular": require("../fonts/OpenDyslexic3-Regular.ttf"),
  });
  const navigation = useNavigation();

  const [started, setStarted] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [onSpeak, setOnSpeak] = useState(false);
  const [font, setFont] = useState("lucida grande");

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
          <Pressable></Pressable>
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
            style={{
              fontSize: 24,
              fontWeight: "regular",
              flex: 1,
              fontFamily: font,
            }}
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
    backgroundColor: "#FFC700",
    borderRadius: 24,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textBoard: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    marginVertical: 40,
    borderRadius: 24,
    padding: 20,
  },
});
