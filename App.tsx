import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./pages/Onboarding";
import Splash from "./pages/Splash";
import LogSign from "./pages/LogSign";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "./redux/store";
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
import BottomTabs from "./components/BottomTabs";
import DetailPage from "./pages/DetailPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import EditProfile from "./pages/EditProfile";
import PrivacyPage from "./pages/PrivacyPage";
import AboutUs from "./pages/AboutUs";
import HelpFeed from "./pages/HelpFeed";
import FavoritesPage from "./pages/WishList";
import WishList from "./pages/WishList";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
      NavigationBar.setVisibilityAsync("hidden");
  }, []);
  
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [loaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  useEffect(() => {
    const prepareApp = async () => {
      const value = await AsyncStorage.getItem("onboardingDone");

      if (value === "true") {
        setInitialRoute("Splash");
      } else {
        setInitialRoute("Onboarding");
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded || !initialRoute) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen 
            name="Onboarding" 
            component={Onboarding} 
          />

          <Stack.Screen 
            name="Splash" 
            component={Splash} 
          />

          <Stack.Screen 
             name="LogSign" 
             component={LogSign} 
            />

          <Stack.Screen 
            name="LogIn" 
            component={LogIn} 
          />

          <Stack.Screen 
            name="SignUp" 
            component={SignUp} 
          />

          <Stack.Screen 
            name="Forgot" 
            component={ForgotPassword} 
          />

          <Stack.Screen 
            name="Home" 
            component={BottomTabs} 
          />

          <Stack.Screen 
            name="Detail" 
            component={DetailPage} 
          />

          <Stack.Screen 
            name="AllMovies" 
            component={AllMoviesPage} 
          />

          <Stack.Screen 
            name="EditProfile" 
            component={EditProfile} 
          />

          <Stack.Screen 
            name="Privacy" 
            component={PrivacyPage} 
          />

          <Stack.Screen 
            name="Aboutus" 
            component={AboutUs} 
          />

          <Stack.Screen 
            name="HelpFeed" 
            component={HelpFeed} 
          />

          <Stack.Screen 
            name="WishList" 
            component={WishList} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}