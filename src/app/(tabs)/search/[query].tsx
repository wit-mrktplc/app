import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

export default function QueryScreen() {
  const { query } = useLocalSearchParams();

  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView style={tw`flex-1 gap-2`}>
        <ThemedText type="title">{query}</ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
