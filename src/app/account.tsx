import { Pressable, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { deauthenticate } from "@/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import tw from "twrnc";
import { router } from "expo-router";
import { useEffect } from "react";

export default function AccountScreen() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authed) {
      router.replace("/");
    }
  }, [auth.authed]);

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
