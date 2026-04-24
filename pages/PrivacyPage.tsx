import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../types/navigation";

const SECTIONS = [
    {
        title: "Terms",
        paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
        ],
    },
    {
        title: "Changes to the Service and/or Terms:",
        paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
        ],
    },
];

export default function Privacy() {
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
                    <Text style={styles.header__title}>Privacy Policy</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* Content */}
                {SECTIONS.map((section, i) => (
                    <View key={i} style={styles.section}>
                        <Text style={styles.section__title}>{section.title}</Text>
                        {section.paragraphs.map((p, j) => (
                            <Text key={j} style={styles.section__body}>{p}</Text>
                        ))}
                    </View>
                ))}
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

    section: {
        marginBottom: 24,
    },

    section__title: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsBold",
        marginBottom: 8,
    },

    section__body: {
        color: "#aaa",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        lineHeight: 22,
        marginBottom: 8,
    },
});