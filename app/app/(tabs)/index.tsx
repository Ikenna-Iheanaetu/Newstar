import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakingNews from "@/components/breakingNews";
import FetchErrorView from "@/components/fetchErrorView";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import { Colors } from "@/constants/Colors";
import { getBreakingNews } from "@/lib/fetchNews";
import { ArticlesProps, NewsDataType } from "@/types";

export default function Index() {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<ArticlesProps[]>([]);
  const { data, loading, error, refetch } = getBreakingNews();

  useEffect(() => {
    if (data) {
      setBreakingNews(data);
    }
  }, [data]);

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.black}
          style={styles.indicator}
        />
      ) : error ? (
        <FetchErrorView onPress={refetch} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    marginTop: 20,
  },
});