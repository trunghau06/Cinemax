import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGE_URL } from "../services/tmdb";
import { useAppDispatch } from "../hooks/hooks";
import { removeWishList } from "../redux/wishList/wishSlice";

interface Props {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        genres?: { name: string }[];
    };
    onPress: () => void;
}

export default function WishlistCard({ movie, onPress }: Props) {
    const dispatch = useAppDispatch();

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.card__thumbnail}>
                <Image
                    source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
                    style={styles.card__thumbnail__image}
                    resizeMode="cover"
                />
                <View style={styles.card__thumbnail__play}>
                    <Ionicons name="play" size={20} color="#fff" />
                </View>
            </View>

            <View style={styles.card__info}>
                <Text style={styles.card__info__genre}>
                    {movie.genres?.[0]?.name ?? "Movie"}
                </Text>
                <Text style={styles.card__info__title} numberOfLines={2}>
                    {movie.title}
                </Text>
                <View style={styles.card__info__meta}>
                    <Text style={styles.card__info__meta__type}>Movie</Text>
                    <Ionicons name="star" size={13} color="#FFD700" />
                    <Text style={styles.card__info__meta__rating}>
                        {movie.vote_average.toFixed(1)}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.card__heart}
                onPress={() => dispatch(removeWishList(movie.id))}
            >
                <Ionicons name="heart" size={22} color="#FF4D6D" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e2640",
        borderRadius: 16,
        marginHorizontal: 24,
        marginBottom: 12,
        padding: 10,
        gap: 12,
    },

    card__thumbnail: {
        width: 120,
        height: 80,
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },

    card__thumbnail__image: {
        ...StyleSheet.absoluteFillObject,
    },

    card__thumbnail__play: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    card__info: {
        flex: 1,
        gap: 4,
    },

    card__info__genre: {
        color: "#888",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
    },

    card__info__title: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "PoppinsBold",
        lineHeight: 20,
        marginVertical: 4
    },

    card__info__meta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    card__info__meta__type: {
        color: "#888",
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "PoppinsRegular",
    },

    card__info__meta__rating: {
        color: "#FFD700",
        fontSize: 12,
        fontFamily: "PoppinsBold",
        lineHeight: 16,
    },

    card__heart: {
        padding: 4,
    },
});