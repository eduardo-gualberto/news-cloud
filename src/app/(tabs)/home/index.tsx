import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { ApiNewsCategory } from 'ts-newsapi';
import { signal } from '@preact/signals-react';
import { useContext, useEffect, useMemo } from 'react';

import NewsCard from '@Components/NewsCard';
import CustomRefreshControl from '@Components/CustomRefreshControl';
import AppState from '@Aplication/GlobalState';
import NewsService from '@Domain/news/services/news';
import News from '@Domain/news/models/news';
import globalStyles from '@Utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const { bigText, mediumText, whiteText, dimmedWhiteText } = globalStyles

const loading = signal(false)

export default function Home() {
  const { fetchedNews } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])

  const fetchNews = () => newsService
    .getTopHeadlinesForCountryAndCategory('us', 'general')
    .then(res => {
      if (res.news.length === 0) {
        fetchedNews.value = News.fromMock()
        loading.value = false
      } else {
        fetchedNews.value = res.news
        loading.value = false
      }
    })
    .catch(e => loading.value = false)

  const categories = useMemo(() => ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'], [])

  useEffect(() => {
    loading.value = true
    fetchNews()
    return () => {
      loading.value = false
    }
  }, [])

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={fetchedNews.value}
            ListHeaderComponent={() => (
              <View style={{ marginBottom: 30, flex: 0, alignItems: 'flex-start', width: '100%', padding: 0 }}>
                <Text style={[bigText, whiteText, { fontWeight: '800' }]}>top headlines</Text>
                <Text style={[mediumText, dimmedWhiteText, { fontWeight: '900' }]}>of the day</Text>
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <NewsCard news={item} isCompact={false} />
              )
            }}
            refreshControl={
              <CustomRefreshControl
                loading={loading.value}
                onRefresh={() => {
                  loading.value = true;
                  fetchNews()
                }}
              />
            }
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  categoryCard: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  list: {
    flex: 1,
    width: '90%',
  }
});