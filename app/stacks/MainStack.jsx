import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeStack from "./HomeStack";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import LandingPage from "../screens/LandingScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        {!isLoggedIn && (
          <Stack.Screen
            name="LandingScreen"
            component={LandingPage}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
