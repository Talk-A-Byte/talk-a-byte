import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomePage";
import GalleryScreen from "../screens/GalleryScreen";
import RecorderScreen from "../screens/RecorderScreen";
import ResultScreen from "../screens/ResultScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecorderScreen"
        component={RecorderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
