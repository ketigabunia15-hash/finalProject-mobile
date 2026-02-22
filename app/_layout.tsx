import { Stack } from "expo-router";
import { StoreProvider } from "../context/storeContext";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </StoreProvider>
  );
}
