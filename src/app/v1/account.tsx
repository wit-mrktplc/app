import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { deauthenticate } from "@/store/auth/auth-slice";
import { useAppDispatch } from "@/hooks/useApp";
import tw from "twrnc";

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
          style={tw`absolute bottom-[-90px] left-[-35px] text-gray-500`}
        />
      }
    >
      <ThemedView style={tw`flex-1 gap-2`}>
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
