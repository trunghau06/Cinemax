import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const CATEGORIES = ["All", "Comedy", "Animation", "Documentary", "Action"];

type Props = {
    selected: string;
    onSelect: (cat: string) => void;
};

export default function CategoryFilter({ selected, onSelect }: Props) {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24, paddingRight: 14 }}
        >
            {CATEGORIES.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={[styles.btn, selected === cat && styles["btn--active"]]}
                    onPress={() => onSelect(cat)}
                >
                    <Text style={[styles.text, selected === cat && styles["text--active"]]}>
                        {cat}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginRight: 10,
        minWidth: 80,
        alignItems: "center",
        marginBottom: 8
    },
    "btn--active": {
        backgroundColor: "rgba(0, 229, 255, 0.15)",
    },
    text: {
        color: "#888",
        fontSize: 14,
        fontFamily: "PoppinsRegular",
    },
    "text--active": {
        color: "#00e5ff",
        fontFamily: "PoppinsBold",
    },
});