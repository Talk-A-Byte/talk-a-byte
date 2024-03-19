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
import { useMutation } from "@apollo/client";
import { ADD_SCAN, GET_SCANS } from "../queries";

export default function ResultScreen({ route, navigation }) {
  const { image, extractedText, labels, file } = route.params;
  const [imageLoaded, setImageLoaded] = useState("");

  const [addScan, { error, loading, data }] = useMutation(ADD_SCAN, {
    refetchQueries: [GET_SCANS],
  });

  useEffect(() => {
    if (image) {
      setImageLoaded(true);
    }
    Speech.speak(extractedText);
  }, [image]);
  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        backgroundColor: "#008073",
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <Pressable
          onPress={() => {
            Speech.stop();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color={"white"} />
        </Pressable>
      </View>
      {imageLoaded && (
        <Image
          source={{ uri: `data:image/png;base64,${image}` }}
          style={{
            resizeMode: "contain",
            backgroundColor: "black",
            width: "100%",
            height: "35%",
            borderRadius: 24,
          }}
        />
      )}
      <ScrollView
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: 24,
          padding: 20,
        }}
      >
        <Pressable
          style={{
            alignItems: "flex-end",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
          onPress={async () => {
            try {
              await addScan({
                variables: {
                  file: image,
                },
              });
              Speech.stop();

              navigation.navigate("HomeScreen");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Ionicons name="save" size={45} color={"#008073"} />
        </Pressable>
        <Text style={{ color: "#FFC700", fontSize: 30, fontWeight: "bold" }}>
          Extracted Text:
        </Text>
        <Text style={{ color: "black", fontSize: 30, fontWeight: "bold" }}>
          {extractedText}
        </Text>
        <Text style={{ color: "#008073", fontSize: 30, fontWeight: "bold" }}>
          Object Recognized:
        </Text>

        {labels && labels.length !== 0 ? (
          <>
            {labels.map((label, idx) => {
              return (
                <Text
                  style={{ color: "black", fontSize: 30, fontWeight: "bold" }}
                  key={`${idx}-${label.scores}`}
                >
                  -{label.description}
                </Text>
              );
            })}
          </>
        ) : (
          ""
        )}
      </ScrollView>
      <Button
        title="Text To Speech"
        onPress={() => {
          Speech.speak(extractedText);
        }}
      />
      <Button
        title="Stop Speech to Text"
        onPress={() => {
          Speech.stop();
        }}
      />
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
    padding: 10,
  },
});
