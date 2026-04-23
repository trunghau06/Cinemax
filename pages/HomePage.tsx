import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useAppSelector } from "../hooks/hooks";
import { selectUserName } from "../redux/user/useSelectors";
import { auth } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/Banner";
import { useCallback, useEffect, useRef, useState } from "react";
import { tmdb } from "../tmdb";
import Card from "../components/Card";
import CategoryFilter from "../components/CategoryFilter";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

const GENRE_MAP: Record<string, number> = {
    Comedy: 35, Animation: 16, Documentary: 99, Action: 28,
};

export default function HomePage() {
    const userName = useAppSelector(selectUserName);
    const [selectedCat, setSelectedCat] = useState("All");
    const [popular, setPopular] = useState<any[]>([]);
    const [categoryMovies, setCategoryMovies] = useState<any[]>([]);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const homeInputRef = useRef<TextInput>(null);

    useFocusEffect(
        useCallback(() => {
            homeInputRef.current?.clear();
        }, [])
    );

    const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
    const navigationRoot = useNavigation<StackNavigationProp<RootStackParamList>>();


    useEffect(() => {
        setLoadingPopular(true);
        tmdb.get("/movie/top_rated")
        .then(res => setPopular(res.data.results.slice(0, 10)))
        .finally(() => setLoadingPopular(false));
    }, []);

    useEffect(() => {
        setLoadingCategory(true);
        if (selectedCat === "All") {
            tmdb.get("/movie/now_playing")
            .then(res => setCategoryMovies(res.data.results))
            .finally(() => setLoadingCategory(false));
        } else {
            tmdb.get("/discover/movie", {
                params: { with_genres: GENRE_MAP[selectedCat] }
            })
            .then(res => setCategoryMovies(res.data.results))
            .finally(() => setLoadingCategory(false));
        }
    }, [selectedCat]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.header__left}>
                        {/* Avatar */}
                        <Image
                            source={
                                auth.currentUser?.photoURL
                                    ? { uri: auth.currentUser.photoURL }
                                    : require('../assets/HomePage/default_avatar.jpg')
                            }
                            style={styles.header__left__avatar}
                            resizeMode="cover"
                        />

                        {/* Name */}
                        <View>
                            <Text style={styles.header__left__name}>
                                {userName ? `Hello, ${userName}` : "Hello, User"}
                            </Text>
                            <Text style={styles.header__left__subtitle}>Let's stream your favourite movie</Text>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <Ionicons name="log-out-outline" size={28} color="#FF4D6D" />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <TouchableOpacity
                    style={styles.search}
                    activeOpacity={1}
                >
                    <Ionicons name="search-outline" size={18} color="#666" />
                    <TextInput
                        ref={homeInputRef}
                        style={{ color: "#666", flex: 1, fontFamily: "PoppinsRegular", fontSize: 14 }}
                        placeholder="Search a title.."
                        placeholderTextColor="#666"
                        onChangeText={(text) => {
                            if (text.length > 0) {
                                (navigation as any).navigate("Search", { initialQuery: text });
                            }
                        }}
                    />
                    <View style={styles.search__divider} />
                    <Ionicons name="options-outline" size={20} color="#fff" />
                </TouchableOpacity>

                {/* Banner */}
                <Banner />

                {/* Categories */}
                <Text style={styles.categories__title}>Categories</Text>
                <CategoryFilter selected={selectedCat} onSelect={setSelectedCat} />
                
                {loadingCategory
                    ? <ActivityIndicator color="#00e5ff" style={{ height: 232, justifyContent: "center" }} />
                    : <FlatList
                        data={categoryMovies}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 24, paddingTop: 12 }}
                        renderItem={({ item }) => (
                            <Card movie={item} onPress={() => {}} />
                        )}
                    />
                }

                {/* Most Popular */}
                <View style={styles.popular}>
                    <Text style={styles.popular__title}>Most Popular</Text>
                    <TouchableOpacity onPress={() => (navigationRoot as any).navigate("AllMovies", { type: "popular", title: "Most Popular" })}>
                        <Text style={styles.popular__text_all}>See All</Text>
                    </TouchableOpacity>
                </View>
                {loadingPopular
                    ? <ActivityIndicator color="#00e5ff" style={{ height: 232, justifyContent: "center" }} />
                    : <FlatList
                        data={popular}
                        horizontal
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 24, paddingTop: 12 }}
                        renderItem={({ item }) => (
                            <Card movie={item} onPress={() => {}} />
                        )}
                    />
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
        paddingBottom: 16
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        marginBottom: 12
    },

    header__left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    header__left__avatar: {
        width: 42,
        height: 42,
        borderRadius: 24,
        backgroundColor: "#1e2640",
    },

    header__left__name: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },

    header__left__subtitle: {
        color: "#888",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
    },

    search: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e2640",
        borderRadius: 28,
        paddingHorizontal: 16,
        height: 48,
        gap: 10,
        borderWidth: 1,
        marginHorizontal: 24,
        marginBottom: 24,
    },

    search__input: {
        flex: 1,
        color: "#fff",
        fontFamily: "PoppinsRegular",
        fontSize: 14,
    },

    search__divider: {
        width: 1,
        height: 20,
        backgroundColor: "#424244",
    },

    categories: {
        marginBottom: 8
    },

    categories__title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "PoppinsBold",
        paddingHorizontal: 24,
        marginBottom: 12,
    },

    categories__btn: {
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginRight: 10,
        minWidth: 80,
        alignItems: "center",
    },

    "categories__btn--active": {
        backgroundColor: "rgba(0, 229, 255, 0.15)",
    },

    categories__text: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },

    "categories__text--active": {
        color: "#00e5ff",
        fontFamily: "PoppinsBold",
    },

    popular: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24
    },

    popular__title: {
        fontSize: 20,
        fontFamily: 'PoppinsBold',
        color: '#FFFFFF'
    },

    popular__text_all: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#00e5ff'
    }
});