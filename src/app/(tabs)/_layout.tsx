import { Tabs } from "expo-router";

export default function TabsLayout() {

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
            <Tabs.Screen name="search" options={{ tabBarLabel: "Search" }} />
        </Tabs>
    )
}