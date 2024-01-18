import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Detail Page" }} />
      <View style={styles.container}>
        <Text style={{fontSize: 24}}>Detail Page</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
