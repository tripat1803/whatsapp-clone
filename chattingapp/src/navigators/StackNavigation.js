import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Auth from "../screens/Auth";
import TabNavigation from "./TabNavigation";
import { Color } from "../utils/Color";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import FAIcon from "react-native-vector-icons/FontAwesome6";
import { Pressable } from "react-native";
import Camera from "../screens/Camera";
import PersonalChat from "../screens/Chat/PersonalChat";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchUser from "../screens/SearchUser";


const Stack = createStackNavigator();

export default function StackNavigation() {

    const navigation = useNavigation();

    async function checkAuth() {
        let authorization = await AsyncStorage.getItem("auth-token");

        if (authorization) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Chat' }]
            });
            // Splashscreen off
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }]
            });
            // Splashscreen off
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={Auth} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Chat" component={TabNavigation} options={{
                title: 'WhatsApp',
                headerTitleStyle: {
                    fontSize: 18,
                    color: 'white'
                },
                headerStyle: {
                    elevation: 0,
                    backgroundColor: Color.primary
                },
                headerRight: () => (
                    <View style={{ flexDirection: "row", gap: 6, marginRight: 10, alignItems: "center" }}>
                        <View style={{ borderRadius: 50, overflow: "hidden" }}>
                            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} onPress={() => {
                                navigation.navigate("Camera");
                            }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                                <Icon name="camera" size={20} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ borderRadius: 50, overflow: "hidden" }}>
                            <Pressable onPress={() => {
                                navigation.navigate("Search");
                            }} style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                                <Icon name="search" size={20} color="white" />
                            </Pressable>
                        </View>
                        <View style={{ borderRadius: 50, overflow: "hidden" }}>
                            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                                <FAIcon name="ellipsis-vertical" size={20} color="white" />
                            </Pressable>
                        </View>
                    </View>
                )
            }} />
            <Stack.Screen name="Camera" component={Camera} options={{
                headerShown: false
            }} />
            <Stack.Screen name="PersonalChat" component={PersonalChat} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Search" component={SearchUser} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}