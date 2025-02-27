import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";
import tw from "twrnc";

export default function SellScreen() {
  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView style={tw`flex-1`}>
        <ThemedText type="title">Sell</ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
