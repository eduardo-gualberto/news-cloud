import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons"

export default function TabsLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => (
                    <BlurView intensity={50} style={styles.blurContainer} tint="dark" />
                ),
                tabBarStyle: {
                    borderTopColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80,
                    borderRadius: 40,
                    paddingTop: 20,
                    paddingBottom: 10,
                    marginHorizontal: '25%',
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    bottom: 20
                },
            }}
        >
            <Tabs.Screen name="home" options={{
                tabBarLabel: "",
                tabBarInactiveTintColor: "grey",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                },
            }} />
            <Tabs.Screen name="search" options={{
                tabBarLabel: "",
                tabBarInactiveTintColor: "grey",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Ionicons name="search" size={size} color={color} />
                    )
                }
            }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blurContainer: {
        flex: 1,
        padding: 20,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 40,
    },
})