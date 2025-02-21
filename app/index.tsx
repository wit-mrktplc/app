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
  refreshAsync,
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
        <ThemedText
          type="default"
          style={{
            maxWidth: 300,
            textAlign: "center",
            marginInline: "auto",
            opacity: 0.6,
          }}
        >
          mrktplc serves as local trade center for college students, allowing
          second-hand distribution of all things college.
        </ThemedText>
        <View
          style={{
            flexDirection: "column",
            gap: 8,
            marginInline: 32,
          }}
        >
          <TouchableOpacity
            style={styles.mainButton}
            disabled={!request}
            onPress={() => {
              console.log("[AUTH] Prompting user to authenticate");
              promptAsync().then((codeResponse) => {
                console.log("[AUTH] Code response", codeResponse);
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
                    console.log("[AUTH] Response", res);
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
            <Text style={styles.mainText}>Log in with Wentworth email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondButton}
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
            <Text style={styles.secondText}>Request your college</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    maxWidth: "auto",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 999,
  },
  mainText: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 20,
  },
  secondButton: {
    padding: 16,
    backgroundColor: "transparent",
    borderRadius: 999,
  },
  secondText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
    opacity: 0.6,
  },
  background: {
    flex: 1,
  },
  page: {
    padding: 16,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 24,
  },
});
