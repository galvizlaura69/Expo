import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from "../context/userContext";


export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <UserProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
