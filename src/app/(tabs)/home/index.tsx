import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useEffect, useMemo } from 'react';

import NewsCard from '@Components/NewsCard';
import CustomRefreshControl from '@Components/CustomRefreshControl';
import NewsService from '@Domain/news/services/news';
import globalStyles from '@Utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePagination from '@Utils/hooks/use-pagination';
import { effect, signal } from '@preact/signals-react';

const { bigText, mediumText, whiteText, dimmedWhiteText } = globalStyles

const stopPagination = signal(false)

export default function Home() {
  const newsService = useMemo(() => {
    return new NewsService()
  }, [])

  const { data, error, fetchMore, loading } = usePagination((p: number, ps: number) => {
    return newsService
      .getTopHeadlinesForCountryAndCategory('us', 'general', p, ps)
      .then(res => res.news)
  }, stopPagination.value, 20, 1)

  useEffect(() => {
    fetchMore()
  }, [])

  effect(() => {
    if (error.value) {
      stopPagination.value = true
    }
  })

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            data={data.value}
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
                  fetchMore()
                }}
              />
            }
            onEndReached={() => {
              fetchMore()
            }}
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