import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../../styles';

import HorizontalCarousel from '../../components/HorizontalCarousel';

const { smallText, mediumText, whiteText } = appStyles

const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`
}

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <HorizontalCarousel items={[1, 2, 3, 4, 5]} itemGap={15} itemRenderer={(item, key) => (
          <View style={{ borderWidth: 2, borderColor: generateRandomHexColor(), height: 35, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} key={key} >
            <Text style={[smallText, whiteText]}> card {item}</Text>
          </View>
        )} />
        {/* <Text style={[mediumText, whiteText]}>Home Page</Text>
        <Link href={"/home/news-details"}>
          <Text style={[smallText, whiteText]}>Go to news detail page</Text>
        </Link> */}
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
    justifyContent: 'flex-start',
    paddingTop: 50
  },
});