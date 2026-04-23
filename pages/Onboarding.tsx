import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type OnboardingItem = {
    id: number;
    image: any;
    title: string;
    description: string;
    showBadge?: boolean;
    rating?: string;
    duration?: string;
};

const { width, height } = Dimensions.get("window");

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    image: require("../assets/Onboarding/image_onboarding_3.png"),
    title: "Discover Amazing Movies",
    description: "Explore thousands of movies and TV shows. Find your next favorite film with personalized recommendations.",
    showBadge: false,
  },
  {
    id: 2,
    image: require("../assets/Onboarding/image_onboarding_1.jpg"),
    title: "Watch Anytime, Anywhere",
    description: "Stream your favorite content on any device. Download and watch offline whenever you want.",
    showBadge: false,
  },
  {
    id: 3,
    image: require("../assets/Onboarding/image_onboarding_2.jpg"),
    title: "Enjoy the Best Experience",
    description: "Get ratings, reviews, and trailers. Build your watchlist and never miss a great movie again.",
    showBadge: true,
    rating: "9/10",
    duration: "1h 20m",
  },
];

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const current = onboardingData[currentIndex];

    const handleNext = async () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            await AsyncStorage.setItem("onboardingDone", "true");
            navigation.replace("Splash");
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                {currentIndex > 0 ? (
                    <TouchableOpacity style={styles.header__backBtn} onPress={handleBack}>
                        <Ionicons name="chevron-back" size={24} color="#00e5ff" />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>

            {/* Image */}
            <View style={styles.image}>
                <View style={styles.image__container}>
                    <Image
                        source={current.image}
                        resizeMode="cover"
                        style={styles.image__img}
                    />
                </View>

                {current.showBadge && (
                    <>
                        <View style={[styles.badge, styles["badge--left"]]}>
                            <Ionicons name={"star" as any} size={14} color="#00e5ff" />
                            <Text style={styles.badge__label}>Rating</Text>
                            <Text style={styles.badge__value}>{current.rating}</Text>
                        </View>
                        <View style={[styles.badge, styles["badge--right"]]}>
                            <Ionicons name={"time-outline" as any} size={14} color="#00e5ff" />
                            <Text style={styles.badge__label}>Duration</Text>
                            <Text style={styles.badge__value}>{current.duration}</Text>
                        </View>
                    </>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.content__title}>{current.title}</Text>
                <Text style={styles.content__description}>{current.description}</Text>
            </View>

            {/* Bottom */}
            <View style={styles.bottom}>
                <View style={styles.bottom__dots}>
                    {onboardingData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.bottom__dot,
                                currentIndex === index && styles["bottom__dot--active"],
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleNext} activeOpacity={0.8}>
                    <View style={[
                        styles.nextBtn__outer,
                        {
                            borderTopWidth: 1.5,
                            borderLeftWidth: 1.5,
                            borderBottomWidth: currentIndex >= 1 ? 1.5 : 0,
                            borderRightWidth: currentIndex >= 2 ? 1.5 : 0,
                        }
                    ]}>
                        <View style={styles.nextBtn}>
                            <MaterialIcons name={"navigate-next" as any} size={26} color="#161D2F" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
    },

    // Header
    header: {
        paddingHorizontal: 24,
        paddingTop: 8,
        height: 44,
        justifyContent: "center",
        marginBottom: 24,
    },
    header__backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        alignSelf: "flex-start",
    },

    // Image
    image: {
        width: width,
        alignSelf: "center",
        marginTop: 0,
    },
    image__container: {
        height: height * 0.42,
        borderRadius: 24,
        overflow: "hidden",
    },
    image__img: {
        width: "100%",
        height: "100%",
    },

    // Badge
    badge: {
        position: "absolute",
        backgroundColor: "#0f0f1e",
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
        gap: 2,
        minWidth: 75,
    },
    "badge--left": {
        top: -16,
        left: 0,
    },
    "badge--right": {
        top: 52,
        right: 0,
    },
    badge__label: {
        color: "#888",
        fontSize: 11,
        marginTop: 2,
        fontFamily: "PoppinsRegular",
    },
    badge__value: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "PoppinsBold",
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 36,
        alignItems: "center",
    },
    content__title: {
        color: "#ffffff",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 14,
        lineHeight: 32,
        fontFamily: "PoppinsBold",
    },
    content__description: {
        color: "#888",
        fontSize: 14,
        textAlign: "center",
        lineHeight: 22,
        fontFamily: "PoppinsRegular",
    },

    // Bottom
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingBottom: 40,
    },
    bottom__dots: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    bottom__dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#2a2a4a",
    },
    "bottom__dot--active": {
        width: 28,
        borderRadius: 4,
        backgroundColor: "#00e5ff",
    },

    // Next button
    nextBtn__outer: {
        width: 62,
        height: 62,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#00e5ff",
    },
    nextBtn: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: "#00e5ff",
        alignItems: "center",
        justifyContent: "center",
    },
});