import { StyleSheet, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { prepend, removeById } from "@/store/notification/notification-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useEffect } from "react";
import tw from "twrnc";

const names = ["Diego", "Matt", "Nico", "Cauã"];

export default function InboxScreen() {
  const notificationState = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  function addNotification() {
    // Add a notification to the store
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.page}>
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
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  page: {
    flex: 1,
    gap: 8,
  },
});
