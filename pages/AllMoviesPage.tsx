import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tmdb } from "../services/tmdb";
import MovieRow from "../components/ui/Card/MovieRow";

const GENRE_MAP: Record<string, number> = {
    Comedy: 35,
    Animation: 16,
    Documentary: 99,
    Action: 28,
};

export default function AllMoviesPage() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { type, title, filters } = route.params;

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);

        const fetchMovies = async () => {
            try {

                // ================= ALL =================
                if (type === "All") {

                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p =>
                            tmdb.get("/movie/now_playing", {
                                params: { page: p }
                            })
                        )
                    );

                    setMovies(
                        pages.flatMap(res => res.data.results)
                    );
                }

                // ================= POPULAR =================
                else if (type === "Popular") {

                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p =>
                            tmdb.get("/movie/popular", {
                                params: { page: p }
                            })
                        )
                    );

                    setMovies(
                        pages.flatMap(res => res.data.results)
                    );
                }

                // ================= RECOMMENDED =================
                else if (type === "Recommended") {

                    const res = await tmdb.get("/movie/now_playing");

                    const firstId = res.data.results[0]?.id;

                    if (firstId) {

                        const pages = await Promise.all(
                            [1, 2, 3, 4, 5].map(p =>
                                tmdb.get(
                                    `/movie/${firstId}/recommendations`,
                                    {
                                        params: { page: p }
                                    }
                                )
                            )
                        );

                        setMovies(
                            pages.flatMap(res => res.data.results)
                        );
                    }
                }

                // ================= FILTER =================
                else if (type === "Filter") {

                    let endpoint = "/discover/movie";

                    let params: any = {
                        "vote_average.gte":
                            filters?.rating || undefined,

                        primary_release_year:
                            filters?.year || undefined,

                        vote_count_gte: 300,
                    };

                    // Popular
                    if (
                        !filters?.sort ||
                        filters?.sort === "popularity.desc"
                    ) {
                        params.sort_by = "popularity.desc";
                    }

                    // Top Rated
                    else if (
                        filters?.sort === "vote_average.desc"
                    ) {
                        params.sort_by = "vote_average.desc";
                    }

                    // Newest
                    else if (
                        filters?.sort === "primary_release_date.desc"
                    ) {
                        params.sort_by =
                            "primary_release_date.desc";
                    }

                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p =>
                            tmdb.get(endpoint, {
                                params: {
                                    ...params,
                                    page: p,
                                }
                            })
                        )
                    );

                    let results = pages.flatMap(
                        res => res.data.results
                    );

                    // bỏ phim trùng id
                    results = results.filter(
                        (movie: any, index: number, self: any[]) =>
                            index ===
                            self.findIndex(
                                (m: any) => m.id === movie.id
                            )
                    );

                    // Rating 6+, 7+, 8+, 9+
                    if (filters?.rating) {

                        results = results.filter(
                            (movie: any) =>
                                movie.vote_average >=
                                filters.rating
                        );

                        // sắp xếp tăng dần
                        results.sort(
                            (a: any, b: any) =>
                                a.vote_average -
                                b.vote_average
                        );
                    }

                    setMovies(results);
                }

                // ================= CATEGORY =================
                else {

                    const pages = await Promise.all(
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p =>
                            tmdb.get("/discover/movie", {
                                params: {
                                    with_genres:
                                        GENRE_MAP[type],
                                    page: p,
                                }
                            })
                        )
                    );

                    setMovies(
                        pages.flatMap(res => res.data.results)
                    );
                }

            } catch (e) {

                console.error(e);

            } finally {

                setLoading(false);
            }
        };

        fetchMovies();

    }, [type, filters]);

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top"]}
        >
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.header__backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={22}
                        color="#fff"
                    />
                </TouchableOpacity>

                <Text style={styles.header__title}>
                    {title}
                </Text>

                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 12 }}
            >
                {loading
                    ? (
                        <ActivityIndicator
                            color="#00e5ff"
                            style={{ marginTop: 40 }}
                        />
                    )
                    : movies.map(
                        (movie: any, index: number) => (
                            <MovieRow
                                key={`${movie.id}-${index}`}
                                movie={movie}
                            />
                        )
                    )
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
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#1e2640",
        alignItems: "center",
        justifyContent: "center",
    },

    header__title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },
});