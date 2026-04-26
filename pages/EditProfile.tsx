import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectUserName } from "../redux/user/useSelectors";
import { auth, db } from "../services/firebase";
import FloatingInput from "../components/FloatingInput";
import { useState, useRef, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { setUser } from "../redux/user/userSlice";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const userName = useAppSelector(selectUserName);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);

    const fullNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const phoneRef = useRef("");

    const dispatch = useAppDispatch();
    useEffect(() => {
        const loadProfile = async () => {
            const user = auth.currentUser;
            if(!user) return;

            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                const data = snap.data();
                if(data.fullName) setFullName(data.fullName);
                if(data.email) setEmail(data.email);
                if(data.phone) setPhone(data.phone);
            }
        };
        loadProfile();
    }, []);

    const validate = () => {
        let valid = true;

        if (!fullName.trim()) {
            setNameError("* Full name is required");
            valid = false;
        } else if (!/^[a-zA-ZÀ-ỹ\s]{2,50}$/.test(fullName.trim())) {
            setNameError("* Name only contains letters, at least 2 characters");
            valid = false;
        } else {
            setNameError("");
        }

        if (!email.trim()) {
            setEmailError("* Email is required");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setEmailError("* Invalid email format");
            valid = false;
        } else {
            setEmailError("");
        }

        if (password.trim() && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password)) {
            setPasswordError("* Min 6 chars, include letters and numbers");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!phone.trim()) {
            setPhoneError("* Phone number is required");
            valid = false;
        } else if (!/^\+?\d{9,11}$/.test(phone.replace(/\s/g, ""))) {
            setPhoneError("* Invalid phone number (9-11 digits)");
            valid = false;
        } else {
            setPhoneError("");
        }

        return valid;
    };

    const handleSave = async () => {
        if (!validate()) return;
        
        try {
            const user = auth.currentUser;
            if (!user) return;

            await updateProfile(user, { displayName: fullName });
            dispatch(setUser(fullName));

            if(email !== user.email) {
                await updateEmail(user, email);
            }

            if (password.trim()) {
                await updatePassword(user, password);
            }

            await setDoc(doc(db, "users", user.uid), {
                fullName,
                email,
                phone,
                updatedAt: new Date().toISOString(),
            }, { merge: true });

            navigation.goBack();          
        } catch(error: any) {
            if (error.code === "auth/requires-recent-login") {
                Alert.alert("Session expired", "Please log out and log back in.");
            } else {
                Alert.alert("Error", error.message);
            }
        }
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission denied", "Please allow access to your photo library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],  // đổi từ MediaTypeOptions.Images
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.header__title}>Edit Profile</Text>
                        <View style={{ width: 36 }} />
                    </View>

                    {/* Avatar */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarSection__wrapper}>
                            <Image
                                source={
                                    avatar
                                        ? { uri: avatar }
                                        : require('../assets/HomePage/default_avatar.jpg')
                                }
                                style={styles.avatarSection__image}
                                resizeMode="cover"
                            />
                            <TouchableOpacity style={styles.avatarSection__editBtn} onPress={handlePickImage}>
                                <Ionicons name="pencil" size={12} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.avatarSection__name}>{userName ?? "User Name"}</Text>
                        <Text style={styles.avatarSection__email}>{auth.currentUser?.email ?? "user@email.com"}</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View>
                            <FloatingInput
                                label="Full Name"
                                value={fullName}
                                onChangeText={(text) => { setFullName(text); fullNameRef.current = text; setNameError(""); }}
                                onBlur={() => {
                                    const val = fullNameRef.current;
                                    if (!val.trim()) setNameError("* Full name is required");
                                    else if (!/^[a-zA-ZÀ-ỹ\s]{2,50}$/.test(val.trim())) setNameError("* Name only contains letters, at least 2 characters");
                                    else setNameError("");
                                }}
                            />
                            {nameError ? <Text style={styles.form__error}>{nameError}</Text> : null}
                        </View>
                        <View>
                            <FloatingInput
                                label="Email"
                                value={email}
                                onChangeText={(text) => { setEmail(text); emailRef.current = text; setEmailError(""); }}
                                onBlur={() => {
                                    const val = emailRef.current;
                                    if (!val.trim()) setEmailError("* Email is required");
                                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) setEmailError("* Invalid email format");
                                    else setEmailError("");
                                }}
                            />
                            {emailError ? <Text style={styles.form__error}>{emailError}</Text> : null}
                        </View>
                        <View>
                            <FloatingInput
                                label="New Password (optional)"
                                value={password}
                                secureText
                                onChangeText={(text) => { setPassword(text); passwordRef.current = text; setPasswordError(""); }}
                                onBlur={() => {
                                    const val = passwordRef.current;
                                    if (val.trim() && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(val)) {
                                        setPasswordError("* Min 6 chars, include letters and numbers");
                                    } else {
                                        setPasswordError("");
                                    }
                                }}
                            />
                            {passwordError ? <Text style={styles.form__error}>{passwordError}</Text> : null}
                        </View>
                        <View>
                            <FloatingInput
                                label="Phone Number"
                                value={phone}
                                onChangeText={(text) => { setPhone(text); phoneRef.current = text; setPhoneError(""); }}
                                onBlur={() => {
                                    const val = phoneRef.current;
                                    if (!val.trim()) setPhoneError("* Phone number is required");
                                    else if (!/^\+?\d{9,11}$/.test(val.replace(/\s/g, ""))) setPhoneError("* Invalid phone number (9-11 digits)");
                                    else setPhoneError("");
                                }}
                            />
                            {phoneError ? <Text style={styles.form__error}>{phoneError}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.saveBtn}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveBtn__text}>Save Changes</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
    },

    scroll: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        marginBottom: 24,
    },

    header__backBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: "#1e2640",
        alignItems: "center", justifyContent: "center",
    },

    header__title: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },

    avatarSection: {
        alignItems: "center",
        marginBottom: 32,
    },

    avatarSection__wrapper: {
        position: "relative",
        marginBottom: 16,
    },

    avatarSection__image: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },

    avatarSection__editBtn: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 26,
        height: 26,
        borderRadius: 16,
        backgroundColor: "#00BCD4",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#161D2F",
    },

    avatarSection__name: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "PoppinsBold",
        marginBottom: 2,
    },

    avatarSection__email: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },

    form: {
        marginBottom: 20,
        gap: 20,
    },

    form__error: {
        color: "#ff4d4d",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        marginTop: 6,
        marginLeft: 4,
    },

    saveBtn: {
        backgroundColor: "#00BCD4",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 20,
    },

    saveBtn__text: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
    },
});