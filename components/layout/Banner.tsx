import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { tmdb, IMAGE_URL } from "../../services/tmdb";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

const { width } = Dimensions.get("window");
const SIDE_PADDING = 32;
const ITEM_WIDTH = width - SIDE_PADDING * 2;
const GAP = 12;
const SNAP_INTERVAL = ITEM_WIDTH + GAP;

type Movie = {
    id: number;
    title: string;
    backdrop_path: string;
    release_date: string;
};

export default function BannerSlider() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        tmdb.get("/movie/now_playing").then(res => {
            setMovies(res.data.results.slice(0, 5));
        });
    }, []);

    useEffect(() => {
        if (movies.length === 0) return;

        const timer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % movies.length;
            flatListRef.current?.scrollToOffset({
                offset: nextIndex * SNAP_INTERVAL,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 3000);

        return () => clearInterval(timer);
    }, [activeIndex, movies]);

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={movies}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                snapToInterval={SNAP_INTERVAL}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / SNAP_INTERVAL);
                    setActiveIndex(index);
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.banner,
                            {
                                marginLeft: index === 0 ? SIDE_PADDING : GAP,
                                marginRight: index === movies.length - 1 ? SIDE_PADDING : 0,
                            }
                        ]}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("Detail", { movieId: item.id })}
                    >
                        <Image
                            source={{ uri: `${IMAGE_URL}${item.backdrop_path}` }}
                            style={styles.banner__image}
                            resizeMode="cover"
                        />
                        <View style={styles.banner__overlay}>
                            <Text style={styles.banner__title}>{item.title}</Text>
                            <Text style={styles.banner__date}>On {item.release_date}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                style={{ marginBottom: 12 }}
            />

            {/* Dots */}
            <View style={styles.dots}>
                {movies.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dots__dot,
                            activeIndex === index && styles["dots__dot--active"],
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: ITEM_WIDTH,
        height: 180,
        borderRadius: 16,
        overflow: "hidden",
    },

    banner__image: {
        width: "100%",
        height: "100%",
    },

    banner__overlay: {
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: 14,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    banner__title: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },

    banner__date: {
        color: "#ccc",
        fontSize: 12,
        fontFamily: "PoppinsRegular",
    },

    dots: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
        marginBottom: 24,
    },

    dots__dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#2a3250",
    },

    "dots__dot--active": {
        width: 20,
        borderRadius: 4,
        backgroundColor: "#00e5ff",
    },
});