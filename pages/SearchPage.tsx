import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryFilter from "../components/CategoryFilter";
import MovieRow from "../components/MovieRow";
import { useState, useEffect, useCallback, useRef } from "react";
import { tmdb } from "../services/tmdb";
import Card from "../components/Card";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

const GENRE_MAP: Record<string, number> = {
    Comedy: 35, Animation: 16, Documentary: 99, Action: 28,
};

export default function SearchPage() {
    const navigation = useNavigation();
    const navigationRoot = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [selectedCat, setSelectedCat] = useState("All");
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [recommended, setRecommended] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const route = useRoute<any>();

    useEffect(() => {
        if (movies.length === 0) return;
        tmdb.get(`/movie/${movies[0].id}/recommendations`)
            .then(res => setRecommended(res.data.results.slice(0, 10)));
    }, [movies.length > 0 ? movies[0]?.id : null]);

    useEffect(() => {
        setLoading(true);
        if (selectedCat === "All") {
            tmdb.get("/movie/now_playing")
                .then(res => setMovies(res.data.results))
                .finally(() => setLoading(false));
        } else {
            tmdb.get("/discover/movie", {
                params: { with_genres: GENRE_MAP[selectedCat] }
            })
                .then(res => setMovies(res.data.results))
                .finally(() => setLoading(false));
        }
    }, [selectedCat]);

    useEffect(() => {
        if (movies.length === 0) return;
        const firstMovie = movies[0];
        Promise.all([
            tmdb.get(`/movie/${firstMovie.id}`),
            tmdb.get(`/movie/${firstMovie.id}/release_dates`)
        ]).then(([detailRes, certRes]) => {
            const runtime = detailRes.data.runtime;
            const us = certRes.data.results.find((r: any) => r.iso_3166_1 === "US");
            const cert = us?.release_dates?.[0]?.certification || "";
            setMovies(prev => prev.map((m, i) =>
                i === 0 ? { ...m, runtime, certification: cert } : m
            ));
        });
    }, [movies.length > 0 ? movies[0]?.id : null]);

    useFocusEffect(
        useCallback(() => {
            if (route.params?.initialQuery) {
                setQuery(route.params.initialQuery);
                setTimeout(() => inputRef.current?.focus(), 100);
            } else {
                setQuery('');
            }
            return () => {
                navigation.setParams({ initialQuery: undefined } as any);
            };
        }, [route.params?.initialQuery])
    );

    useEffect(() => {
        if (!query.trim()) {
            setSearchResults([]);
            setSearchLoading(false);
            return;
        }
        setSearchLoading(true);
        const timer = setTimeout(async () => {
            try {
                const res = await tmdb.get("/search/movie", { params: { query } });
                const basicResults = res.data.results;
                const detailed = await Promise.all(
                    basicResults.slice(0, 10).map(async (movie: any) => {
                        try {
                            const [detailRes, certRes] = await Promise.all([
                                tmdb.get(`/movie/${movie.id}`),
                                tmdb.get(`/movie/${movie.id}/release_dates`)
                            ]);
                            const runtime = detailRes.data.runtime;
                            const us = certRes.data.results.find((r: any) => r.iso_3166_1 === "US");
                            const cert = us?.release_dates?.[0]?.certification || "";
                            return { ...movie, runtime, certification: cert };
                        } catch {
                            return movie;
                        }
                    })
                );
                setSearchResults(detailed);
            } finally {
                setSearchLoading(false);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (route.params?.initialQuery) {
            setQuery(route.params.initialQuery);
        }
    }, [route.params?.initialQuery]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* Search */}
            <View style={styles.search__wrapper}>
                <View style={styles.search}>
                    <Ionicons name="search-outline" size={18} color="#666" />
                    <TextInput
                        ref={inputRef}
                        style={styles.search__input}
                        placeholder="Type title, categories, years, etc"
                        placeholderTextColor="#666"
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => setQuery("")}
                    disabled={query.length === 0}
                >
                    <Text style={[styles.cancel, query.length > 0 && styles["cancel--active"]]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {query.length > 0 ? (
                    searchLoading
                        ? <ActivityIndicator color="#00e5ff" style={{ marginTop: 40 }} />
                        : searchResults.length === 0
                            ? (
                                <View style={styles.empty}>
                                    <Image
                                        source={require('../assets/SearchPage/image_search_noresult.png')}
                                        style={{ width: 120, height: 120 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.empty__title}>We Are Sorry, We Can{"\n"}Not Find The Movie :(</Text>
                                    <Text style={styles.empty__subtitle}>Find your movie by Type title,{"\n"}categories, years, etc</Text>
                                </View>
                            )
                            : searchResults.map(movie => (
                                <MovieRow key={movie.id} movie={movie} onPress={() => {}} />
                            ))
                ) : (
                    <>
                        <CategoryFilter selected={selectedCat} onSelect={setSelectedCat} />
                        <Text style={styles.section__title}>Today</Text>

                        {loading
                            ? <ActivityIndicator color="#00e5ff" style={{ marginTop: 40 }} />
                            : movies.slice(0, 1).map(movie => (
                                <MovieRow key={movie.id} movie={movie} onPress={() => {}} />
                            ))
                        }

                        <View style={styles.recommend}>
                            <Text style={styles.recommend__title}>Recommended</Text>
                            <TouchableOpacity onPress={() => navigationRoot.navigate("AllMovies", {
                                type: "Recommended",
                                title: "Recommended",
                            })}>
                                <Text style={styles.recommend__text_all}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={recommended}
                            horizontal
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 24, paddingTop: 12, paddingBottom: 16 }}
                            renderItem={({ item }) => (
                                <Card movie={item} onPress={() => {}} />
                            )}
                        />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
        paddingBottom: 16,
    },

    search__wrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 24,
        marginBottom: 24,
        marginTop: 16,
        gap: 0,
    },

    search: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e2640",
        borderRadius: 28,
        paddingHorizontal: 16,
        height: 48,
        gap: 10,
        borderWidth: 1,
        marginHorizontal: 24,
        marginRight: 8,
    },

    cancel: {
        color: "#444",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },

    "cancel--active": {
        color: "#00e5ff",
    },

    search__input: {
        flex: 1,
        color: "#FFFFFF",
        fontFamily: "PoppinsRegular",
        fontSize: 14,
    },

    section__title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "PoppinsBold",
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 12,
    },

    recommend: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },

    recommend__title: {
        fontSize: 20,
        fontFamily: 'PoppinsBold',
        color: '#FFFFFF',
    },

    recommend__text_all: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#00e5ff',
    },

    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        gap: 12,
    },

    empty__icon: {
        fontSize: 64,
    },

    empty__title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "PoppinsBold",
        textAlign: "center",
    },

    empty__subtitle: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        textAlign: "center",
    },
});