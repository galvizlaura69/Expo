import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SaintProvider } from "../context/SaintContext";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SaintProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SaintProvider>
    </GestureHandlerRootView>
  );
}
