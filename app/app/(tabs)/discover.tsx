import { View, Text, StyleSheet } from "react-native";
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
    const url = "http://192.168.56.1:3000/news";

    if (!url) {
      setLoading(false);
      setError(true);
      console.error(
        "EXPO_PUBLIC__NEWS_SERVER_URL is not set in the environment"
      );
      return; // Early return if the URL is not set
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ searchString }),
      });

      if (!response.ok) {
        setError(true);
        throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-200 responses
      }

      const res: ArticlesProps[] = await response.json(); // Use await to parse the response

      if (res) {
        // Assuming you want to check if res is truthy
        setData(res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (searchQuery) {
      handleRequest(searchQuery.trim());
    }
    handleRequest(textValue.trim());
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
