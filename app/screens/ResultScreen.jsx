import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  ScrollView,
  Button,
} from "react-native";
import * as Speech from "expo-speech";

export default function ResultScreen({ route }) {
  const { image, extractedText, labels } = route.params;
  const [imageLoaded, setImageLoaded] = useState("");
  const [onSpeak, setOnSpeak] = useState(false)

  useEffect(() => {
    if (image) {
      setImageLoaded(true);
    }
    Speech.speak(extractedText);
  }, [image]);





  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <Pressable
          onPress={() => {
            console.log("back");
          }}
        >
          <Ionicons name="arrow-back" size={30} color={"white"} />
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("exit");
          }}
        >
          <Ionicons name="exit-outline" size={30} color={"white"} />
        </Pressable>
      </View>
      {imageLoaded && (
        <Image
          source={{ uri: image }}
          style={{
            width: 310,
            height: 300,
            borderRadius: 24,
            marginVertical: 20,
          }}
        />
      )}
      <ScrollView>
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
          <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>{extractedText}</Text>
          {labels && labels.length !== 0 ? (
            <>
              <Text style={{ paddingTop: 10, fontSize: 16 }}>Description Label</Text>
              {labels.map((label, idx) => {
                return (
                  <View key={`${idx}-${label.scores}`}  >
                    <Text style={{ fontSize: 16 }}>- {label.description}</Text>
                  </View>
                );
              })}
            </>
          ) : (
            ""
          )}
        </View>

        <View style={{ padding: 20, alignItems: "center" }}>
          {onSpeak ? (<Pressable
            onPress={() => {
              Speech.stop();
            }}
            style={styles.cardButton}
          >
            <Ionicons name="volume-mute" size={100} color={"#008073"} />

          </Pressable>) : (<Pressable
            onPress={() => {
              Speech.speak(extractedText);
              setOnSpeak(true)
            }}
            style={styles.cardButton}
          >
            <Ionicons name="play" size={100} color={"#008073"} />

          </Pressable>)
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#008073",
  },

  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
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
    width: 310,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
  },
});
