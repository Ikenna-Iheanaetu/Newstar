import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import { useLocalSearchParams } from "expo-router";
import { ArticlesProps } from "@/types";
import NewsFromSearch from "@/components/newsFromSearch";

export default function Discover() {
  const { top: safeTop } = useSafeAreaInsets();
  const [textValue, setTextValue] = useState<string>("");
  const { searchQuery } = useLocalSearchParams<{ searchQuery: string }>();
  const [data, setData] = useState<ArticlesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery) {
      handleRequest(searchQuery.trim());
    }
  }, [searchQuery]);

  const handleRequest = async (searchString: string) => {
    setLoading(true);
    setError(false); // Reset error state before the request
    const url = "http://192.168.56.1:3000/news";

    try {
      const response = await fetch(`${url}/search-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchString }), // Send the searchString as part of the request body
      });

      if (!response.ok) {
        setError(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res: ArticlesProps[] = await response.json();
console.log(res);
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true); // Set error state if there's an error
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    handleRequest(textValue.trim() || searchQuery.trim());
  };

  const handleSubmit = () => {
    handleRequest(textValue.trim());
  };

  return (
    <View style={[styles.container, { marginTop: safeTop + 20 }]}>
      <SearchBar
        textValue={textValue}
        setTextValue={setTextValue}
        handleSubmit={handleSubmit}
      />
      <View style={{ marginTop: 20 }}>
        <NewsFromSearch
          data={data}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});