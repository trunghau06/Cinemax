import { Feather, FontAwesome6, Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../hooks/hooks";
import { selectUserName } from "../redux/user/useSelectors";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import LogoutModal from "../components/LogOutModal";

export default function Profile() {
    const userName = useAppSelector(selectUserName);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogOut = async () => {
        await auth.signOut();
        setShowLogoutModal(false);
        navigation.navigate("LogSign");
    }

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.header__title}>Profile</Text>
                </View>

                <View style={styles.cardUser}>
                    <Image style={styles.cardUser__avatar} source={require('../assets/HomePage/default_avatar.jpg')} resizeMode="cover"/>
                    <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
                        <Text style={styles.cardUser__name}>
                            {userName ? `${userName}` : "UserName"}
                        </Text>
                        <Text style={styles.cardUser__email}>
                            {auth.currentUser?.email ?? "UserEmail"}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                        <Feather name="edit" size={20} color="#00e5ff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardComponent}>
                    <Text style={styles.cardComponent__title}>Account</Text>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.card__content}>
                            <View style={styles.card__content__icon}>
                                <Ionicons name="lock-closed-outline" size={20} color="#00e5ff" />
                            </View>
                            <Text style={styles.card__content__title}>Change Password</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={32} color="#00e5ff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardComponent}>
                    <Text style={styles.cardComponent__title}>More</Text>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Privacy")}>
                        <View style={styles.card__content}>
                            <View style={styles.card__content__icon}>
                                <FontAwesome6 name="shield" size={20} color="#00e5ff" />
                            </View>
                            <Text style={styles.card__content__title}>Legal and Policies</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={32} color="#00e5ff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("HelpFeed")}>
                        <View style={styles.card__content}>
                            <View style={styles.card__content__icon}>
                                <Ionicons name="help-circle-sharp" size={28} color="#00e5ff" />
                            </View>
                            <Text style={styles.card__content__title}>Help & Feedback</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={32} color="#00e5ff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Aboutus")}>
                        <View style={styles.card__content}>
                            <View style={styles.card__content__icon}>
                                <Foundation name="info" size={28} color="#00e5ff" />
                            </View>
                            <Text style={styles.card__content__title}>About us</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={32} color="#00e5ff" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn__logOut} onPress={() => setShowLogoutModal(true)}>
                    <Text style={styles.btn__logOut__text}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
            <LogoutModal
                visible={showLogoutModal}
                onConfirm={handleLogOut}
                onCancel={() => setShowLogoutModal(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
        paddingBottom: 16,
    },

    header: {
        paddingHorizontal: 24,
    },

    header__title: {
        textAlign: 'center',
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: "PoppinsBold",
    },

    cardUser: {
        backgroundColor: "#1e2640",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "rgba(0, 229, 255, 0.1)",
    },

    cardUser__avatar: {
        width: 42,
        height: 42,
        borderRadius: 24,
        backgroundColor: "#1e2640",
    },

    cardUser__name: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },

    cardUser__email: {
        color: "#888",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
    },

    cardComponent: {
        backgroundColor: "#1e2640",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "rgba(0, 229, 255, 0.1)",
    },

    cardComponent__title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "PoppinsRegular",
        marginBottom: 12,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        borderBottomColor: "rgba(128, 201, 214, 0.3)",
        borderBottomWidth: 1,
    },

    card__content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    card__content__icon: {
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#2a365f",
        alignItems: "center",
        justifyContent: "center",
    },

    card__content__title: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
        lineHeight: 20,
    },

    btn__logOut: {
        backgroundColor: "#1e2640",
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginHorizontal: 24,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#f87373",
        justifyContent: 'center',
    },

    btn__logOut__text: {
        textAlign: 'center',
        color: '#f87373',
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
    },
});