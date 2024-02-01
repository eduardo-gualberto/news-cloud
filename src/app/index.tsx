import { Redirect, Stack } from 'expo-router';
import AppState from '@Aplication/GlobalState';
import state from '@Aplication/GlobalState/state';

export default function index() {
  return (
    <AppState.Provider value={state}>
      <Redirect href={"/(tabs)/home"} />
    </AppState.Provider>
  )
}