import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";

interface FlashItem {
  id: number;
  title: string;
}

const mockData: FlashItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
}));

export default function BuyScreen() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const renderItem = ({ item }: { item: FlashItem }) => (
    <Pressable
      onPress={() => {
        setSelectedId(item.id);
        Alert.alert(`You selected ${item.title}`);
      }}
      style={listStyles.itemContainer}
    >
      <ScrollView horizontal style={listStyles.imagesContainer}>
        <ThemedView style={listStyles.imagePlaceholder}>
          <ThemedText style={listStyles.imageText}>IMG</ThemedText>
        </ThemedView>
        <ThemedView style={listStyles.imagePlaceholder}>
          <ThemedText style={listStyles.imageText}>IMG</ThemedText>
        </ThemedView>
        <ThemedView style={listStyles.imagePlaceholder}>
          <ThemedText style={listStyles.imageText}>IMG</ThemedText>
        </ThemedView>
      </ScrollView>
      <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={styles.background}>
      <SafeAreaView style={styles.page}>
        <ThemedView style={styles.page}>
          <FlashList
            data={mockData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={220}
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  page: {
    flex: 1,
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

const listStyles = StyleSheet.create({
  itemContainer: {
    overflowX: "scroll",
    flexDirection: "column",
    padding: 8,
  },
  imagesContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  imageText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
