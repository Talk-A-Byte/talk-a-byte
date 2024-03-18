import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../screens/LandingScreen";
import HomeScreen from "../screens/HomePage";
import HomeStack from "./HomeStack";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LandingScreen"
            >
                <Stack.Screen name="LandingScreen" component={LandingPage} options={{ headerShown: false }} />
                <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}