import { StyleSheet, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { deauthenticate } from "@/store/auth-slice";
import { useAppDispatch } from "@/hooks/useApp";

export default function AccountScreen() {
  const dispatch = useAppDispatch();

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
        <ThemedText type="title">Account</ThemedText>
        <Pressable
          onPress={() => {
            dispatch(deauthenticate());
          }}
        >
          <ThemedText type="link">Sign Out</ThemedText>
        </Pressable>
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
