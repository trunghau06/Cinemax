import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { tmdb, IMAGE_URL } from "../services/tmdb";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addWishList, removeWishList } from "../redux/features/wishList/wishSlice";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabParamList, RootStackParamList } from "../types/navigation";
import { addDownload, removeDownload, updateProgress } from "../redux/features/download/downloadSlice";

export default function DetailPage() {
    const route = useRoute<any>();
    const navigation  = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { movieId } = route.params;
    const dispatch = useAppDispatch();

    const [movie, setMovie] = useState<any>(null);
    const [certification, setCertification] = useState("");
    const [playing, setPlaying]   = useState(false);
    const [showMore, setShowMore] = useState(false);

    const wishes = useAppSelector(state => state.wishList.movies);
    const isWish = wishes.some((m: any) => m.id === movieId);
    const downloads = useAppSelector(state => state.download.movies);
    const isDownloaded = downloads.some(m => m.id === movie?.id);

    useEffect(() => {
        Promise.all([
            tmdb.get(`/movie/${movieId}`),
            tmdb.get(`/movie/${movieId}/release_dates`)
        ]).then(([movieRes, certRes]) => {
            setMovie(movieRes.data);
            const us = certRes.data.results.find((r: any) => r.iso_3166_1 === "US");
            setCertification(us?.release_dates?.[0]?.certification || "");
        });
    }, [movieId]);

    if (!movie) return (
        <View style={styles.loading}>
            <ActivityIndicator color="#00e5ff" size="large" />
        </View>
    );

    if (playing) return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <WebView
                source={{ uri: `https://vidsrc.me/embed/movie?tmdb=${movieId}` }}
                style={{ flex: 1 }}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
            />
            <TouchableOpacity style={styles.back} onPress={() => setPlaying(false)}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    const toggleWish = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "users", user.uid, "wishlist", movie.id.toString());

        if (isWish) {
            dispatch(removeWishList(movie.id));
            await deleteDoc(ref);
        } else {
            const item = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                genres: movie.genres,
            };
            dispatch(addWishList(item));
            await setDoc(ref, item);
        }
    };

    const fakeDownload = (id: number, uid: string) => {
        let progress = 0;

        const interval = setInterval(async () => {
            progress += Math.floor(Math.random() * 10) + 5;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }

            const status = progress >= 100 ? "completed" : "downloading";
            dispatch(updateProgress({ id, progress, status }));

            const ref = doc(db, "users", uid, "downloads", id.toString());
            await setDoc(ref, { progress, status }, { merge: true }); 
        }, 500);
    };

    const handleDownload = async () => {
        const user = auth.currentUser;
        if(!user) return;

        const ref = doc(db, "users", user.uid, "downloads", movie.id.toString());
        const exists = downloads.some(m => m.id === movie.id);

        if(exists) {
            dispatch(removeDownload(movie.id));
            await deleteDoc(ref);
        } else {
            const item = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average, 
                genres: movie.genres,
                type: "Movie",                   
                progress: 0,
                status: "downloading" as const,
            };

            dispatch(addDownload(item));
            await setDoc(ref, item);
            fakeDownload(movie.id, user.uid);
            navigation.navigate("Home", {
                screen: "Download",
            });
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` }}
                style={styles.backdrop}
                resizeMode="cover"
                blurRadius={8}
            />
            <View style={styles.backdrop__overlay} />

            <SafeAreaView edges={["top"]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.header__back} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.header__back, { position: "relative", overflow: "visible" }]}
                        onPress={() => navigation.navigate("WishList")}
                    >
                        <Ionicons name="heart" size={24} color="#FF4D6D" />
                        {wishes.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badge__text}>{wishes.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.poster__wrapper}>
                    <Image
                        source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
                        style={styles.poster}
                        resizeMode="cover"
                    />
                </View>

                <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>

                <View style={styles.meta}>
                    <Feather name="calendar" size={13} color="#888" />
                    <Text style={styles.meta__text}>{movie.release_date?.split("-")[0]}</Text>
                    <Text style={styles.meta__divider}>|</Text>
                    <Ionicons name="time-outline" size={13} color="#888" />
                    <Text style={styles.meta__text}>{movie.runtime} Minutes</Text>
                    <Text style={styles.meta__divider}>|</Text>
                    <Ionicons name="film-outline" size={13} color="#888" />
                    <Text style={styles.meta__text}>{movie.genres?.[0]?.name || "Movie"}</Text>
                </View>

                <View style={styles.rating}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating__text}>{movie.vote_average.toFixed(1)}</Text>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttons__play} onPress={() => setPlaying(true)}>
                        <Ionicons name="play" size={18} color="#fff" />
                        <Text style={styles.buttons__play__text}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.buttons__icon,
                            isDownloaded && { opacity: 0.3 }
                        ]}
                        onPress={handleDownload}
                        disabled={isDownloaded}
                    >
                        <Feather name="download" size={20} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons__icon} onPress={toggleWish}>
                        <Ionicons
                            name={isWish ? "heart" : "heart-outline"}
                            size={20}
                            color="#FF4D6D"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons__icon}>
                        <MaterialIcons name="open-in-new" size={20} color="#00e5ff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.section__title}>Story Line</Text>
                    <Text style={styles.overview} numberOfLines={showMore ? undefined : 4}>
                        {movie.overview}
                    </Text>
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                        <Text style={styles.more}>{showMore ? "Less" : "More"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161D2F",
    },
    
    loading: {
        flex: 1,
        backgroundColor: "#161D2F",
        justifyContent: "center",
        alignItems: "center",
    },

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
    },

    backdrop__overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 400,
        backgroundColor: "rgba(22,29,47,0.7)",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 0,
    },

    header__back: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
    },

    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#00e5ff",
        borderRadius: 8,
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    badge__text: {
        color: "#fff",
        fontSize: 10,
        fontFamily: "PoppinsBold",
    },

    poster__wrapper: {
        alignItems: "center",
        marginTop: 16,
        marginBottom: 24,
    },

    poster: {
        width: 200,
        height: 280,
        borderRadius: 16,
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "PoppinsBold",
        textAlign: "center",
        paddingHorizontal: 32,
        marginBottom: 12,
        marginTop: 12,
    },

    meta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 12,
    },

    meta__text: {
        color: "#888",
        fontSize: 13,
        fontFamily: "PoppinsRegular",
        lineHeight: 18,
    },

    meta__divider: {
        color: "#444",
        fontSize: 13,
        lineHeight: 18,
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginBottom: 24,
    },

    rating__text: {
        color: "#FFD700",
        fontSize: 16,
        fontFamily: "PoppinsBold",
        lineHeight: 20,
    },

    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginBottom: 32,
        paddingHorizontal: 24,
    },

    buttons__play: {
        paddingHorizontal: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6B35",
        borderRadius: 28,
        height: 52,
        gap: 8,
    },

    buttons__play__text: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },

    buttons__icon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#1e2640",
        alignItems: "center",
        justifyContent: "center",
    },

    back: {
        position: "absolute",
        top: 48,
        left: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 20,
        padding: 8,
    },

    section: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },

    section__title: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "PoppinsBold",
        marginBottom: 10,
    },

    overview: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        lineHeight: 22,
    },

    more: {
        color: "#00e5ff",
        fontSize: 14,
        fontFamily: "PoppinsBold",
        marginTop: 6,
    },
});