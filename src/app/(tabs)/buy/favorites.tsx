import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import supabase from "@/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";

interface FlashItem {
  id: number;
  title: string;
}

async function getListing() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("domain", "wit.edu");
  if (error) {
    console.error("Error fetching listings:", error);
    return [];
  }

  return data;
}

export default function FavoritesScreen() {
  const [listings, setListings] = useState<FlashItem[]>([]);

  useEffect(() => {
    getListing().then((data) => {
      if (data) {
        setListings(data);
      }
    });
  }, []);

  const renderItem = ({ item }: { item: FlashItem }) => {
    return (
      <Link
        href={{
          pathname: "/(tabs)/buy/[id]",
          params: { id: item.id },
        }}
        style={tw`flex-col p-2`}
      >
        <ScrollView horizontal style={tw`flex-row mb-1`}>
          <ThemedView
            style={tw`size-45 bg-blue-400 rounded justify-center items-center mr-1`}
          />
          <ThemedView
            style={tw`size-45 bg-blue-400 rounded justify-center items-center mr-1`}
          />
        </ScrollView>
        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
      </Link>
    );
  };

  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView />
      <FlashList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={220}
      />
    </ThemedView>
  );
}
