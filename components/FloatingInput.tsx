import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";

type Props = {
    value?: string;   
    label: string;
    secureText?: boolean;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
};

export default function FloatingInput({ label, secureText = false, onChangeText, onBlur }: Props) {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const anim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: false }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(anim, { toValue: 0, duration: 180, useNativeDriver: false }).start();
        }
        onBlur?.(); 
    };

    const labelTop   = anim.interpolate({ inputRange: [0, 1], outputRange: [15, -10] });
    const labelSize  = anim.interpolate({ inputRange: [0, 1], outputRange: [15, 12] });
    const labelColor = anim.interpolate({ inputRange: [0, 1], outputRange: ["#666", "#00e5ff"] });

    return (
        <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
            <Animated.Text style={[styles.label, { top: labelTop, fontSize: labelSize, color: labelColor }]}>
                {label}
            </Animated.Text>

            <TextInput
                style={[styles.input, (isFocused || value) && styles.inputActive]}
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                    onChangeText?.(text); 
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                secureTextEntry={secureText && !showPassword}
                autoCapitalize="none"
            />

            {secureText && (
                <TouchableOpacity
                    onPress={() => setShowPassword(prev => !prev)}
                    activeOpacity={0.7}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={isFocused ? "#00e5ff" : "#aaa"}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 1,
        borderColor: "#2a3250",
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: "#1e2640",
        flexDirection: "row",
        alignItems: "center",
        height: 58,
        position: "relative",
        overflow: 'visible',    
    },

    inputWrapperFocused: {
        borderColor: "#00e5ff",
    },

    label: {
        position: "absolute",
        left: 16,
        fontFamily: "PoppinsRegular",
        backgroundColor: "#1e2640", 
        paddingHorizontal: 4,   
    },

    input: {
        flex: 1,
        color: "#fff",
        fontSize: 15,
        fontFamily: "PoppinsRegular",
    },

    inputActive: {
        paddingTop: 14,  
    },

    eyeIcon: {
        paddingLeft: 8,
    }
});