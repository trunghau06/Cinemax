import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/navigation";

export default function LogSign() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('../assets/Splash/image_intro.png')}
                resizeMode="contain"
                style={styles.logo}
            />

            {/* Subtitle */}
            <Text style={styles.subtitle}>Enter your registered</Text>
            <Text style={styles.subtitle}>Phone Number to Sign Up</Text>

            {/* Sign Up button */}
            <TouchableOpacity 
                style={styles.signUpBtn} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.signUpBtn__text}>Sign Up</Text>
            </TouchableOpacity>

            {/* Login link */}
            <View style={styles.login}>
                <Text style={styles.login__text}>I already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.login__link}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
                <View style={styles.divider__line} />
                <Text style={styles.divider__text}>Or Sign up with</Text>
                <View style={styles.divider__line} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#161D2F',
        paddingHorizontal: 24,
    },

    logo: {
        marginBottom: 16,
    },

    subtitle: {
        color: '#aaa',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
        fontFamily: 'PoppinsBold',
    },

    signUpBtn: {
        width: '100%',
        backgroundColor: '#07d2ec',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 52,
        marginBottom: 20,
    },
    signUpBtn__text: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
    },

    login: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    login__text: {
        color: '#aaa',
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
    },
    login__link: {
        color: '#00BCD4',
        fontSize: 14,
        fontFamily: 'PoppinsBold',
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 28,
        width: '100%',
    },
    divider__line: {
        flex: 1,
        height: 1,
        backgroundColor: '#2a3250',
    },
    divider__text: {
        color: '#666',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },

    socialBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});