import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useApp";

import tw from "twrnc";
import {
  ShoppingCartIcon,
  AlignJustifyIcon,
  SearchIcon,
} from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import { BlurView } from "expo-blur";

export default function TabLayout() {
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
            tint="dark"
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          ...tw`absolute pt-2 h-14 bg-transparent mb-8 mx-26 rounded-full overflow-hidden`,
        },
      }}
    >
      <Tabs.Screen
        name="buy"
        options={{
          tabBarIcon: ({ focused }) => (
            <ShoppingCartIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"} `}
              size={24}
              fill={focused ? "white" : "transparent"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
              size={24}
              strokeWidth={focused ? 2.5 : 1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: ({ focused }) => (
            <AlignJustifyIcon
              style={tw`${focused ? "text-white" : "text-[#8F8F8F]"}`}
              size={24}
              strokeWidth={focused ? 2.5 : 1.5}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
