import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { ArticlesProps, NewsDataType } from "@/types";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { router } from "expo-router";

interface NewsSliderProps {
  item: ArticlesProps;
  index: number;
  scrollX: SharedValue<number>;
}

const { width } = Dimensions.get("screen");

export default function NewsSlider({ item, index, scrollX }: NewsSliderProps) {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const onNavigateToViewContent = () => {
    const {  
      author, 
      title, 
      description, 
      url, 
      urlToImage, 
      publishedAt, 
      content,
      source
  } = item; 

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
        source: source.name
      }
    })
  }

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]} key={index}>
      <Pressable onPress={onNavigateToViewContent}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.background}
        >
          <Text style={styles.sourceName}>Source: {item.source.name}</Text>
          <Text style={styles.sourceDesc} numberOfLines={2}>
            {item.description}
          </Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    top: 70,
  },
  sourceDesc: {
    fontSize: 14,
    color: Colors.white,
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});
