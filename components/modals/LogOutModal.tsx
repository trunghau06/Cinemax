import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface Props {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogoutModal({ visible, onConfirm, onCancel }: Props) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/* Icon */}
                    <View style={styles.iconWrapper}>
                        <Image
                            source={require('../assets/Popup_Logout/Question.png')}
                            style={styles.iconImage}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.title}>Are you sure ?</Text>
                    <Text style={styles.subtitle}>
                        Logging out will end your current session. You can log back in anytime.
                    </Text>

                    <View style={styles.btnRow}>
                        <TouchableOpacity style={styles.btnLogout} onPress={onConfirm}>
                            <Text style={styles.btnLogout__text}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
                            <Text style={styles.btnCancel__text}>Cancel</Text>
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
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        backgroundColor: "#1e2640",
        borderRadius: 24,
        padding: 28,
        width: "82%",
        alignItems: "center",
    },

    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#f5a623",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 6,
        borderColor: "#00c8ff",
    },

    iconImage: {
        width: 44,
        height: 44,
    },

    title: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "PoppinsBold",
        marginBottom: 10,
    },

    subtitle: {
        color: "#888",
        fontSize: 13,
        fontFamily: "PoppinsRegular",
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 20,
    },

    btnRow: {
        flexDirection: "row",
        gap: 12,
    },

    btnLogout: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#00e5ff",
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: "center",
    },

    btnLogout__text: {
        color: "#fff",
        fontFamily: "PoppinsSemiBold",
        fontSize: 14,
        lineHeight: 20,
    },

    btnCancel: {
        flex: 1,
        backgroundColor: "#00e5ff",
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: "center",
    },

    btnCancel__text: {
        color: "#000",
        fontFamily: "PoppinsSemiBold",
        fontSize: 14,
        lineHeight: 20,
    },
});