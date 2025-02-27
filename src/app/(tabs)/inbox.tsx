import { Pressable, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { prepend, removeById } from "@/store/notification/notification-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import tw from "twrnc";

const names = ["Diego", "Matt", "Nico", "Cauã"];

export default function InboxScreen() {
  const notificationState = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  function addNotification() {
    dispatch(
      prepend({
        id: Math.random().toString(36).substring(7),
        title: "New Message",
        message: `You have a new message from ${
          names[Math.floor(Math.random() * names.length)]
        }`,
        timestamp: Date.now(),
      })
    );
  }

  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView style={tw`flex-1 gap-2`}>
        <ThemedText type="title">Inbox</ThemedText>
        <Pressable onPress={addNotification}>
          <ThemedText type="link">Add Notification</ThemedText>
        </Pressable>

        {notificationState.notifications.map((notification) => (
          <Pressable
            onPress={() => {
              dispatch(removeById(notification.id));
            }}
            key={notification.id}
            style={tw`p-1`}
          >
            <ThemedText type="defaultSemiBold">{notification.title}</ThemedText>
            <ThemedText type="default">{notification.message}</ThemedText>
          </Pressable>
        ))}
      </SafeAreaView>
    </ThemedView>
  );
}
