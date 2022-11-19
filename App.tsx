import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

// import { Dashboard } from "./src/screens/Dashboard";
// import { Register } from "./src/screens/Register";
import { StatusBar } from "react-native";
import { CategorySelect } from "./src/screens/CategorySelect";

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
      {/* <Dashboard /> */}
      {/* <Register /> */}
      <CategorySelect />
    </ThemeProvider>
  );
}
