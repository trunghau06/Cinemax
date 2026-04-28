import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import FloatingInput from "../components/FloatingInput";
import { useState } from "react";
import { auth } from "../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email");
            return;
        }

        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Success", "Password reset link has been sent to your email");
            navigation.navigate("LogIn");
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                Alert.alert("Error", "Email does not exist");
            } else if (error.code === "auth/invalid-email") {
                Alert.alert("Error", "Invalid email format");
            } else {
                Alert.alert("Error", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.title__subtitle}>Recover your account password</Text>

                {/* Form */}
                <View style={styles.form}>
                    <FloatingInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.nextBtn}
                    activeOpacity={0.85}
                    onPress={handleNext}
                    disabled={loading}
                >
                    <Text style={styles.nextBtn__text}>Next</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#161D2F" 
    },
    
    scroll: { 
        paddingHorizontal: 24, 
        paddingBottom: 40 
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        marginBottom: 32,
    },
    
    header__backBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: "#1e2640",
        alignItems: "center", justifyContent: "center",
    },

    title: {
        color: "#fff", fontSize: 28,
        fontFamily: "PoppinsBold",
        marginBottom: 8,
        textAlign: "center",
        alignSelf: "stretch",
    },
    title__subtitle: {
        color: "#888", fontSize: 14,
        fontFamily: "PoppinsRegular",
        lineHeight: 22,
        marginBottom: 36,
        textAlign: "center",
        alignSelf: "stretch",
    },

    form: { gap: 16, marginBottom: 24 },

    nextBtn: {
        backgroundColor: "#00BCD4",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
    },

    nextBtn__text: { 
        color: "#fff", 
        fontSize: 16, 
        fontFamily: "PoppinsBold" 
    },
});