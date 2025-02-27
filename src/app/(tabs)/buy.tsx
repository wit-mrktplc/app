import { Alert, Pressable, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlashList } from "@shopify/flash-list";

interface FlashItem {
  id: number;
  title: string;
}

const mockData: FlashItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
}));

export default function BuyScreen() {
  const renderItem = ({ item }: { item: FlashItem }) => (
    <Pressable
      onPress={() => {
        Alert.alert(`You selected ${item.title}`);
      }}
      style={tw`flex-col p-2`}
    >
      <ScrollView horizontal style={tw`flex-row mb-1`}>
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
      </ScrollView>
      <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1`}>
        <FlashList
          data={mockData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={220}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

function ImagePlaceholder() {
  return (
    <ThemedView
      style={tw`w-45 h-45 bg-blue-400 rounded justify-center items-center mr-1`}
    />
  );
}
