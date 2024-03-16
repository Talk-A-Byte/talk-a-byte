import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
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
import Voice from "@react-native-voice/voice";

export default function App() {
  // State to hold the selected image
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const [image, setImage] = useState(null);

  // State to hold extracted text
  const [extractedText, setExtractedText] = useState("");

  // Google Vision Object Recognization Labels
  const [labels, setLabels] = useState([]);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState("");

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
  };

  const onSpeechError = (error) => {
    setStarted(false);
    console.log(error);
  };

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
      analyzeImage(result.assets[0].uri);
      setImage(result.assets[0].uri);
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
      if (!apiResponse.data.responses[0].fullTextAnnotation.text) {
        setExtractedText(`Cannot Extract Text from the images!`);
        throw error;
      }
      setExtractedText(apiResponse.data.responses[0].fullTextAnnotation.text);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
      Speech.speak(apiResponse.data.responses[0].fullTextAnnotation.text);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Error analyzing image. Please try again later.");
    }
  };

  const speak = (text) => {
    Speech.speak(text);
  };

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
      {!started ? (
        <Button title="Start Speech to Text" onPress={startSpeechToText} />
      ) : undefined}
      {started ? (
        <Button title="Stop Speech to Text" onPress={stopSpeechToText} />
      ) : undefined}
      <Text style={styles.text1}>Extracted text:</Text>
      <ScrollView>
        <Text style={styles.text1}>{extractedText}</Text>
        {labels && labels.length !== 0 ? (
          <>
            {labels.map((label, idx) => {
              return (
                <View key={`${idx}-${label.scores}`}>
                  <Text>{label.description}</Text>
                </View>
              );
            })}
          </>
        ) : (
          ""
        )}
        <Button
          title="Stop Speech"
          onPress={() => {
            Speech.stop();
          }}
        />
        <Button
          title="Text To Speech"
          onPress={() => {
            speak(extractedText);
          }}
        />
      </ScrollView>

      <View>
        <StatusBar style="auto" />
      </View>
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
