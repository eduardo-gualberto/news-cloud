import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed'
import { SearchBarProps } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signal } from '@preact/signals-react';
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

type SearchBarRefType = TextInput & PropsWithChildren<SearchBarProps>

const searchText = signal('')
const searchedNews = signal([] as News[])
const modalController = signal({
  visible: false,
  errorMsg: ''
})
const loading = signal(false)

export default function Search() {
  const { selectedCategory } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])
  const categories = useMemo(() => ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'], [])
  const searchBarRef = useRef<SearchBarRefType>(null)

  const searchForNews = (text: string) => {
    const loggr = logger.extend('Search.searchForNews')
    const formattedText = text.split(' ')

    loading.value = true

    newsService
      .getEverythingForQueryAndLanguage(formattedText, 'en')
      .then((news) => {
        if (news.news.length === 0) {
          loggr.info('No news found for query: ', formattedText, "\nReturning mock data")
          modalController.value = {
            visible: true,
            errorMsg: "No news found for query: " + formattedText
          }
          searchedNews.value = News.fromMock()
        } else {
          searchedNews.value = news.news
        }
        loading.value = false
      })
      .catch((error) => {
        loading.value = false
        loggr.error('Failed to fetch news for query:\n', formattedText, '\nError:\n', error)
        modalController.value = {
          visible: true,
          errorMsg: "Failed to fetch news for query:\n" + formattedText
        }
      })
  }

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
            searchForNews(nativeEvent.text)
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
            data={searchedNews.value}
            ListHeaderComponent={() => (
              <View>
                <Text style={{ color: 'white' }}>
                  header view component
                </Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View>
                <Text style={{ color: 'white' }}>
                  empty view component
                </Text>
              </View>
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
                  loading.value = true;
                  searchForNews(searchText.value)
                }}
              />
            }
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
