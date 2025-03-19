import tw from "twrnc";

import {
  MagnifyingGlass,
  ShoppingBagOpen,
  Tag,
  ChatCentered,
  CaretLeft,
} from "phosphor-react-native";

type IconName = "buy" | "search" | "sell" | "inbox" | "back";

type IconType = {
  [key in IconName]: (focused: boolean) => JSX.Element;
};

export const icons: IconType = {
  back(focused: boolean) {
    return <CaretLeft style={tw`text-white/60`} size={20} weight="bold" />;
  },
  buy(focused: boolean) {
    return (
      <ShoppingBagOpen
        weight={focused ? "fill" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={24}
      />
    );
  },
  search(focused: boolean) {
    return (
      <MagnifyingGlass
        weight={focused ? "bold" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={24}
      />
    );
  },
  sell(focused: boolean) {
    return (
      <Tag
        weight={focused ? "fill" : "regular"}
        style={tw`${focused ? "text-white" : "text-white/60"}`}
        size={24}
      />
    );
  },
  inbox(focused: boolean) {
    return <ChatCentered weight="fill" style={tw`text-white`} size={25} />;
  },
};
