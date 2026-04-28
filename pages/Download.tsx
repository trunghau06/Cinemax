import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { removeDownload } from "../redux/download/downloadSlice";
import { deleteDoc, doc } from "firebase/firestore";
import DownloadCard from "../components/Card/DownloadCard";

export default function Download() {
    const downloads  = useAppSelector(state => state.download.movies);
    const downloadCount = downloads.length;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch   = useAppDispatch();

    const [selectMode, setSelectMode]   = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useFocusEffect(
        useCallback(() => {
            setSelectMode(false);
            setSelectedIds([]);
        }, [])
    );

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        const user = auth.currentUser;
        if (!user) return;

        for (const id of selectedIds) {
            await deleteDoc(doc(db, "users", user.uid, "downloads", id.toString()));
            dispatch(removeDownload(id));
        }

        setSelectedIds([]);
        setSelectMode(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header__backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.header__title}>
                    {selectMode ? `${selectedIds.length} selected` : "Download"}
                </Text>

                {selectMode ? (
                    <TouchableOpacity onPress={() => {
                        setSelectMode(false);
                        setSelectedIds([]);
                    }}>
                        <Text style={{ color: "#fff", fontFamily: "PoppinsBold", fontSize: 16 }}>Hủy</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 36 }} />
                )}
            </View>

            {downloads.length === 0 ? (
                <View style={styles.empty}>
                    <Image
                        source={require('../assets/Download/empty_download.png')}
                        style={styles.empty__image}
                        resizeMode="contain"
                    />
                    <Text style={styles.empty__title}>There Is No Movie Yet!</Text>
                    <Text style={styles.empty__subtitle}>
                        Find your movie by Type title,{"\n"}categories, years, etc
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={downloads}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 120,
                        paddingStart: 24
                    }}
                    renderItem={({ item }) => (
                        <DownloadCard
                            movie={item}
                            selectMode={selectMode}
                            selected={selectedIds.includes(item.id)}
                            onSelect={() => toggleSelect(item.id)}
                            onPress={() => navigation.navigate("Detail", { movieId: item.id })}
                        />
                    )}
                />
            )}

            {!selectMode && downloads.length > 0 && (
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => setSelectMode(true)}
                >
                    <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>
            )}

            {selectMode && (
                <TouchableOpacity
                    style={styles.okBtn}
                    onPress={handleDeleteSelected}
                >
                    <Ionicons name="checkmark" size={24} color="#fff" />
                </TouchableOpacity>
            )}
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

    deleteBtn: {
        position: "absolute",
        bottom: 30,
        right: 24,
        backgroundColor: "#FF4D6D",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },

    okBtn: {
        position: "absolute",
        bottom: 30,
        right: 24,
        backgroundColor: "#00e5ff",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "PoppinsBold",
    },
});