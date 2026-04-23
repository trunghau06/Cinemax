import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tmdb } from "../tmdb";
import MovieRow from "../components/MovieRow";

export default function AllMoviesPage() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const {type, title} = route.params;

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        const endpoint = type === "popular" ? "/movie/top_rated" : "/movie/now_playing";
        tmdb.get(endpoint)
            .then(async (res) => {
                const basic = res.data.results;
                const detailed = await Promise.all(
                    basic.slice(0, 20).map(async (movie: any) => {
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
                setMovies(detailed);
            })
            .finally(() => setLoading(false));
    }, [type]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.header__title}>{title}</Text>
                <View style={{width: 24}}></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 12}}>
                {loading
                    ? <ActivityIndicator color="#00e5ff" style={{marginTop: 40}} />
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
    header__title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "PoppinsBold",
        lineHeight: 16
    },
});