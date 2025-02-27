import { Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import tw from "twrnc";

export default function SellScreen() {
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
        <ThemedText type="title">Sell</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
