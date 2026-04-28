import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGE_URL } from "../../../services/tmdb";

interface Props {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        vote_average?: number;
        progress: number;
        genres?: { id: number; name: string }[];
        status?: "downloading" | "completed";
    };
    onPress?: () => void;
    selectMode?: boolean;
    selected?: boolean;
    onSelect?: () => void;
}

export default function DownloadCard({ movie, onPress, selectMode, selected, onSelect }: Props) {
    const isDone = movie.progress >= 100;

    return (
        <View style={styles.wrapper}>
            {selectMode && (
                <TouchableOpacity onPress={onSelect} style={styles.radio}>
                    <Ionicons
                        name={selected ? "radio-button-on" : "radio-button-off"}
                        size={22}
                        color={selected ? "#00e5ff" : "#888"}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.card}
                onPress={selectMode ? onSelect : onPress}
                activeOpacity={0.85}
            >
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

                    {isDone ? (
                        <View style={styles.card__info__meta}>
                            <Text style={styles.card__info__meta__type}>Movie</Text>
                            <Ionicons name="star" size={13} color="#FFD700" />
                            <Text style={styles.card__info__meta__rating}>
                                {movie.vote_average?.toFixed(1) || "4.5"}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${movie.progress}%` },
                                    ]}
                                />
                            </View>

                            <Text style={styles.progressText}>
                                {movie.progress}%
                            </Text>
                        </>
                    )}
                </View>

                {isDone && (
                    <Text style={styles.percentDone}>100%</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    radio: {
        marginLeft: 16,
        marginRight: 8,
    },

    card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e2640",
        borderRadius: 16,
        padding: 10,
        gap: 12,
        height: 100,
        marginRight: 24,
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
        marginVertical: 4,
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
        lineHeight: 16,
        fontFamily: "PoppinsBold",
        includeFontPadding: false,
        textAlignVertical: "center",
    },

    progressBar: {
        height: 6,
        backgroundColor: "#333",
        borderRadius: 4,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#00e5ff",
    },

    progressText: {
        color: "#888",
        fontSize: 12,
        marginTop: 4,
    },

    percentDone: {
        color: "#00e5ff",
        fontSize: 14,
        fontFamily: "PoppinsBold",
    },
});