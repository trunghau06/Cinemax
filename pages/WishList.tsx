import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import WishlistCard from "../components/WishlistCard";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { auth, db } from "../services/firebase";
import { setWishList } from "../redux/wishList/wishSlice";
import { collection, getDocs } from "firebase/firestore";

export default function WishList() {
    const favourites = useAppSelector(state => state.wishList.movies);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadWishList = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
            const movies = snap.docs.map((doc: { data: () => any; }) => doc.data()) as any[];
            dispatch(setWishList(movies));
        };
        loadWishList();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {favourites.length === 0
                ? <>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.header__title}>Wish List</Text>
                        <View style={{ width: 36 }} />
                    </View>
                    <View style={styles.empty}>
                        <Image
                            source={require('../assets/WishList/empty_wishlist.png')}
                            style={styles.empty__image}
                            resizeMode="contain"
                        />
                        <Text style={styles.empty__title}>There Is No Movie Yet!</Text>
                        <Text style={styles.empty__subtitle}>Find your movie by Type title,{"\n"}categories, years, etc</Text>
                    </View>
                </>
                : <FlatList
                    data={favourites}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    ListHeaderComponent={
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text style={styles.header__title}>Wish List</Text>
                            <View style={{ width: 36 }} />
                        </View>
                    }
                    renderItem={({ item }) => (
                        <WishlistCard
                            movie={item}
                            onPress={() => navigation.navigate("Detail", { movieId: item.id })}
                        />
                    )}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#161D2F" 
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        marginBottom: 24,
        paddingHorizontal: 24,
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
        color: "#fff",
        fontSize: 20,
        fontFamily: "PoppinsBold",
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },

    empty__image: {
        width: 100,
        height: 100,
        marginBottom: 24,
    },

    empty__title: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "PoppinsBold",
        textAlign: "center",
        marginBottom: 8,
    },

    empty__subtitle: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        textAlign: "center",
        lineHeight: 22,
    },
});