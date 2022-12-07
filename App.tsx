//Native
import React from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";

//Navigation
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";

//Components
import { SignIn } from "./src/screens/SignIn";

//Context
import { AuthProvider } from "./src/hooks/auth";

//Style
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
      <NavigationContainer>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
