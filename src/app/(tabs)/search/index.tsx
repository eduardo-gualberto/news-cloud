import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { SearchBar } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context';
import { computed, signal } from '@preact/signals-react';
import { useContext, useEffect, useMemo } from 'react';
import NewsService from '@Domain/news/services/news';
import ErrorModal from '@Utils/components/Modals/error-modal';
import NewsCard from '@Utils/components/NewsCard';
import CustomRefreshControl from '@Utils/components/CustomRefreshControl';
import CategoryCard from '@Utils/components/CategoryCard';
import HorizontalCarousel from '@Utils/components/HorizontalCarousel';
import AppState from '@Aplication/GlobalState';
import usePagination from '@Utils/hooks/use-pagination';
import EmptyListView from '@Utils/components/EmptyListView';
import SourcesServices from '@Domain/sources/services/sources';
import { ApiNewsCategory } from 'ts-newsapi';

const searchText = signal('')
const modalController = signal({
  visible: false,
  errorMsg: ''
})
const stopPagination = signal(false)

export default function Search() {
  const newsService = useMemo(() => {
    return new NewsService((error) => {
      console.error(error);
    })
  }, [])

  const sourcesService = useMemo(() => {
    return new SourcesServices((error) => {
      console.error(error);
    })
  }, [])
  
  const { loading, data, fetchMore, reset, error } = usePagination(async (page: number, pageSize: number) => {
    const sources = (await sourcesAsync.value).slice(0, 20)
    const news = await newsService
      .getEverythingForQueryAndLanguageAndSources(searchText.value.split(' '), 'en', sources, page, pageSize);
    return news.news;
  }, stopPagination.value, 20, 1)

  const categories = useMemo(() => ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'], [])
  const { selectedCategory } = useContext(AppState)
  const sourcesAsync = computed(() => {
    return sourcesService.getSourcesByCategory(selectedCategory.value as ApiNewsCategory)
  })

  useEffect(() => {
    // reset the pagination and clears data if the search text cleared
    if (searchText.value.trim().length === 0
      && data.value.length !== 0
      && loading.value === false) {
      reset()
    }
  }, [searchText.value, data.value, loading.value])

  useEffect(() => {
    if (error.value) {
      stopPagination.value = true
    }
  }, [error.value])

  useEffect(() => {
    reset()
    fetchMore()
  }, [selectedCategory.value])

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search"
          value={searchText.value}
          containerStyle={{ width: '100%', backgroundColor: 'inherit', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
          style={{ borderWidth: 0 }}
          platform={'default'}
          round
          onChangeText={(text) => { searchText.value = text }}
          onEndEditing={({ nativeEvent }) => {
            if (searchText.value.trim().length === 0) return
            fetchMore()
          }}
        />
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
            data={data.value}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <EmptyListView />
            )}
            renderItem={({ item }) => {
              return (
                <NewsCard news={item} isCompact={true} />
              )
            }}
            refreshControl={
              <CustomRefreshControl
                loading={loading.value}
                onRefresh={() => {
                  if (searchText.value.trim().length === 0) return
                  fetchMore()
                }}
              />
            }
            onEndReached={() => {
              if (searchText.value.trim().length === 0) return
              fetchMore()
            }}
          />
        </View>
        <ErrorModal
          errorMessage={modalController.value.errorMsg}
          visible={modalController.value.visible}
          onClose={() => {
            modalController.value = {
              visible: false,
              errorMsg: ''
            }
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }, list: {
    flex: 1,
    width: '90%',
  }
});
