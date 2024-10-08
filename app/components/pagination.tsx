import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { ArticlesProps, NewsDataType } from "@/types";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PaginationProps {
  items: ArticlesProps[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
}

export default function Pagination({
  items,
  paginationIndex,
  scrollX,
}: PaginationProps) {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationIndex === index ? Colors.tint : Colors.darkGrey,
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
