import { View, StyleSheet } from "react-native";
import React from "react";
import { ArticlesProps } from "@/types";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import Animated from "react-native-reanimated";
import { useDarkMode } from "@/context/darkModeProvider";

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
  const { Colors } = useDarkMode()

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
