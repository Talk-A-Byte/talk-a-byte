import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_SCANS } from "../queries";

const windowWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const { loading, data, error, refetch } = useQuery(GET_SCANS);

  let imgResult;
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  // State to hold extracted text
  const [extractedText, setExtractedText] = useState("");

  // Google Vision Object Recognization Labels
  const [labels, setLabels] = useState([]);

  // Function to pick an image from the
  // device's gallery
  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      analyzeImage(result.assets[0].uri, false);
      setImage(result.assets[0].uri);
      imgResult = result.assets[0].uri;
    }
  };

  const pickImageCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
      });
      if (!result.canceled) {
        analyzeImage(result.assets[0].uri);
        setImage(result.assets[0].uri);
        imgResult = result.assets[0].uri;
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const analyzeImage = async (file, baseOrNot) => {
    try {
      setLabels("");
      setExtractedText("");
      if (!file) {
        alert("Please select an image first.");
        return;
      }
      let base64ImageData = "";
      if (baseOrNot) {
        base64ImageData = file;
        imgResult = file;
      }
      if (!baseOrNot) {
        base64ImageData = await FileSystem.readAsStringAsync(file, {
          encoding: FileSystem.EncodingType.Base64,
        });
        imgResult = base64ImageData;
      }

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [
              { type: "TEXT_DETECTION" },
              { type: "LABEL_DETECTION", maxResults: 5 },
            ],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      if (apiResponse.data.responses[0].fullTextAnnotation?.text) {
        setExtractedText(apiResponse.data.responses[0].fullTextAnnotation.text);
        Speech.speak(apiResponse.data.responses[0].fullTextAnnotation.text);
      }
      setLabels(apiResponse.data.responses[0].labelAnnotations);
      navigation.navigate("ResultScreen", {
        image: imgResult,
        extractedText: apiResponse.data.responses[0].fullTextAnnotation.text,
        labels: apiResponse.data.responses[0].labelAnnotations,
        file: base64ImageData,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error analyzing image. Please try again later.");
    }
  };

  const speak = (text) => {
    Speech.speak(text);
  };

  const renderCard = ({ item }) => {
    const { file } = item;

    return (
      <Pressable
        onPress={() => {
          analyzeImage(file, true);
        }}
      >
        <Image
          source={{ uri: `data:image/png;base64,${file}` }}
          style={{
            resizeMode: "contain",
            borderRadius: 25,
            flex: 1,
            height: "100%",
            width: 300,
            backgroundColor: "black",
          }}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        paddingVertical: 50,
        backgroundColor: "#008073",
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="hand-left-outline" size={30} color={"#FFC700"} />
        {isLoggedIn && (
          <Pressable
            onPress={async () => {
              await SecureStore.deleteItemAsync("token");
              setIsLoggedIn(false);
            }}
          >
            <Ionicons name="exit-outline" size={30} color={"#FFC700"} />
          </Pressable>
        )}
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Talk A Byte
        </Text>
        {isLoggedIn && (
          <Pressable
            onPress={() => {
              navigation.navigate("GalleryScreen");
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="folder-open-outline" size={75} color={"#FFC700"} />
            <Ionicons name="arrow-forward" size={30} color={"#FFC700"} />
          </Pressable>
        )}
      </View>
      {isLoggedIn && (
        <>
          {data?.getScans.length === 0 && (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 25,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#008073", fontSize: 20 }}>
                No saved images yet...
              </Text>
            </View>
          )}
          {data?.getScans.length != 0 && (
            <FlatList
              horizontal
              data={data?.getScans}
              renderItem={renderCard}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                flexGrow: 1,
                flexDirection: "row",
                gap: 10,
              }}
            />
          )}
        </>
      )}

      {!isLoggedIn && (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Ionicons name="enter-outline" size={100} color={"#008073"} />
          </Pressable>
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          onPress={() =>
            Alert.alert("Hi!", "Which one would u prefer?", [
              {
                text: "Pick image from gallery",
                onPress: pickImageGallery,
              },
              {
                text: "Pick image from Camera",
                onPress: pickImageCamera,
              },
            ])
          }
        >
          <View style={styles.cardButton}>
            <Ionicons name="camera-outline" size={100} color={"#008073"} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("RecorderScreen");
          }}
        >
          <View style={styles.cardButton}>
            <Ionicons name="mic-outline" size={100} color={"#008073"} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
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
    flex: 1,
    borderRadius: 54,
  },
  cardButton: {
    width: 150,
    height: 150,
    backgroundColor: "#FFC700",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
