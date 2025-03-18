import { Pressable, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { removeById } from "@/store/notification/notification-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import tw from "twrnc";
import { useEffect } from "react";
import { router } from "expo-router";

export default function InboxScreen() {
  const notificationState = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authed) {
      router.replace("/");
    }
  }, [auth.authed]);

  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView />
      <ThemedText type="title">Inbox</ThemedText>

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
    </ThemedView>
  );
}
