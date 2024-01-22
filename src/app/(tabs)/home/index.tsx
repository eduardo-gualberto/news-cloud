import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appStyles from '../../styles';

import HorizontalCarousel from '../../components/HorizontalCarousel';
import { signal } from '@preact/signals-react';

const { smallText, mediumText, whiteText } = appStyles

const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`
}

const fuck = signal(0)

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <HorizontalCarousel items={[1, 2, 3, 4, 5]} itemGap={15} itemRenderer={(item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              console.log(item, key);
              fuck.value = key
            }}
            style={{ borderWidth: 2, borderColor: generateRandomHexColor(), height: 35, width: 150, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={[smallText, whiteText]}> card {item}</Text>
          </TouchableOpacity>
        )} />
        <Text style={[smallText, whiteText]}>Selecionado: {fuck.value}</Text>
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
    paddingTop: 50
  },
});