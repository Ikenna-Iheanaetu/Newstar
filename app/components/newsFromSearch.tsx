import { ArticlesProps } from "@/types";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import FetchErrorView from "./fetchErrorView";
import { router } from "expo-router";
import { useDarkMode } from "@/context/darkModeProvider";

interface NewsFromSearchProps {
  data: ArticlesProps[];
  refetch: () => void;
  loading: boolean;
  error: boolean;
}

export default function NewsFromSearch({
  data,
  refetch,
  loading,
  error,
}: NewsFromSearchProps) {
  const { Colors } = useDarkMode()


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.black} />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return <FetchErrorView onPress={refetch} />;
  }

  const onNavigateToViewContent = (index: number) => {
    const {
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      source,
    } = data[index];

    router.push({
      pathname: "/newsInfoDetails",
      params: {
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content,
        source: source.name,
      },
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {data.map((news: ArticlesProps, index: number) => (
        <Pressable
          onPress={() => onNavigateToViewContent(index)}
          key={index}
          style={styles.newsContainer}
        >
          <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
          <View style={styles.itemInfo}>
            <Text style={[styles.itemTitle, { color: Colors.heading }]}>{news.title}</Text>
            <Text style={{ color: Colors.darkGrey }} numberOfLines={2}>
              {news.description}
            </Text>
            <Text style={{ color: Colors.text }}>{news.source.name}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  newsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  newsImage: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.8,
  }
});
