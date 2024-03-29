import { Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabsLayout() {

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="news-details" options={{
                presentation: 'modal',
                headerShown: false
            }} />
        </Stack>
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