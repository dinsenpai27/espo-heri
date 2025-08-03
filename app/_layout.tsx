import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({

    "Lato-Regular": require("../assets/fonts/static/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/static/Lato-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/static/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/static/Roboto-Bold.ttf"),
    "Merriweather-Regular": require("../assets/fonts/static/Merriweather_24pt-Regular.ttf"),

    "Inter-Variable": require("../assets/fonts/variable/Inter-VariableFont.ttf"),
    "Raleway-Variable": require("../assets/fonts/variable/Raleway-VariableFont.ttf"),
    "Nunito-Variable": require("../assets/fonts/variable/Nunito-VariableFont.ttf"),
    "Mulish-Variable": require("../assets/fonts/variable/Mulish-VariableFont.ttf"),
    "Manrope-Variable": require("../assets/fonts/variable/Manrope-VariableFont.ttf"),
  });

  useEffect(() => {
    if (loaded || error != null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && error == null) {
    return null;
  }

  return <Stack />;
}
