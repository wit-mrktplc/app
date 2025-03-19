import { Stack } from "expo-router";

export default function SellLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[query]" options={{ headerShown: false }} />
    </Stack>
  );
}
