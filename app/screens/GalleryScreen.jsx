import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  FlatList,
} from "react-native";
import { GET_SCANS } from "../queries";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import * as ImagePicker from "expo-image-picker";

import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";

import * as SecureStore from "expo-secure-store";

export default function GalleryScreen() {
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
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error analyzing image. Please try again later.");
    }
  };

  const speak = (text) => {
    Speech.speak(text);
  };

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
            navigation.goBack();
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

      <View style={{ marginTop: 40 }}>
        <FlatList
          data={data?.getScans}
          renderItem={({ item }) => {
            const { file } = item;
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    analyzeImage(file, true);
                  }}
                >
                  <Image
                    source={{ uri: `data:image/png;base64,${item.file}` }}
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 16,
                      resizeMode: "contain",
                      backgroundColor: "black",
                    }}
                  />
                </Pressable>
              </View>
            );
          }}
        />
      </View>
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
    height: 300,
    backgroundColor: "white",
    borderRadius: 24,
  },
});
