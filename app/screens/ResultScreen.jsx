import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
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
import { useFonts } from "expo-font";
import { LoginContext } from "../contexts/LoginContext";

export default function ResultScreen({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    "OpenDyslexic3-Regular": require("../fonts/OpenDyslexic3-Regular.ttf"),
  });
  const [font, setFont] = useState("lucida grande");
  const { image, extractedText, labels, file } = route.params;
  const [imageLoaded, setImageLoaded] = useState("");

  const [addScan, { error, loading, data }] = useMutation(ADD_SCAN, {
    refetchQueries: [GET_SCANS],
  });

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

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
        gap: 10,
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
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() => {
              if (font === "lucida grande") setFont("OpenDyslexic3-Regular");
              if (font === "OpenDyslexic3-Regular") setFont("lucida grande");
            }}
          >
            <Text style={{ fontSize: 40, color: "#008073", fontFamily: font }}>
              Aa
            </Text>
          </Pressable>
          {isLoggedIn && (
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
          )}
          {!isLoggedIn && (
            <Pressable
              style={{
                alignItems: "flex-end",
                marginHorizontal: 20,
                marginVertical: 20,
              }}
              onPress={() => {
                Speech.stop();

                navigation.navigate("LoginScreen");
              }}
            >
              <Ionicons name="save" size={45} color={"#008073"} />
            </Pressable>
          )}
        </View>
        <Text
          style={{
            color: "#FFC700",
            fontSize: 30,
            fontFamily: font,
          }}
        >
          Extracted Text:
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontFamily: font,
          }}
        >
          {extractedText}
        </Text>
        <Text
          style={{
            color: "#008073",
            fontSize: 30,
            fontFamily: font,
          }}
        >
          Object Recognized:
        </Text>

        {labels && labels.length !== 0 ? (
          <>
            {labels.map((label, idx) => {
              return (
                <Text
                  style={{
                    color: "black",
                    fontSize: 30,
                    fontFamily: font,
                  }}
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
      <Pressable
        style={{
          backgroundColor: "#FFC700",
          padding: 10,
          alignItems: "center",
          borderRadius: 25,
        }}
        onPress={() => {
          Speech.speak(extractedText);
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          TEXT TO SPEECH
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFC700",
          padding: 10,
          alignItems: "center",
          borderRadius: 25,
        }}
        onPress={() => {
          Speech.stop();
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          STOP TEXT TO SPEECH
        </Text>
      </Pressable>
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
