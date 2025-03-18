import { Alert, Pressable, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { useAppDispatch } from "@/hooks/useApp";
import { prepend } from "@/store/notification/notification-slice";

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

export default function BuyScreen() {
  const dispatch = useAppDispatch();

  const [listings, setListings] = useState<FlashItem[]>([]);

  useEffect(() => {
    getListing().then((data) => {
      if (data) {
        setListings(data);
      }
    });
  }, []);

  const renderItem = ({ item }: { item: FlashItem }) => {
    function addNotification() {
      Alert.alert(`You are now negotiating ${item.title}`);
      dispatch(
        prepend({
          id: Math.floor(Math.random() * 1000).toString(),
          title: `Negotiating ${item.title}`,
          message: "You are now negotiating this item",
          timestamp: 1,
        })
      );
    }

    return (
      <Pressable onPress={addNotification} style={tw`flex-col p-2`}>
        <ScrollView horizontal style={tw`flex-row mb-1`}>
          <ImagePlaceholder />
          <ImagePlaceholder />
          <ImagePlaceholder />
        </ScrollView>
        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
      </Pressable>
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

function ImagePlaceholder() {
  return (
    <ThemedView
      style={tw`w-45 h-45 bg-blue-400 rounded justify-center items-center mr-1`}
    />
  );
}
