import { TouchableOpacity, View, Alert, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import { useAppSelector } from "@/hooks/useApp";
import { useEffect } from "react";

import tw from "twrnc";
import { supabase } from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const authed = useAppSelector((state) => state.auth.authed);

  useEffect(() => {
    if (authed) {
      console.log(
        "[AUTH] Misploced user is authed, redirecting to /(tabs)/buy"
      );
      router.replace("/(tabs)/buy");
    }
  }, [authed]);

  return (
    <ThemedView style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1 flex-col justify-end items-center gap-2`}>
        <ThemedText style={tw`text-center text-sm mx-4 opacity-60 `}>
          mrktplc serves as local trade center for college students, allowing
          second-hand distribution of all things college.
        </ThemedText>

        <View style={tw`pt-4`} />

        <TouchableOpacity
          style={tw`bg-white rounded-full px-4.5 py-2.5`}
          onPress={handleLogin}
        >
          <ThemedText style={tw`text-black font-bold text-lg`}>
            Log in with Wentworth
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

function handleLogin() {
  // For iOS using Alert.prompt
  if (Platform.OS === "ios") {
    Alert.prompt(
      "Login",
      "Enter your email address",
      async (email) => {
        if (email.endsWith("@wit.edu")) {
          const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
              // set this to false if you do not want the user to be automatically signed up
              shouldCreateUser: true,
              emailRedirectTo: "https://example.com/welcome",
            },
          });
          if (error) {
            Alert.alert("Error", error.message);
          } else {
            Alert.alert("Success", "Check your email for the magic link!");
          }
        }
      },
      "plain-text"
    );
  } else {
    // For Android, you could use a custom modal input
    Alert.alert(
      "Unavailable",
      "Magic link prompt is not available on Android. Please implement a custom modal for email input."
    );
  }
}
