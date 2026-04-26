import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingInput from "../components/FloatingInput";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
    const dispatch = useDispatch();

    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleSignUp = async () => {
        if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (!/^[a-zA-ZÀ-ỹ\s]{2,50}$/.test(name.trim())) {
            Alert.alert("Error", "Name only contains letters, at least 2 characters");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            Alert.alert("Error", "Invalid email format");
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password)) {
            Alert.alert("Error", "Min 6 chars, include letters and numbers");
            return;
        }

        if (!/^\+?\d{9,11}$/.test(phone.replace(/\s/g, ""))) {
            Alert.alert("Error", "Invalid phone number (9-11 digits)");
            return;
        }

        if (!agreed) {
            Alert.alert("Error", "Please agree to the terms");
            return;
        }

        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });

            await setDoc(doc(db, "users", userCredential.user.uid), {
                fullName: name,
                email,
                phone,
                updatedAt: new Date().toISOString(),
            });

            dispatch(setUser(name));
            Alert.alert("Success", "Account created successfully!");
            navigation.navigate('LogIn');

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
                    <Text style={styles.header__title}>Sign Up</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* Title */}
                <Text style={styles.title}>Let's get started</Text>
                <Text style={styles.title__subtitle}>The latest movies and series{"\n"}are here</Text>

                {/* Form */}
                <FloatingInput label="Full Name" value={name} onChangeText={setName} />
                <FloatingInput label="Email Address" value={email} onChangeText={setEmail} />
                <FloatingInput label="Password" value={password} secureText onChangeText={setPassword} />
                <FloatingInput label="Phone Number" value={phone} onChangeText={setPhone} />

                {/* Checkbox */}
                <TouchableOpacity style={styles.agree} onPress={() => setAgreed(v => !v)} activeOpacity={0.8}>
                    <View style={[styles.agree__checkbox, agreed && styles["agree__checkbox--active"]]}>
                        {agreed && <Ionicons name="checkmark" size={14} color="#fff" style={{fontWeight: 800}} />}
                    </View>
                    <Text style={styles.agree__text}>
                        I agree to the <Text style={styles.agree__link}>Terms and Services</Text>
                        {"\n"}and <Text style={styles.agree__link}>Privacy Policy</Text>
                    </Text>
                </TouchableOpacity>

                {/* Button */}
                <TouchableOpacity style={styles.signUpBtn} activeOpacity={0.85} onPress={handleSignUp}>
                    <Text style={styles.signUpBtn__text}>Sign Up</Text>
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
        width: 36, 
        height: 36, 
        borderRadius: 10,
        backgroundColor: "#1e2640",
        alignItems: "center", justifyContent: "center",
    },

    header__title: { 
        color: "#fff", 
        fontSize: 18, 
        fontFamily: "PoppinsBold" 
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

    form: { 
        gap: 16,
        marginBottom: 24 
    },

    agree: {
        flexDirection: "row", 
        alignItems: "flex-start",
        gap: 12, 
        marginBottom: 32,
    },

    agree__checkbox: {
        width: 22, 
        height: 22, 
        borderRadius: 6,
        borderWidth: 1.5, 
        borderColor: "#2a3250", 
        marginTop: 2,
    },

    "agree__checkbox--active": {
        backgroundColor: "#00e5ff",
        borderColor: "#00e5ff",
        justifyContent: 'center',
        alignItems: 'center'
    },

    agree__text: {
        color: "#888", 
        fontSize: 13,
        fontFamily: "PoppinsRegular", 
        lineHeight: 22, flex: 1,
    },
    
    agree__link: { 
        color: "#00e5ff", 
        fontFamily: "PoppinsBold" 
    },

    signUpBtn: {
        backgroundColor: "#00BCD4", 
        borderRadius: 30,
        paddingVertical: 16, 
        alignItems: "center",
    },

    signUpBtn__text: { 
        color: "#fff", 
        fontSize: 16, 
        fontFamily: "PoppinsBold" 
    },
});