import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="news-details" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
    )
}