import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Theme = "primary" | "secondary" | "danger" | "outline" | "space";
type Size = "xs"|"sm" | "md" | "lg" | "xl" | "xxl";
type Shape = "default" | "circle";

type Props = {
  label?: string;
  theme?: Theme;
  size?: Size;
  shape?: Shape;
  icon?: keyof typeof FontAwesome.glyphMap | keyof typeof MaterialIcons.glyphMap;
  iconSet?: "FontAwesome" | "MaterialIcons";
  onPress?: () => void;
  testID?:string
};

export default function Button({
  label,
  theme = "primary",
  size = "md",
  shape = "default",
  icon,
  iconSet = "FontAwesome",
  onPress,
  testID,
}: Props) {
  const themeStyles = themes[theme];
  const sizeStyles = sizes[size];
  const isCircle = shape === "circle";

  const IconComponent = iconSet === "MaterialIcons" ? MaterialIcons : FontAwesome;

  return (
    <View
      style={[
        styles.buttonContainer,
        sizeStyles.container,
        isCircle && {
          ...styles.circleButtonContainer,
          width: (sizeStyles.container.height as number) / 2,
          height: (sizeStyles.container.height as number) / 2,
          borderRadius: (sizeStyles.container.height as number) / 4,
        }
      ]}
    >
      <Pressable
        style={[
          styles.button,
          themeStyles.button,
          sizeStyles.button,
        ]}
        testID={testID}
        onPress={onPress}
      >
        {icon && (
          <IconComponent
            name={icon as any}
            size={sizeStyles.iconSize}
            color={themeStyles.text.color}
            style={label ? styles.buttonIcon : undefined}
          />
        )}
        {label && (
          <Text style={[styles.buttonLabel, themeStyles.text, sizeStyles.text]}>
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const themes: Record<
  Theme,
  { button: ViewStyle; text: TextStyle }
> = {
  primary: {
    button: { backgroundColor: "#fff", borderWidth: 2, borderColor: "green" },
    text: { color: "green" },
  },
  secondary: {
    button: { backgroundColor: "#333", borderWidth: 2, borderColor: "#333" },
    text: { color: "#fff" },
  },
  danger: {
    button: { backgroundColor: "#fff", borderWidth: 2, borderColor: "red" },
    text: { color: "red" },
  },
  outline: {
    button: { backgroundColor: "transparent", borderWidth: 2, borderColor: "#888" },
    text: { color: "#888" },
  },
  space:
  {
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: "100%",
      backgroundColor: '#fff',
    },
    text: { color: "#888" },
  },
};

const sizes: Record<
  Size,
  { container: ViewStyle; button: ViewStyle; text: TextStyle; iconSize: number }
> = {
  xs: {
    container: { width: 90, height: 40 },
    button: { borderRadius: 3 },
    text: { fontSize: 6 },
    iconSize: 7,
  },
  sm: {
    container: { width: 120, height: 40 },
    button: { borderRadius: 6 },
    text: { fontSize: 12 },
    iconSize: 14,
  },
  md: {
    container: { width: 180, height: 50 },
    button: { borderRadius: 10 },
    text: { fontSize: 16 },
    iconSize: 18,
  },
  lg: {
    container: { width: 220, height: 60 },
    button: { borderRadius: 12 },
    text: { fontSize: 18 },
    iconSize: 22,
  },
  xl: {
    container: { width: 260, height: 70 },
    button: { borderRadius: 16 },
    text: { fontSize: 22 },
    iconSize: 26,
  },
  xxl: {
    container: { width: 450, height: 140 },
    button: { borderRadius: 32 },
    text: { fontSize: 44 },
    iconSize: 50,
  },
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonLabel: {
    fontWeight: "600",
  },
  circleButtonContainer: {
    marginHorizontal: 20,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
});
