import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { IMAGE_URL } from "../../services/tmdb";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

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
}

type Props = {
    movie: Movie;
    onPress?: () => void;
}

export default function Card({ movie }: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { movieId: movie.id })}
        >
            <Image 
                source={{ uri: `${IMAGE_URL}${movie.poster_path}`}}
                resizeMode="cover"
                style={styles.card__poster}
            />
            <View style={styles.card__rating}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.card__ratingText}>
                    {movie.vote_average.toFixed(1)}
                </Text>
            </View>
            <Text numberOfLines={1} style={styles.card__title}>{movie.title}</Text>
            <Text numberOfLines={1} style={styles.card__genre}>{GENRE_NAMES[movie.genre_ids[0]] || "Movie"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        marginRight: 12
    },

    card__poster: {
        width: 140,
        height: 200,
        borderRadius: 12,
        marginBottom: 8,
    },

    card__rating: {
        position: "absolute",
        top: 4,
        right: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    card__ratingText: {
        color: "#FFD700",
        fontSize: 12,
        fontFamily: "PoppinsBold",
    },

    card__title: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "PoppinsBold",
    },
    
    card__genre: {
        color: "#888",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
        marginTop: 2,
    }
});