import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppDispatch } from "@/hooks/useApp";
import { prepend } from "@/store/notification/notification-slice";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Pressable, Alert } from "react-native";
import tw from "twrnc";

export default function ListingScreen() {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams();

  // get item with id here...

  function addNotification() {
    Alert.alert(`You are now negotiating ${id}`);
    dispatch(
      prepend({
        id: Math.floor(Math.random() * 1000).toString(),
        title: `Negotiating ${id}`,
        message: "You are now negotiating this item",
        timestamp: 1,
      })
    );
  }

  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView style={tw`flex-1 gap-2`}>
        <ThemedText type="title">{id}</ThemedText>
        <Pressable
          style={tw`bg-blue-500 p-2 rounded-md`}
          onPress={addNotification}
        >
          <ThemedText type="default">Negotiate</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
