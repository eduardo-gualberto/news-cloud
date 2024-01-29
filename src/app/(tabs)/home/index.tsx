import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import HorizontalCarousel from '../../components/HorizontalCarousel';
import { signal } from '@preact/signals-react';
import { useContext, useEffect, useMemo } from 'react';
import NewsCard from '../../components/NewsCard';
import AppState from '../../../aplication/GlobalState';
import News from '../../../domain/news/models/news';
import NewsService from '../../../domain/news/services/news';
import { ApiNewsCategory } from 'ts-newsapi';
import CategoryCard from '../../components/CategoryCard';
import CustomRefreshControl from '../../components/CustomRefreshControl';

const news = signal<News[]>([])
const loading = signal(false)

export default function Home() {
  const { selectedCategory } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])
  const fetchNews = () => newsService.getTopHeadlinesForCountryAndCategory('us', selectedCategory.value as ApiNewsCategory)

  const categories = useMemo(() => ['all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'], [])

  useEffect(() => {
    loading.value = true
    const interval = setInterval(() => {
      fetchNews()
        .then(res => {
          if (res.news.length > 0) {
            news.value = res.news
            loading.value = false
            return clearInterval(interval)
          }
        })
        .catch(e => loading.value = false)
    }, 1000)
    return () => {
      loading.value = false
      clearInterval(interval)
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
                    .then(res => {
                      if (res.news.length > 0) {
                        news.value = res.news;
                      }
                      loading.value = false;
                    })
                    .catch(e => loading.value = false);
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
    // height: 35,
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