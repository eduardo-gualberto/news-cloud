import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function TabsLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => (
                    <BlurView intensity={50} style={styles.blurContainer} tint="dark"/>
                ),
                tabBarStyle: {
                    borderTopColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80,
                    borderRadius: 40,
                    paddingTop: 20,
                    paddingBottom: 20,
                    marginHorizontal: '25%',
                    position: 'absolute',
                    backgroundColor: 'transparent'
                },
            }}
        >
            <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
            <Tabs.Screen name="search" options={{ tabBarLabel: "Search" }} />
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