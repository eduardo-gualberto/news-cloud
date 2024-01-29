import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useContext, useState } from 'react'
import NewsService from '../../../domain/news/services/news'
import { ApiNewsCategory } from 'ts-newsapi'
import { signal } from '@preact/signals-react'
import News from '../../../domain/news/models/news'
import defaultStyles from '../../styles'
import AppState from '../../../aplication/GlobalState'

const { mediumText, whiteText } = defaultStyles

const news = signal<News[]>([])
const loading = signal(false)

const NewsCard = () => {
  const { selectedCategory } = useContext(AppState)

  const newsService = useMemo(() => {
    return new NewsService()
  }, [])

  const fetchNews = () => newsService.getTopHeadlinesForCountryAndCategory('us', selectedCategory.value as ApiNewsCategory)

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
    <View>
      <FlatList
        data={news.value}
        renderItem={(item) => {
          return (
            <Text style={[mediumText, whiteText, { margin: 10 }]}>{item.item.title}</Text>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading.value}
            onRefresh={() => {
              loading.value = true
              fetchNews()
                .then(res => {                  
                  if (res.news.length > 0) {
                    news.value = res.news
                  }
                  loading.value = false
                })
                .catch(e => loading.value = false)
            }}
            colors={['white']}
            tintColor={'white'}
          />
        }
      />
    </View>
  )
}

export default NewsCard

const styles = StyleSheet.create({})