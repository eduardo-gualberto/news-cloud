import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import News from './src/domain/News/models/news';
import NewsAPI from 'ts-newsapi';

export default function App() {

  const newsApi = new NewsAPI(process.env.EXPO_PUBLIC_NEWSAPI_KEY ?? "")
  newsApi.getTopHeadlines({
    country: 'us'
  }).then(res => console.log(News.fromApiResponse(res)))

  return (
    <View style={styles.container}>
      <Text>Oi amigos</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
