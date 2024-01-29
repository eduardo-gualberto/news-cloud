import { Redirect } from 'expo-router';
import AppState from '../aplication/GlobalState';
import state from '../aplication/GlobalState/state';

export default function index() {
  return (
    <AppState.Provider value={state}>
      <Redirect href={"/(tabs)/home"} />
    </AppState.Provider>
  )
}