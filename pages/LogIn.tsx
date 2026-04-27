import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import FloatingInput from "../components/FloatingInput";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectUserName } from "../redux/user/useSelectors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/user/userSlice";
import { setWishList } from "../redux/wishList/wishSlice";
import { collection, getDocs } from "firebase/firestore";

export default function LogIn() {
    const userName = useAppSelector(selectUserName); 
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const validateEmail = (value: string) => {
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
        return "";
    };

    const validatePassword = (value: string) => {
        if (!value) return "Password is required";
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(value))
            return "Min 6 chars, letters + numbers";
        return "";
    };

    const handleLogIn = async () => {
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);

        if (emailErr || passErr) {
            setErrors({
                email: emailErr,
                password: passErr,
            });
            return;
        }

        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                await userCredential.user.reload();
                const name = userCredential.user.displayName || "User";
                dispatch(setUser(name));

                try {
                    const snap = await getDocs(collection(db, "users", userCredential.user.uid, "wishlist"));
                    const movies = snap.docs.map((doc: any) => doc.data()) as any[];
                    dispatch(setWishList(movies));
                } catch (e) {
                    // user chưa có data trong Firestore, bỏ qua
                    dispatch(setWishList([]));
                }

                navigation.replace("Home");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
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
                    <Text style={styles.header__title}>Login</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    {userName ? `Hi ${userName}` : "Hi User"}
                </Text>
                <Text style={styles.title__subtitle}>Welcome back! Please enter{"\n"}your details</Text>

                {/* Form */}
                <View style={styles.form}>
                    <FloatingInput
                        label="Email Address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setErrors(prev => ({
                                ...prev,
                                email: validateEmail(text)
                            }));
                        }}
                        onBlur={() => {
                            setErrors(prev => ({
                                ...prev,
                                email: validateEmail(email)
                            }));
                        }}
                    />
                    {errors.email ? (
                        <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>
                    ) : null}
                    <FloatingInput
                        label="Password"
                        value={password}
                        secureText
                        onChangeText={(text) => {
                            setPassword(text);
                            setErrors(prev => ({
                                ...prev,
                                password: validatePassword(text)
                            }));
                        }}
                        onBlur={() => {
                            setErrors(prev => ({
                                ...prev,
                                password: validatePassword(password)
                            }));
                        }}
                    />
                    {errors.password ? (
                        <Text style={{ color: "red", fontSize: 12 }}>{errors.password}</Text>
                    ) : null}
                </View>

                <TouchableOpacity style={styles.forgot} onPress={() => navigation.navigate('Forgot')}>
                    <Text style={styles.forgot__text}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Button */}
                <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85} onPress={handleLogIn}>
                    <Text style={styles.loginBtn__text}>Login</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#161D2F" },
    scroll: { paddingHorizontal: 24, paddingBottom: 40 },

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
    header__title: { color: "#fff", fontSize: 18, fontFamily: "PoppinsBold" },

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

    forgot: {
        alignSelf: "flex-end",
        marginBottom: 32,
    },
    forgot__text: {
        color: "#00e5ff",
        fontSize: 13,
        fontFamily: "PoppinsRegular",
    },

    loginBtn: {
        backgroundColor: "#00BCD4",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
    },
    loginBtn__text: { color: "#fff", fontSize: 16, fontFamily: "PoppinsBold" },
});