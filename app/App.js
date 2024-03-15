import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function App() {
  // State to hold the selected image
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
      // Perform OCR on the selected image
      performOCR(result.assets[0]);

      // Set the selected image in state
      setImage(result.assets[0].uri);
    }
  };

  // Function to capture an image using the
  // device's camera
  const pickImageCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        allowsMultipleSelection: false,
      });
      if (!result.canceled) {
        // Perform OCR on the captured image
        // Set the captured image in state
        performOCR(result.assets[0]);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // Function to perform OCR on an image
  // and extract text
  const performOCR = (file) => {
    let myHeaders = new Headers();
    myHeaders.append(
      "apikey",

      // ADDD YOUR API KEY HERE
      "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20"
    );
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file;
    let requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: raw,
    };

    // Send a POST request to the OCR API
    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Set the extracted text in state
        setExtractedText(result["all_text"]);
      })
      .catch((error) => console.log("error", error));
  };

  const speak = (text) => {
    Speech.speak(text);
  };

  const analyzeImage = async () => {
    try {
      if (!image) {
        alert("Please select an image first.");
        return;
      }

      // Replace 'YOUR_GOOGLE_CLOUD_VISION_API_KEY' with your actual API key
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      // Read the image file from local URI and convert it to base64
      const base64ImageData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error analyzing image. Please try again later.");
    }
  };

  console.log(labels);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Talk a Byte</Text>
      <Text style={styles.heading2}>Image to Text App</Text>
      <Button title="Pick an image from gallery" onPress={pickImageGallery} />
      <Button title="Pick an image from camera" onPress={pickImageCamera} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 400,
            height: 300,
            objectFit: "contain",
          }}
        />
      )}

      <Text style={styles.text1}>Extracted text:</Text>
      <ScrollView>
        <Text style={styles.text1}>{extractedText}</Text>
        {labels && labels.length !== 0 ? (
          <>
            <View>
              {labels.map((label) => {
                return (
                  <View>
                    <Text>{label.description}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          ""
        )}
      </ScrollView>
      <Button
        title="Start listening"
        onPress={() => {
          speak(extractedText);
        }}
      />
      <Button title="Analyze Image" onPress={analyzeImage} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    height: "100%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
    textAlign: "center",
  },
  heading2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  text1: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
});
