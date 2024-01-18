import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={{fontSize: 24}}>Home Page</Text>
        <Link href={"/home/news-details"}>
          <Text>Go to news detail page</Text>
        </Link>
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
