import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    );
}