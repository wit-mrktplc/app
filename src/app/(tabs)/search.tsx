import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

export default function SearchScreen() {
  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView />
      <ThemedText type="title">Search</ThemedText>
    </ThemedView>
  );
}
