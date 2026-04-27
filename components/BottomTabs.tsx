import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import { Feather, FontAwesome, Foundation, Ionicons } from "@expo/vector-icons";
import SearchPage from "../pages/SearchPage";
import DownloadPage from "../pages/Download";
import { BottomTabParamList } from "../types/navigation";
import ProfileStack from "./ProfileStack";
import { useAppSelector } from "../hooks/hooks";

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabIconProps = {
    icon: React.ReactNode;
    focused: boolean;
};

function TabIcon({ icon, focused }: TabIconProps) {
    return (
        <View style={{
            backgroundColor: focused ? "rgba(0,229,255,0.15)" : "transparent",
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 8,
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 40,
        }}>
            {icon}
        </View>
    );
}

export default function BottomTabs() {
    const downloadCount = useAppSelector(
        state => state.download.movies.length
    );
    return (
        <Tab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1e2640",
                    borderTopWidth: 0,
                    height: 72,
                    paddingTop: 10,
                    paddingBottom: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                tabBarItemStyle: {
                    justifyContent: "space-between",
                    alignItems: "center",
                },
                tabBarActiveTintColor: "#00e5ff",
                tabBarInactiveTintColor: "#888",
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<Foundation name="home" size={24} color={color} />}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchPage}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<Ionicons name="search-outline" size={24} color={color} />}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Download"
                component={DownloadPage}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<Feather name="download" size={24} color={color} />}
                            focused={focused}
                        />
                    ),
                    tabBarBadge:
                        downloadCount > 0
                            ? downloadCount > 99
                                ? "99+"
                                : downloadCount
                            : undefined,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack} 
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={<FontAwesome name="user" size={24} color={color} />}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}