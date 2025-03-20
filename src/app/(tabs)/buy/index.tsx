import { Alert, Pressable, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";

import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function BuyScreen() {
  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView>
        <Link
          href={{
            pathname: "/(tabs)/buy/favorites",
          }}
          style={tw`p-2`}
        >
          <ScrollView horizontal style={tw`flex-row mb-1 w-full`}>
            <ThemedView
              style={tw`h-20 w-20 bg-blue-400 rounded justify-center items-center mr-1`}
            />
            <ThemedView
              style={tw`h-20 w-20 bg-blue-400 rounded justify-center items-center mr-1`}
            />
          </ScrollView>
          <ThemedText type="defaultSemiBold">Favorites</ThemedText>
        </Link>
      </SafeAreaView>
    </ThemedView>
  );
}
