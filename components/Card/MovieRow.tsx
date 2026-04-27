import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { IMAGE_URL } from "../../services/tmdb";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const GENRE_NAMES: Record<number, string> = {
    28: "Action", 35: "Comedy", 16: "Animation", 99: "Documentary",
    18: "Drama", 27: "Horror", 10749: "Romance", 53: "Thriller",
    878: "Sci-Fi", 14: "Fantasy", 12: "Adventure", 80: "Crime",
    10751: "Family", 36: "History", 10402: "Music", 9648: "Mystery",
    10752: "War", 37: "Western",
};

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
    runtime?: number;
    certification?: string;
};

type Props = {
    movie: Movie;
    onPress?: () => void;
};

export default function MovieRow({ movie, onPress }: Props) {
    const year = movie.release_date?.split("-")[0];
    const genre = GENRE_NAMES[movie.genre_ids?.[0]] || "Movie";
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("Detail", { movieId: movie.id })} 
            activeOpacity={0.8}
        >
            {/* Poster + Rating */}
            <View>
                <Image
                    source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
                    style={styles.card__poster}
                    resizeMode="cover"
                />
                <View style={styles.card__rating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.card__rating__text}>{movie.vote_average.toFixed(1)}</Text>
                </View>
            </View>

            {/* Info */}
            <View style={styles.card__info}>
                <View style={styles.card__badge}>
                    <Text style={styles.card__badge__text}>Premium</Text>
                </View>

                <Text style={styles.card__title} numberOfLines={2}>{movie.title}</Text>

                <View style={styles.card__row}>
                    <Feather name="calendar" size={13} color="#888" />
                    <Text style={styles.card__meta}>{year}</Text>
                </View>

                {(movie.runtime || movie.certification) ? (
                    <View style={styles.card__row}>
                        <Ionicons name="time-outline" size={13} color="#888" />
                        <Text style={styles.card__meta}>
                            {movie.runtime ? `${movie.runtime} Minutes` : "N/A"}
                        </Text>
                        {movie.certification ? (
                            <View style={styles.card__cert}>
                                <Text style={styles.card__cert__text}>{movie.certification}</Text>
                            </View>
                        ) : null}
                    </View>
                ) : null}

                <View style={styles.card__row}>
                    <Ionicons name="film-outline" size={13} color="#888" />
                    <Text style={styles.card__meta}>{genre}</Text>
                    <Text style={styles.card__divider}>|</Text>
                    <View style={styles.card__tag}>
                        <Text style={styles.card__tag__text}>Movie</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#1e2640",
        borderRadius: 16,
        padding: 12,
        marginHorizontal: 24,
        marginBottom: 12,
        gap: 12,
    },

    card__poster: {
        width: 100,
        height: 140,
        borderRadius: 12,
    },

    card__rating: {
        position: "absolute",
        top: 6,
        left: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
    },

    card__rating__text: {
        color: "#FFD700",
        fontSize: 11,
        fontFamily: "PoppinsBold",
    },

    card__info: {
        flex: 1,
        justifyContent: "center",
        gap: 6,
    },

    card__badge: {
        backgroundColor: "#FF6B35",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: "flex-start",
    },

    card__badge__text: {
        color: "#FFFFFF",
        fontSize: 11,
        fontFamily: "PoppinsBold",
    },

    card__title: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: "PoppinsBold",
    },

    card__row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    card__meta: {
        color: "#888",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        lineHeight: 16,
        marginRight: 4
    },

    card__divider: {
        color: "#444",
        fontSize: 12,
    },

    card__tag: {
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },

    card__tag__text: {
        color: "#888",
        fontSize: 11,
        fontFamily: "PoppinsRegular",
    },

    card__cert: {
        borderWidth: 1,
        borderColor: "#00e5ff",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 1,
    },

    card__cert__text: {
        color: "#00e5ff",
        fontSize: 10,
        fontFamily: "PoppinsBold",
    },
});