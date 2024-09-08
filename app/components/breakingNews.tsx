import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import NewsSlider from "./newsSlider";

interface BreakingNewsProps {
  newsList: NewsDataType[] | null;
}

export default function BreakingNews({ newsList }: BreakingNewsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <FlatList
          data={newsList}
          keyExtractor={(_, index) => `list_item ${index}`}
          renderItem={({ item, index }) => (
            <NewsSlider item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
