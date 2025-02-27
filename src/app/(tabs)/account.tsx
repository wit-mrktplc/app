import { Pressable, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { deauthenticate } from "@/store/auth/auth-slice";
import { useAppDispatch } from "@/hooks/useApp";
import tw from "twrnc";

export default function AccountScreen() {
  const dispatch = useAppDispatch();

  return (
    <ThemedView style={tw`flex-1 p-4`}>
      <SafeAreaView style={tw`flex-1 gap-2`}>
        <ThemedText type="title">Account</ThemedText>
        <Pressable
          onPress={() => {
            dispatch(deauthenticate());
          }}
        >
          <ThemedText type="link">Sign Out</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
