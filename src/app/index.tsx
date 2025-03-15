import { TouchableOpacity, View, Alert, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useEffect } from "react";

import axios from "axios";

import tw from "twrnc";
import { authenticate } from "@/store/auth/auth-slice";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const authed = useAppSelector((state) => state.auth.authed);
  const dispatch = useAppDispatch();

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
          onPress={() => {
            console.log("[AUTH] Logging in with Wentworth");
            axios
              .post("https://mrktplc.alonsofroeling.com/auth/enter", {
                email: "webbj@wit.edu",
              })
              .then((res) => {
                Alert.alert("Success", "You have been authenticated!");
                dispatch(authenticate({ authed: true, token: res.data.token }));
              })
              .catch((err) => {
                console.log(err);
                Alert.alert("Error", "An error occurred while authenticating.");
              });
          }}
        >
          <ThemedText style={tw`text-black font-bold text-lg`}>
            Log in with Wentworth
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}
