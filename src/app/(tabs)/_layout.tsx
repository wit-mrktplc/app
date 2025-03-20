import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useApp";

import { View } from "react-native";

import tw from "twrnc";
import { HapticTab } from "@/components/HapticTab";
import { icons } from "@/components/TabBarIcons";

export default function TabLayout() {
  const auth = useAppSelector((state) => state.auth);
  const notification = useAppSelector((state) => state.notification);

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
          tabBar={({ state, descriptors, navigation, insets }) => {
            const currentRoute = state.routes[state.index];

            const routes = {
              buy: state.routes.find((route) => route.name === "buy")!,
              search: state.routes.find((route) => route.name === "search")!,
              sell: state.routes.find((route) => route.name === "sell")!,
            };

            return (
              <>
                {/* Conditionally render the return button */}
                {currentRoute.state &&
                currentRoute.state.index &&
                currentRoute.state.index > 0 ? (
                  <View
                    style={tw`bg-[#1e1e1e] absolute rounded-full bottom-10 left-15 size-11 justify-center items-center`}
                  >
                    <HapticTab
                      onPress={() => {
                        router.back();
                      }}
                      style={tw`rounded-full p-2.5`}
                    >
                      {icons.back(false)}
                    </HapticTab>
                  </View>
                ) : null}

                {/* Conditionally render the inbox button */}
                {notification.count > 0 ? (
                  <View
                    style={tw`bg-[#1e1e1e] absolute rounded-full bottom-10 right-15 size-11 justify-center items-center`}
                  >
                    <HapticTab
                      onPress={() => {
                        navigation.navigate("inbox");
                      }}
                      style={tw`rounded-full p-2.5`}
                    >
                      {icons.inbox(currentRoute.name === "inbox")}
                    </HapticTab>
                  </View>
                ) : null}

                {/* Render the tab bar with selected routes */}
                <View
                  style={tw`flex-row absolute bottom-10 justify-center items-center w-full`}
                >
                  <View
                    style={{
                      ...tw`px-2 py-0.5 flex-row justify-between items-center bg-[#1e1e1e] rounded-full`,
                      borderCurve: "continuous",
                    }}
                  >
                    {Object.values(routes).map((route) => {
                      let isFocused = currentRoute.name === route.name;

                      const onPress = () => {
                        if (currentRoute.name === route.name) {
                          if (
                            currentRoute.state &&
                            currentRoute.state.index &&
                            currentRoute.state.index > 0
                          ) {
                            router.dismissAll();
                            return;
                          }
                        }
                        navigation.navigate(route.name);
                      };

                      return (
                        <HapticTab
                          key={route.key}
                          accessibilityRole="button"
                          accessibilityState={
                            currentRoute.name === route.name
                              ? { selected: true }
                              : {}
                          }
                          onPress={onPress}
                          style={tw`px-3 py-2 rounded-full`}
                        >
                          {/* @ts-ignore */}
                          {icons[route.name](isFocused)}
                        </HapticTab>
                      );
                    })}
                  </View>
                </View>
              </>
            );
          }}
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </>
  );
}
