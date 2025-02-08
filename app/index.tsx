import { Pressable, StyleSheet } from "react-native";
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
import { authenticate, AuthState } from "@/store/auth-slice";
import { useEffect } from "react";

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
    path: "192.168.1.123:8081/v1",
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
      console.log("[AUTH] Misploced user is authed, redirecting to /v1");
      router.replace("/v1/buy");
    }
  }, [authed]);

  return (
    <ThemedView style={styles.background}>
      <SafeAreaView style={styles.page}>
        <ThemedText type="title">Authenticate</ThemedText>
        <Pressable
          disabled={!request}
          onPress={() => {
            console.log("[AUTH] Prompting user to authenticate");
            promptAsync().then((codeResponse) => {
              if (request && codeResponse?.type === "success" && discovery) {
                console.log("[AUTH] Exchanging code for token");
                exchangeCodeAsync(
                  {
                    clientId,
                    code: codeResponse.params.code,
                    extraParams: request.codeVerifier
                      ? { code_verifier: request.codeVerifier }
                      : undefined,
                    redirectUri,
                  },
                  discovery
                ).then((res) => {
                  console.log("[AUTH] Token exchange successful");
                  dispatch(
                    authenticate({
                      accessToken: res.accessToken,
                      idToken: res.idToken,
                      refreshToken: res.refreshToken,
                    } as Omit<AuthState, "user">)
                  );
                  console.log("[AUTH] Redirecting to /v1");
                  router.replace("/v1/buy");
                });
              }
            });
          }}
        >
          <ThemedText type="link">Authenticate</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  page: {
    padding: 16,
    flex: 1,
    gap: 8,
  },
});
