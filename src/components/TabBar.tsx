import { Pressable, View, Text } from "react-native";
import tw from "twrnc";
import { HapticTab } from "./HapticTab";
import {
  AlignJustifyIcon,
  InboxIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useApp";
import {
  MagnifyingGlass,
  ShoppingBagOpen,
  Tag,
  ChatCentered,
} from "phosphor-react-native";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

type IconName = "buy" | "search" | "sell" | "inbox";

type IconType = {
  [key in IconName]: (focused: boolean) => JSX.Element;
};

const icons: IconType = {
  buy(focused: boolean) {
    return (
      <ShoppingBagOpen
        weight={focused ? "fill" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={22}
        // strokeWidth={focused ? 2 : 1.5}
        // fill={focused ? "#fff" : "transparent"}
      />
    );
  },
  search(focused: boolean) {
    return (
      <MagnifyingGlass
        weight={focused ? "bold" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={22}
      />
    );
  },
  sell(focused: boolean) {
    return (
      <Tag
        weight={focused ? "fill" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={22}
      />
    );
  },
  inbox(focused: boolean) {
    return <ChatCentered weight="fill" style={tw`text-white`} size={22} />;
  },
};

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const notificationCount = useAppSelector((state) => state.notification.count);

  const availableRoutes = ["buy", "search", "sell"];
  const inboxRoute = state.routes.find((route: any) => route.name === "inbox");
  const [selectedRoute, setSelectedRoute] = useState(0);

  useEffect(() => {
    setSelectedRoute(
      state.routes.find(
        (route: any) => route.name === state.routeNames[state.index]
      )
    );
  }, [state]);

  return (
    <>
      {/* <View
        style={tw`bg-red-500 absolute rounded-full bottom-10 left-12 size-10 justify-center items-center`}
      >
        <Text style={tw`text-white text-xs`}>{100}</Text>
      </View> */}
      {inboxRoute && notificationCount > 0 && (
        <HapticTab
          onPress={() => {
            const event = navigation.emit({
              type: "tabPress",
              target: inboxRoute.key,
              canPreventDefault: true,
            });
            if (selectedRoute !== inboxRoute && !event.defaultPrevented) {
              navigation.navigate(inboxRoute.name);
            }
          }}
          style={tw`bg-amber-600 absolute rounded-full bottom-10 right-12 size-10 justify-center items-center`}
        >
          {icons.inbox(selectedRoute === inboxRoute)}
          <Text style={tw`text-amber-700 font-bold text-[10px] absolute`}>
            {notificationCount}
          </Text>
        </HapticTab>
      )}
      <View
        style={tw`flex-row absolute bottom-10 justify-center items-center w-full`}
      >
        <View
          style={{
            ...tw`px-2 py-0.5 flex-row justify-between items-center bg-[#1e1e1e] rounded-full`,
            borderCurve: "continuous",
          }}
        >
          {availableRoutes.map((name: string, index: number) => {
            const route = state.routes.find(
              (route: any) => route.name === name
            );
            const isFocused = selectedRoute === route;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <HapticTab
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
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
}
