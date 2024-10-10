import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BreakingNews from "@/components/breakingNews";
import FetchErrorView from "@/components/fetchErrorView";
import Header from "@/components/header";

import { getBreakingNews, getNewsByCategory } from "@/lib/fetchNews";
import { ArticlesProps } from "@/types";
import Categories from "@/components/categories";
import NewsByCategory from "@/components/newsByCategory";
import { NewsByCategoryType } from "@/types/newsByCategory";
import newsCategoryList from "@/constants/Categories";
import { useDarkMode } from "@/context/darkModeProvider";
import { getIsDarkModeTrue } from "@/utils/darkModeStorage";

export default function Index() {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<ArticlesProps[]>([]);
  const [newsByCategory, setNewsByCategory] = useState<NewsByCategoryType>({});
  // const [textValue, setTextValue] = useState<string>("");

  const { Colors } = useDarkMode();

  const [activeNewsCategoryIndex, setActiveNewsCategoryIndex] =
    useState<number>(0);

  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(false);

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
    const fetchDarkModeSetting = async () => {
      const isDarkTrue = await getIsDarkModeTrue();
      setIsDarkModeActive(isDarkTrue);
    };

    fetchDarkModeSetting();
  }, []);

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

  // const handleSubmit = () => {
  //   if (textValue.trim() !== "") {
  //     router.navigate({
  //       pathname: "/(tabs)/discover",
  //       params: { searchQuery: textValue },
  //     });
  //     setTextValue(""); // Clear the text input after navigation
  //   }
  // };

  return (
    <ScrollView
      style={[
        styles.container,
        { marginTop: safeTop, backgroundColor: Colors.background },
      ]}
    >
      <StatusBar
        style={isDarkModeActive ? "light" : "dark"} // Adjust the text color
        backgroundColor={Colors.background}
      />
      <Header />

      {/* <SearchBar
        setTextValue={setTextValue}
        textValue={textValue}
        onNavigateToDiscover={true}
        handleSubmit={handleSubmit}
      /> */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.activityLoaderColor}
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
    </ScrollView>
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
