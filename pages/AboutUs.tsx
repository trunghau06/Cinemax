import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { RootStackParamList } from "../types/navigation";

const TEAM = [
    {
        name: "Trung Hau",
        role: "Software Engineering, Sophomore - K20",
        avatar: require('../assets/Aboutus/anhUser.jpg'), 
    },
];

const FEATURES = [
    { icon: "film-outline", label: "Browse thousands of movies & TV shows" },
    { icon: "search-outline", label: "Smart search with instant results" },
    { icon: "play-circle-outline", label: "Watch trailers with video playback" },
    { icon: "person-outline", label: "Personalized profile & preferences" },
];

export default function AboutUs() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
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
                    <Text style={styles.header__title}>About Us</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* App info */}
                <View style={styles.appInfo}>
                    <View style={styles.appInfo__logoWrapper}>
                        <Ionicons name="film" size={40} color="#00e5ff" />
                    </View>
                    <Text style={styles.appInfo__name}>CINEMAX</Text>
                    <Text style={styles.appInfo__version}>Version 1.0.0</Text>
                    <Text style={styles.appInfo__desc}>
                        Your ultimate movie companion. Discover, explore, and enjoy the world of cinema at your fingertips.
                    </Text>
                </View>

                {/* Team */}
                <View style={styles.card}>
                    <Text style={styles.card__title}>Developer</Text>
                    {TEAM.map((member, i) => (
                        <View key={i} style={styles.memberItem}>
                            <Image source={member.avatar} style={styles.memberItem__avatar} resizeMode="cover" />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.memberItem__name}>{member.name}</Text>
                                <Text style={styles.memberItem__role}>{member.role}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Features */}
                <View style={styles.card}>
                    <Text style={styles.card__title}>What We Offer</Text>
                    {FEATURES.map((f, i) => (
                        <View key={i} style={styles.featureItem}>
                            <View style={styles.featureItem__icon}>
                                <Ionicons name={f.icon as any} size={20} color="#00e5ff" />
                            </View>
                            <Text style={styles.featureItem__text}>{f.label}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
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

    appInfo: {
        alignItems: "center",
        marginBottom: 28,
    },

    appInfo__logoWrapper: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: "#1e2640",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(0,229,255,0.2)",
        marginBottom: 12,
    },

    appInfo__name: {
        color: "#fff",
        fontSize: 26,
        fontFamily: "PoppinsBold",
        letterSpacing: 3,
    },

    appInfo__version: {
        color: "#00e5ff",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        marginBottom: 12,
    },

    appInfo__desc: {
        color: "#aaa",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        lineHeight: 22,
        textAlign: "center",
    },

    card: {
        backgroundColor: "#1e2640",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(0,229,255,0.1)",
    },

    card__title: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsBold",
        marginBottom: 16,
    },

    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(128,201,214,0.15)",
    },

    featureItem__icon: {
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#2a365f",
        alignItems: "center",
        justifyContent: "center",
    },

    featureItem__text: {
        color: "#ccc",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        flex: 1,
        lineHeight: 20,
    },

    memberItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    memberItem__avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },

    memberItem__name: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },

    memberItem__role: {
        color: "#00e5ff",
        fontSize: 13,
        fontFamily: "PoppinsRegular",
    },
});