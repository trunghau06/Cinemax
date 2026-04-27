import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppContent from "./pages/AppContent";

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [loaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  useEffect(() => {
    const prepareApp = async () => {
      const value = await AsyncStorage.getItem("onboardingDone");

      setInitialRoute(value === "true" ? "Splash" : "Onboarding");
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  if (!loaded || !initialRoute) return null;

  return (
    <Provider store={store}>
      <AppContent initialRoute={initialRoute} />
    </Provider>
  );
}