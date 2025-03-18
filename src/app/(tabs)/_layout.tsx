import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useApp";

import { TabBar } from "@/components/TabBar";
import { View } from "react-native";

export default function TabLayout() {
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authed) {
      console.log("[AUTH] User is not authed, redirecting to /");
      router.replace("/");
    }
  }, [auth.authed]);

  return (
    <>
      <View style={{ flex: 1, position: "relative" }}>
        <Tabs
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </>
  );
}
