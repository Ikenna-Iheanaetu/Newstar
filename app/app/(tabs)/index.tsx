import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakingNews from "@/components/breakingNews";
import FetchErrorView from "@/components/fetchErrorView";
import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import { Colors } from "@/constants/Colors";
import { getBreakingNews, getNewsByCategory } from "@/lib/fetchNews";
import { ArticlesProps, NewsDataType } from "@/types";
import Categories from "@/components/categories";
import NewsByCategory from "@/components/newsByCategory";
import { NewsByCategoryType } from "@/types/newsByCategory";
import newsCategoryList from "@/constants/Categories";

export default function Index() {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<ArticlesProps[]>([]);
  const [newsByCategory, setNewsByCategory] = useState<NewsByCategoryType>({});
  const [activeNewsCategoryIndex, setActiveNewsCategoryIndex] =
    useState<number>(0);

  const {
    data: breakingNewsFetch,
    loading,
    error,
    refetch,
  } = getBreakingNews();

  const {
    data: newsCategory,
    loading: newsCategoryLoading,
    error: newsCategoryError,
    refetch: newsCategoryRefetch,
  } = getNewsByCategory(
    newsCategoryList[activeNewsCategoryIndex]?.slug || "general"
  );

  useEffect(() => {
    if (breakingNewsFetch) {
      setBreakingNews(breakingNewsFetch);
    }
  }, [breakingNewsFetch]);

  useEffect(() => {
    if (newsCategory) {
      setNewsByCategory((prev) => ({
        ...prev,
        [newsCategoryList[activeNewsCategoryIndex]?.slug]: newsCategory,
      }));
    }
  }, [newsCategory, activeNewsCategoryIndex]);

  const onCategoryChange = (index: number) => {
    const selectedCategorySlug = newsCategoryList[index].slug;

    // Check if the selected category already has data
    if (
      !newsByCategory[selectedCategorySlug] ||
      newsByCategory[selectedCategorySlug].length === 0
    ) {
      newsCategoryRefetch(); // Only fetch new data if there's no data for the selected category
    }

    setActiveNewsCategoryIndex(index);
  };

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
      <>
        <Categories
          activeNewsCategoryIndex={activeNewsCategoryIndex}
          setActiveNewsCategoryIndex={setActiveNewsCategoryIndex}
          onCategoryChange={onCategoryChange}
        />
        <NewsByCategory
          newsByCategory={newsByCategory}
          activeNewsSlug={newsCategoryList[activeNewsCategoryIndex]?.slug}
          newsCategoryRefetch={newsCategoryRefetch}
          newsCategoryLoading={newsCategoryLoading}
          newsCategoryError={newsCategoryError}
        />
      </>
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
