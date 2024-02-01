import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Linking, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import appStyle from '../../../styles'
import { useContext } from 'react';
import AppState from '../../../../aplication/GlobalState';
import { Image } from 'expo-image';
import { formatPublishedDate } from '../../../utils';
import { computed } from '@preact/signals-react';
import { Ionicons } from "@expo/vector-icons"

const { bigText, mediumText, whiteText, smallText, dimmedWhiteText } = appStyle

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

  // Removes the '[+1234 chars]' from the content and replaces the newlines with double newlines 
  const parsedContent = computed(() => content.replace(/\[\+\d+ chars\]/, "").replaceAll('\n', '\n\n').trimEnd())

  // Removes the last part of the title which is the source name
  const parsedTitle = computed(() => title.split(' - ').slice(0, -1).join(' - '))

  const goToUrl = () => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          // TODO: handle the error
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
  }

  const imageBlurHash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const nav = useNavigation()

  return (
    <>
      <Stack.Screen options={{
        headerShown: true, title: source.name, headerRight: ({ tintColor }) => {
          return (
            <TouchableOpacity onPress={() => nav.goBack()}>
              <Ionicons name="close" size={30} color="rgba(0,0,0,0.2)" />
            </TouchableOpacity>
          )
        },
      }} />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={urlToImage}
            placeholder={imageBlurHash}
            contentFit="cover"
            transition={1000}
          />
          <Text style={[bigText, whiteText, { fontWeight: '900', paddingHorizontal: 7 }]}>{parsedTitle}</Text>
          <Text style={[mediumText, whiteText, { paddingHorizontal: 7 }]}>{description}</Text>
          <View style={[styles.detailsContainer]}>
            <Text style={[smallText, dimmedWhiteText]}> {author} </Text>
            <Text style={[smallText, dimmedWhiteText]}> {formatPublishedDate(publishedAt)} </Text>
          </View>
          <Text style={[mediumText, whiteText, { paddingHorizontal: 7, marginBottom: 50 }]}>
            {parsedContent.value}
            <Text onPress={goToUrl} style={[{ color: 'lightblue', textDecorationLine: 'underline' }]}>read more</Text>
          </Text>

        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  container: {
    backgroundColor: '#222'
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#0553',
  },
  detailsContainer: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 7
  }
});
