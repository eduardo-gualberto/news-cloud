import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import appStyle from '../../styles'

const { bigText, whiteText } = appStyle

export default function Search() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={[bigText, whiteText]}>Search Page</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
