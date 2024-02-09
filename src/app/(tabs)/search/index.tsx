import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed'
import { SearchBarProps } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context';
import { effect, signal } from '@preact/signals-react';
import { PropsWithChildren, useContext, useMemo, useRef } from 'react';
import NewsService from '@Domain/news/services/news';
import News from '@Domain/news/models/news';
import logger from '@Aplication/Logger';
import ErrorModal from '@Utils/components/Modals/error-modal';
import NewsCard from '@Utils/components/NewsCard';
import CustomRefreshControl from '@Utils/components/CustomRefreshControl';
import CategoryCard from '@Utils/components/CategoryCard';
import HorizontalCarousel from '@Utils/components/HorizontalCarousel';
import AppState from '@Aplication/GlobalState';
import usePagination from '@Utils/hooks/use-pagination';
import EmptyListView from '@Utils/components/EmptyListView';

type SearchBarRefType = TextInput & PropsWithChildren<SearchBarProps>

const searchText = signal('')
const modalController = signal({
  visible: false,
  errorMsg: ''
})

export default function Search() {
  const { selectedCategory } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])

  const { loading, data, fetchMore, error } = usePagination((page: number, pageSize: number) => {
    console.log('fetching page', page, 'with size', pageSize, 'for query', searchText.value.split(' '))

    return newsService
      .getEverythingForQueryAndLanguage(searchText.value.split(' '), 'en', page, pageSize)
      .then(news => news.news)
  }, false, 20, 1)

  const categories = useMemo(() => ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'], [])
  const searchBarRef = useRef<SearchBarRefType>(null)

  effect(() => {
    // empty the list out if the search text cleared
    if (searchText.value.trim().length === 0
      && data.value.length !== 0
      && loading.value === false) {
      data.value = []
    }
  })
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <SearchBar
          ref={searchBarRef}
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
