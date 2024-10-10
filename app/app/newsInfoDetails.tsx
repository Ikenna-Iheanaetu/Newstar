import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Moment from "moment";
import * as Linking from "expo-linking";
import { useDarkMode } from "@/context/darkModeProvider";
import { StatusBar } from "expo-status-bar";
import { getIsDarkModeTrue } from "@/utils/darkModeStorage";
import { useNavigation } from "@react-navigation/native";

interface NewsInfoDetailsProps {}

export default function NewsInfoDetails({}: NewsInfoDetailsProps) {
  const { Colors } = useDarkMode();

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

  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "News Details", // Title of the screen
      headerStyle: {
        backgroundColor: Colors.background, // Background color of the header
      },
      headerTintColor: Colors.heading, // Color of the back arrow and header text
    });
  }, [navigation]);

  useEffect(() => {
    const fetchDarkModeSetting = async () => {
      const isDarkTrue = await getIsDarkModeTrue();
      setIsDarkModeActive(isDarkTrue);
    };

    fetchDarkModeSetting();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={[styles.container, { backgroundColor: Colors.background }]}
    >
      <StatusBar
        style={isDarkModeActive ? "light" : "dark"}
        backgroundColor={Colors.background}
      />
      <Text style={[styles.title, { color: Colors.heading }]}>{title}</Text>
      <View style={styles.newsInfoWrapper}>
        <Text style={[styles.newsInfo, { color: Colors.darkGrey }]}>
          {Moment(publishedAt).format("MMMM DD, hh:mm a")}
        </Text>
        <Text style={[styles.newsInfo, { color: Colors.darkGrey }]}>
          {" "}
          {source}
        </Text>
      </View>
      <Image source={{ uri: urlToImage }} style={styles.newsImg} />
      <Text style={[styles.newsContent, { color: Colors.text }]}>
        {content}
      </Text>
      <View>
        <Text
          style={{
            marginTop: 20,
            letterSpacing: 0.6,
            textAlign: "center",
            color: Colors.softText,
          }}
        >
          If you want to read the complete article click on the link -{" "}
        </Text>
        <Pressable
          style={{ justifyContent: "center", marginTop: 10 }}
          onPress={handlePress}
        >
          <Text style={{ color: Colors.link, letterSpacing: 0.6 }}>{url}</Text>
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
  },
  newsContent: {
    fontSize: 14,
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
