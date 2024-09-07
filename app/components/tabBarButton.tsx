import { Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { icon } from "@/constants/Icons";
import { Colors } from "@/constants/Colors";

interface TabBarButtonProps {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  label: string;
}

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: TabBarButtonProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 50 }
    );
  }, [opacity, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);

    return {
      opacity: opacityValue,
    };
  });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarBtn}
    >
      {icon[routeName]({
        color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
        focused: isFocused,
      })}
      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
