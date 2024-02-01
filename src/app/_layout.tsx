import { Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabsLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}/>
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