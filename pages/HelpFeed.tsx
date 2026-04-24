import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";

const FAQS = [
    {
        question: "How do I search for a movie?",
        answer: "Tap the Search icon at the bottom navigation bar, then type the movie title in the search box. Results will appear instantly.",
    },
    {
        question: "Why can't I play the trailer?",
        answer: "Make sure you have a stable internet connection. Some trailers may not be available in your region.",
    },
    {
        question: "How do I update my profile?",
        answer: "Go to Profile tab, tap the edit icon next to your name, then update your information and press Save Changes.",
    },
    {
        question: "How do I log out?",
        answer: "Go to Profile tab and scroll down to find the Log Out button.",
    },
];

export default function HelpFeedback() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [feedback, setFeedback] = useState("");
    const [feedbackError, setFeedbackError] = useState("");

    const handleSend = () => {
        if (!feedback.trim()) {
            setFeedbackError("* Please enter your feedback before sending");
            return;
        }
        setFeedbackError("");
        setFeedback("");
        Alert.alert("Thank you!", "Your feedback has been sent successfully.");
    };

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
                    <Text style={styles.header__title}>Help & Feedback</Text>
                    <View style={{ width: 36 }} />
                </View>

                {/* FAQ */}
                <View style={styles.card}>
                    <Text style={styles.card__title}>Frequently Asked Questions</Text>
                    {FAQS.map((faq, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.faqItem, i === FAQS.length - 1 && { borderBottomWidth: 0 }]}
                            activeOpacity={0.7}
                            onPress={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            <View style={styles.faqItem__header}>
                                <Text style={styles.faqItem__question}>{faq.question}</Text>
                                <Ionicons
                                    name={openIndex === i ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color="#00e5ff"
                                />
                            </View>
                            {openIndex === i && (
                                <Text style={styles.faqItem__answer}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Feedback */}
                <View style={styles.card}>
                    <Text style={styles.card__title}>Send Feedback</Text>
                    <Text style={styles.card__subtitle}>
                        Have a suggestion or found a bug? Let us know!
                    </Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Write your feedback here..."
                        placeholderTextColor="#555"
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={feedback}
                        onChangeText={(text) => { setFeedback(text); setFeedbackError(""); }}
                    />
                    {feedbackError ? <Text style={styles.errorText}>{feedbackError}</Text> : null}
                    <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85} onPress={handleSend}>
                        <Text style={styles.sendBtn__text}>Send</Text>
                    </TouchableOpacity>
                </View>

                {/* Contact */}
                <View style={styles.card}>
                    <Text style={styles.card__title}>Contact Us</Text>
                    <View style={styles.contactItem}>
                        <View style={styles.contactItem__icon}>
                            <Ionicons name="mail-outline" size={20} color="#00e5ff" />
                        </View>
                        <Text style={styles.contactItem__text}>hau.121747@gmail.com</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <View style={styles.contactItem__icon}>
                            <Ionicons name="logo-github" size={20} color="#00e5ff" />
                        </View>
                        <Text style={styles.contactItem__text}>github.com/trunghau06</Text>
                    </View>
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
        marginBottom: 4,
    },

    card__subtitle: {
        color: "#888",
        fontSize: 13,
        fontFamily: "PoppinsRegular",
        marginBottom: 14,
    },

    faqItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(128,201,214,0.15)",
    },

    faqItem__header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },

    faqItem__question: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
        flex: 1,
        lineHeight: 20,
    },

    faqItem__answer: {
        color: "#aaa",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
        lineHeight: 20,
        marginTop: 8,
    },

    textArea: {
        backgroundColor: "#161D2F",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2a3250",
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
        padding: 16,
        minHeight: 120,
        marginBottom: 8,
    },

    errorText: {
        color: "#ff4d4d",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        marginBottom: 10,
        marginLeft: 4,
    },

    sendBtn: {
        backgroundColor: "#00BCD4",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 4,
    },

    sendBtn__text: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
    },

    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(128,201,214,0.15)",
    },

    contactItem__icon: {
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: "#2a365f",
        alignItems: "center",
        justifyContent: "center",
    },

    contactItem__text: {
        color: "#ccc",
        fontSize: 16,
        fontFamily: "PoppinsRegular",
    },
});