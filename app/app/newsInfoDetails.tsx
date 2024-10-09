import { Colors } from "@/constants/Colors";
import { ArticlesProps } from "@/types";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Moment from "moment";
import * as Linking from "expo-linking";

interface NewsInfoDetailsProps {}

export default function NewsInfoDetails({}: NewsInfoDetailsProps) {
  const {
    sourceName,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    source,
  } = useLocalSearchParams<{
    sourceName: string;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: string;
  }>();

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.newsInfoWrapper}>
        <Text style={styles.newsInfo}>
          {Moment(publishedAt).format("MMMM DD, hh:mm a")}
        </Text>
        <Text style={styles.newsInfo}> {source}</Text>
      </View>
      <Image source={{ uri: urlToImage }} style={styles.newsImg} />
      <Text style={styles.newsContent}>{content}</Text>
      <View>
        <Text
          style={{ marginTop: 20, letterSpacing: 0.6, textAlign: "center" }}
        >
          If you want to read the complete article click on the link -{" "}
        </Text>
        <Pressable
          style={{ justifyContent: "center", marginTop: 10 }}
          onPress={handlePress}
        >
          <Text style={{ color: "blue", letterSpacing: 0.6 }}>{url}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsImg: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsContent: {
    fontSize: 14,
    color: "#333",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
