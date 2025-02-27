import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { authenticate, AuthState } from "@/store/auth/auth-slice";
import { useEffect } from "react";

import tw from "twrnc";

WebBrowser.maybeCompleteAuthSession();

const clientId = process.env.EXPO_PUBLIC_AZURE_CLIENT_ID as string;

export default function AuthScreen() {
  const authed = useAppSelector((state) => state.auth.authed);
  const dispatch = useAppDispatch();

  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/common`
  );

  const redirectUri = makeRedirectUri({
    scheme: "com.adomaitisc.expoapp",
    path: "192.168.1.123:8081/(tabs)",
  });

  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
    },
    discovery
  );

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
          disabled={!request}
          onPress={() => {
            dispatch(
              authenticate({
                accessToken:
                  "eyJhbGciOiJIUzI1NiJ9.e30.vUjB4DqhuHE6PAl-KJnqXwpD2cRmdrJQqUYEuMcqT4U",
                idToken:
                  "eyJhbGciOiJIUzI1NiJ9.e30.vUjB4DqhuHE6PAl-KJnqXwpD2cRmdrJQqUYEuMcqT4U",
                refreshToken:
                  "eyJhbGciOiJIUzI1NiJ9.e30.vUjB4DqhuHE6PAl-KJnqXwpD2cRmdrJQqUYEuMcqT4U",
              } as Omit<AuthState, "user">)
            );
            console.log("[AUTH] Redirecting to /(tabs)/buy");
            // router.replace("/(tabs)/buy");
            // console.log("[AUTH] Prompting user to authenticate");
            // promptAsync().then((codeResponse) => {
            //   console.log("[AUTH] Code response", codeResponse);
            //   if (request && codeResponse?.type === "success" && discovery) {
            //     console.log("[AUTH] Exchanging code for token");
            //     exchangeCodeAsync(
            //       {
            //         clientId,
            //         code: codeResponse.params.code,
            //         extraParams: request.codeVerifier
            //           ? { code_verifier: request.codeVerifier }
            //           : undefined,
            //         redirectUri,
            //       },
            //       discovery
            //     ).then((res) => {
            //       console.log("[AUTH] Token exchange successful");
            //       console.log("[AUTH] Response", res);
            //       dispatch(
            //         authenticate({
            //           accessToken: res.accessToken,
            //           idToken: res.idToken,
            //           refreshToken: res.refreshToken,
            //         } as Omit<AuthState, "user">)
            //       );
            //       console.log("[AUTH] Redirecting to /(tabs)/buy");
            //       router.replace("/(tabs)/buy");
            //     });
            //   }
            // });
          }}
        >
          <ThemedText style={tw`text-black font-bold text-lg`}>
            Log in with Wentworth email
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-2.5`}
          disabled={!request}
          onPress={() => {
            Alert.prompt("Enter your college name", "", (college) => {
              if (college) {
                Alert.alert(
                  "Request sent",
                  "If there's a host in your college, they'll be in touch soon."
                );
                console.log("[AUTH] Requesting college", college);
              }
            });
          }}
        >
          <Text style={tw`text-white opacity-60`}>Request your college</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}
