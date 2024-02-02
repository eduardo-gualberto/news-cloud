import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { SearchBar } from '@rneui/themed'
import { SearchBarProps } from '@rneui/base'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signal } from '@preact/signals-react';
import { PropsWithChildren, useRef } from 'react';

type SearchBarRefType = TextInput & PropsWithChildren<SearchBarProps>

const searchText = signal('')

export default function Search() {

  const searchBarRef = useRef<SearchBarRefType>(null)

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
            // trigger search
            console.log("nativeEvent.text", nativeEvent.text)
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
});
