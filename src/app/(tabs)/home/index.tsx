import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appStyles from '../../styles';

import HorizontalCarousel from '../../components/HorizontalCarousel';
import { signal } from '@preact/signals-react';
import { useMemo } from 'react';
import { shadeColor } from '../../utils';

const { smallText, mediumText, whiteText } = appStyles
export const selectedCategoryKey = signal(0)

export default function Home() {
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
              selectedCategoryKey.value = key
            }}
            style={[styles.categoryCard,
            { borderColor: color[key] },
            { backgroundColor: selectedCategoryKey.value === key ? shadeColor(color[key], -40) : 'transparent' }
            ]}
          >
            <Text style={[smallText, whiteText, { fontWeight: selectedCategoryKey.value === key ? 'bold' : 'normal' }]}>
              {item}
            </Text>
          </TouchableOpacity>
        )} />
        <Text style={[smallText, whiteText]}>Selecionado: {selectedCategoryKey.value}</Text>
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
    borderWidth: 1,
    height: 35,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});