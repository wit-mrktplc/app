import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppSelector } from "@/hooks/useApp";

import tw from "twrnc";
import {
  InboxIcon,
  ListIcon,
  ShoppingCartIcon,
  UserRoundIcon,
} from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { Platform, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const auth = useAppSelector((state) => state.auth);

  const notificationCount = useAppSelector((state) => state.notification.count);

  useEffect(() => {
    if (!auth.authed) {
      console.log("[AUTH] User is not authed, redirecting to /");
      router.replace("/");
    }
  }, [auth.authed]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            style={tw`absolute top-0 left-0 right-0 bottom-0`}
            intensity={100}
            tint={colorScheme === "dark" ? "dark" : "light"}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          paddingTop: 8,
          height: 88,
          backgroundColor: "transparent",
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="buy"
        options={{
          tabBarIcon: ({ focused }) => (
            <ShoppingCartIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: ({ focused }) => (
            <ListIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tw`relative`}>
              {notificationCount > 0 ? (
                notificationCount < 10 ? (
                  <View
                    style={tw`absolute z-10 -top-1 -right-2 bg-[#26B555] size-4 rounded-full flex items-center justify-center`}
                  >
                    <ThemedText
                      type="default"
                      style={tw`text-[#1F2123] text-xs font-semibold`}
                    >
                      {notificationCount}
                    </ThemedText>
                  </View>
                ) : (
                  <View
                    style={tw`absolute z-10 -top-1 -right-2 bg-[#26B555] h-4 px-0.5 rounded-full flex items-center justify-center`}
                  >
                    <ThemedText
                      type="default"
                      style={tw`text-[#1F2123] text-xs font-semibold`}
                    >
                      {notificationCount}
                    </ThemedText>
                  </View>
                )
              ) : null}
              <InboxIcon
                style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <UserRoundIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
