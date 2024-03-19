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
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  let imgResult;
  const data = [1, 2, 3];
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // State to hold extracted text
  const [extractedText, setExtractedText] = useState("");

  // Google Vision Object Recognization Labels
  const [labels, setLabels] = useState([]);

  // Function to pick an image from the
  // device's gallery
  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      analyzeImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
      imgResult = result.assets[0].uri;
    }
  };

  const pickImageCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
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

  const analyzeImage = async (file) => {
    try {
      setLabels("");
      setExtractedText("");
      if (!file) {
        alert("Please select an image first.");
        return;
      }
      const base64ImageData = await FileSystem.readAsStringAsync(file, {
        encoding: FileSystem.EncodingType.Base64,
      });

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

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/5f/7e/c2/5f7ec255d7927e360af2a6e767c3dd74.jpg",
        }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          borderRadius: 54,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <Ionicons name="hand-left-outline" size={30} color={"white"} />
        <Pressable
          onPress={() => {
            console.log("log out");
          }}
        >
          <Ionicons name="exit-outline" size={30} color={"white"} />
        </Pressable>
      </View>
      <View>
        <Text style={styles.text}>Talk A Byte</Text>
        <Pressable onPress={() => {
          navigation.navigate("GalleryScreen")
        }}>
          <Ionicons name="folder-open-outline" size={30} color={"#ffc800"} />
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }}
        style={{ width: windowWidth }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable onPress={() => Alert.alert("Hi!", "Which one would u prefer?", [
          {
            text: "Pick image from gallery",
            onPress: pickImageGallery
          }, {
            text: "Pick image from Camera",
            onPress: pickImageCamera
          }
        ])}>
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
});
