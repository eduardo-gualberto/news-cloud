import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ statusBarTranslucent: false, statusBarColor: '#000' }}>
            <Stack.Screen name="news-details" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
    )
}