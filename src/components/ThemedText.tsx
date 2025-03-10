import { Text, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import tw from "twrnc";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const themedTextTypes = {
  default: tw`text-base leading-6`,
  title: tw`text-2xl font-bold leading-8`,
  defaultSemiBold: tw`text-base font-semibold leading-6`,
  subtitle: tw`text-lg font-bold`,
  link: tw`text-base text-blue-500`,
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <Text style={[{ color }, themedTextTypes[type], style]} {...rest} />;
}
