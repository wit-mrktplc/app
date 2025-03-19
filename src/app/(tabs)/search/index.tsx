import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

export default function SearchScreen() {
  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView />
      <ThemedText type="title">Search</ThemedText>
      <Link
        href={{
          pathname: "/(tabs)/search/[query]",
          params: { query: "test" },
        }}
        style={tw`flex-col p-2`}
      >
        <ThemedText type="default">Search for test</ThemedText>
      </Link>
    </ThemedView>
  );
}
