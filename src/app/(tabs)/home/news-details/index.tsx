import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import appStyle from '../../../styles'
import { useContext } from 'react';
import AppState from '../../../../aplication/GlobalState';

const { bigText } = appStyle

export default function NewsDetails() {
  const { selectedNews } = useContext(AppState)

  const {
    content,
    title,
    urlToImage,
    author,
    source,
    publishedAt,
    url,
    description
  } = selectedNews.value

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Detail Page" }} />
      <View style={styles.container}>
        <Text style={[bigText]}>{title}</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
