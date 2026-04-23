import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../types/navigation";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../redux/user/userSlice";
import { useAppDispatch } from "../hooks/hooks";

export default function Splash() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser(user.displayName || "User")); 
                navigation.replace("Home");
            } else {
                navigation.replace("LogSign");
            }
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Splash/image_intro.png")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});