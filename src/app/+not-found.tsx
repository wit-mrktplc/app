import { Link, Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import tw from "twrnc";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={tw`flex-1 items-center justify-center p-5`}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/(tabs)/buy" style={tw`mt-4 py-4`}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
