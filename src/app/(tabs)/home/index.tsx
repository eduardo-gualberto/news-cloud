import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../../styles';

const { smallText, mediumText, whiteText } = appStyles

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={[mediumText, whiteText]}>Home Page</Text>
        <Link href={"/home/news-details"}>
          <Text style={[smallText, whiteText]}>Go to news detail page</Text>
        </Link>
        <StatusBar style="auto" />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});