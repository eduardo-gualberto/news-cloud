import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'expo-image'
import News from '../../../domain/news/models/news'
import defaultStyles from '../../styles'
import { formatPublishedDate } from '../../utils'
import { Link } from 'expo-router'
import AppState from '../../../aplication/GlobalState'


const { mediumText, whiteText, smallText, dimmedWhiteText } = defaultStyles

const NewsCard = ({ news }: { news: News }) => {

  const { selectNews } = useContext(AppState)

  const imageBlurHash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <Link
      href={"/(tabs)/home/news-details"}
      onPress={() => selectNews(news)}
      asChild
    >
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={news.urlToImage}
            placeholder={imageBlurHash}
            contentFit="cover"
            transition={1000}
          />
          <Text style={[mediumText, whiteText, { margin: 10 }]}>
            {news.title}
          </Text>
          <Text style={[{ textAlign: 'left', width: '100%', marginLeft: 30, marginBottom: 10 }, dimmedWhiteText, smallText]}>
            {formatPublishedDate(news.publishedAt)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </Link>
  )
}

export default NewsCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 5
  },
  image: {
    flex: 1,
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
    borderRadius: 15
  }
})