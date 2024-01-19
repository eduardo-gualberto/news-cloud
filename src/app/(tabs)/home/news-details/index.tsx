import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import appStyle from '../../../styles'

const { bigText } = appStyle

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Detail Page" }} />
      <View style={styles.container}>
        <Text style={[bigText]}>Detail Page</Text>
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
