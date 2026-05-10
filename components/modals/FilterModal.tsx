import { Ionicons } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

type Props = {
    visible: boolean;

    selectedRating: number | null;
    setSelectedRating: (value: number | null) => void;

    selectedYear: string | null;
    setSelectedYear: (value: string | null) => void;

    selectedSort: string | null;
    setSelectedSort: (value: string | null) => void;

    onClose: () => void;
    onApply: () => void;
};

export default function FilterModal({
    visible,
    selectedRating,
    setSelectedRating,
    selectedYear,
    setSelectedYear,
    selectedSort,
    setSelectedSort,
    onClose,
    onApply,
}: Props) {

    const sortOptions = [
        {
            label: "Popularity",
            value: "popularity.desc"
        },
        {
            label: "Top Rated",
            value: "vote_average.desc"
        },
        {
            label: "Newest",
            value: "primary_release_date.desc"
        }
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >
            <View style={styles.overlay}>

                <View style={styles.container}>

                    {/* Handle */}
                    <View style={styles.handle} />

                     <Image
                        source={require("../../assets/Filter/Filter.png")}
                        style={styles.banner}
                        resizeMode="cover"
                    />

                    {/* Close */}
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="close"
                            size={22}
                            color="#FFFFFF"
                        />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Filter</Text>
                    </View>

                    {/* Rating */}
                    <Text style={styles.sectionTitle}>Rating</Text>

                    <View style={styles.row}>
                        {[6, 7, 8, 9].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.btn,
                                    selectedRating === item && styles.btnActive
                                ]}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setSelectedRating(
                                        selectedRating === item
                                            ? null
                                            : item
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        selectedRating === item &&
                                        styles.btnTextActive
                                    ]}
                                >
                                    {item}+
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Year */}
                    <Text style={styles.sectionTitle}>Year</Text>

                    <View style={styles.row}>
                        {["2020", "2021", "2022", "2023", "2024"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.btn,
                                    selectedYear === item && styles.btnActive
                                ]}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setSelectedYear(
                                        selectedYear === item
                                            ? null
                                            : item
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        selectedYear === item &&
                                        styles.btnTextActive
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sort */}
                    <Text style={styles.sectionTitle}>Sort</Text>

                    <View style={styles.row}>
                        {sortOptions.map((item) => (
                            <TouchableOpacity
                                key={item.value}
                                style={[
                                    styles.btn,
                                    selectedSort === item.value &&
                                    styles.btnActive
                                ]}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setSelectedSort(
                                        selectedSort === item.value
                                            ? null
                                            : item.value
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.btnText,
                                        selectedSort === item.value &&
                                        styles.btnTextActive
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bottom Buttons */}
                    <View style={styles.bottomBtns}>

                        <TouchableOpacity
                            style={styles.resetBtn}
                            activeOpacity={0.8}
                            onPress={() => {
                                setSelectedRating(null);
                                setSelectedYear(null);
                                setSelectedSort(null);
                            }}
                        >
                            <Text style={styles.resetText}>
                                Reset
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.applyBtn}
                            activeOpacity={0.8}
                            onPress={onApply}
                        >
                            <Text style={styles.applyText}>
                                Apply
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "flex-end",
    },

    container: {
        backgroundColor: "#1e2640",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 32,
    },

    handle: {
        width: 60,
        height: 5,
        borderRadius: 999,
        backgroundColor: "#555",
        alignSelf: "center",
        marginBottom: 18,
    },

    header: {
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "PoppinsBold",
        textAlign: "center",
    },

    closeBtn: {
        position: "absolute",
        top: 18,
        right: 24,

        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#161D2F",

        justifyContent: "center",
        alignItems: "center",
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "PoppinsBold",
        marginTop: 12,
        marginBottom: 8,
    },

    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    btn: {
        height: 42,
        paddingHorizontal: 18,
        borderRadius: 14,
        backgroundColor: "#161D2F",

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "transparent",

        marginRight: 10,
        marginBottom: 10,
    },

    btnActive: {
        backgroundColor: "rgba(0,229,255,0.14)",
        borderColor: "#00e5ff",
    },

    btnText: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },

    btnTextActive: {
        color: "#00e5ff",
        fontFamily: "PoppinsBold",
    },

    bottomBtns: {
        flexDirection: "row",
        marginTop: 28,
    },

    resetBtn: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        backgroundColor: "#161D2F",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    applyBtn: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        backgroundColor: "#00e5ff",
        justifyContent: "center",
        alignItems: "center",
    },

    resetText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontFamily: "PoppinsBold",
    },

    applyText: {
        color: "#161D2F",
        fontSize: 15,
        fontFamily: "PoppinsBold",
    },

    banner: {
        width: 80,
        height: 80,
        borderRadius: 999,
        alignSelf: "center",
        marginBottom: 12,
    },
});