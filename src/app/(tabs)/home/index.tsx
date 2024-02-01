import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { ApiNewsCategory } from 'ts-newsapi';
import { signal } from '@preact/signals-react';
import { useContext, useEffect, useMemo } from 'react';

import HorizontalCarousel from '@Components/HorizontalCarousel';
import NewsCard from '@Components/NewsCard';
import CategoryCard from '@Components/CategoryCard';
import CustomRefreshControl from '@Components/CustomRefreshControl';
import AppState from '@Aplication/GlobalState';
import News from '@Domain/news/models/news';
import NewsService from '@Domain/news/services/news';

const news = signal<News[]>([])
const loading = signal(false)

export default function Home() {
  const { selectedCategory } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])

  const fetchNews = () => newsService
    .getTopHeadlinesForCountryAndCategory('us', selectedCategory.value as ApiNewsCategory)
    .then(res => {
      news.value = res.news
      loading.value = false
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
      <View style={styles.container}>
        <HorizontalCarousel items={categories} itemGap={15} itemRenderer={(item, key) => (
          <CategoryCard
            categoryName={item}
            isSelected={selectedCategory.value === item}
            onPress={() => {
              selectedCategory.value = item
            }}
            key={key}
          />
        )} />

        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={news.value}
            renderItem={({ item }) => {
              return (
                <NewsCard news={item} />
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
    paddingTop: 50,
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