import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

import Onboarding from "../pages/Onboarding";
import Splash from "../pages/Splash";
import LogSign from "../pages/LogSign";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import BottomTabs from "../components/BottomTabs";
import DetailPage from "../pages/DetailPage";
import AllMoviesPage from "../pages/AllMoviesPage";
import EditProfile from "../pages/EditProfile";
import PrivacyPage from "../pages/PrivacyPage";
import AboutUs from "../pages/AboutUs";
import HelpFeed from "../pages/HelpFeed";
import WishList from "../pages/WishList";

import { useAppDispatch } from "../hooks/hooks";
import { fetchDownloads } from "../thunk/downloadThunk";
import { fetchWishList } from "../thunk/wishlistThunk";

import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function AppContent({ initialRoute }: any) {
    const dispatch = useAppDispatch();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(fetchDownloads());
                dispatch(fetchWishList());
            }
            setReady(true);
        });
        return unsub;
    }, []);

    useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
    }, []);

    if (!ready) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="LogSign" component={LogSign} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Forgot" component={ForgotPassword} />

                <Stack.Screen name="Home" component={BottomTabs} />

                <Stack.Screen name="Detail" component={DetailPage} />
                <Stack.Screen name="AllMovies" component={AllMoviesPage} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Privacy" component={PrivacyPage} />
                <Stack.Screen name="Aboutus" component={AboutUs} />
                <Stack.Screen name="HelpFeed" component={HelpFeed} />
                <Stack.Screen name="WishList" component={WishList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}