import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tmdb } from "../services/tmdb";
import MovieRow from "../components/Card/MovieRow";

const GENRE_MAP: Record<string, number> = {
    Comedy: 35, Animation: 16, Documentary: 99, Action: 28,
};

export default function AllMoviesPage() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { type, title } = route.params;

    const [loading, setLoading] = useState(false);
    const [movies, setMovies]   = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);

        const fetchMovies = async () => {
            try {
                if (type === "All") {
                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5].map(p => tmdb.get("/movie/now_playing", { params: { page: p } }))
                    );
                    setMovies(pages.flatMap(res => res.data.results));
                } else if (type === "Popular") {
                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5].map(p => tmdb.get("/movie/top_rated", { params: { page: p } }))
                    );
                    setMovies(pages.flatMap(res => res.data.results));
                } else if (type === "Recommended") {
                    const res = await tmdb.get("/movie/now_playing");
                    const firstId = res.data.results[0]?.id;
                    if (firstId) {
                        const recRes = await tmdb.get(`/movie/${firstId}/recommendations`);
                        setMovies(recRes.data.results);
                    }
                } else {
                    const res = await tmdb.get("/discover/movie", { params: { with_genres: GENRE_MAP[type] } });
                    setMovies(res.data.results);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [type]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.header__title}>{title}</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 12 }}>
                {loading
                    ? <ActivityIndicator color="#00e5ff" style={{ marginTop: 40 }} />
                    : movies.map((movie: any) => (
                        <MovieRow key={movie.id} movie={movie} />
                    ))
                }
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

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },

    header__backBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: "#1e2640",
        alignItems: "center", justifyContent: "center",
    },

    header__title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },
});