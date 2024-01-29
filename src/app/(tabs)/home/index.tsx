import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appStyles from '../../styles';

import HorizontalCarousel from '../../components/HorizontalCarousel';
import { signal } from '@preact/signals-react';
import { useContext, useMemo } from 'react';
import { shadeColor } from '../../utils';
import NewsCard from '../../components/NewsCard';
import AppState from '../../../aplication/GlobalState';

const { smallText, mediumText, whiteText } = appStyles

export default function Home() {
  const { selectedCategory } = useContext(AppState)

  const categories = useMemo(() => ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'], [])
  const color = useMemo(() => {
    return Array(categories.length)
      .fill('')
      .map(_ => `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`)
  }, [])

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <HorizontalCarousel items={categories} itemGap={15} itemRenderer={(item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              selectedCategory.value = item
            }}
            style={[
              styles.categoryCard,
              { backgroundColor: selectedCategory.value === item ? 'lightgrey' : 'rgba(255,255,255,0.2)' }
            ]}
          >
            <Text style={[
              smallText,
              whiteText,
              { color: selectedCategory.value === item ? 'black' : 'white' }
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )} />
        <NewsCard />
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
    height: 35,
    width: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});