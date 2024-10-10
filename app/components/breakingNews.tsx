import {
  View,
  Text,
  StyleSheet,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ArticlesProps } from "@/types";
import NewsSlider from "./newsSlider";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./pagination";
import { useDarkMode } from "@/context/darkModeProvider";

interface BreakingNewsProps {
  newsList: ArticlesProps[];
}

export default function BreakingNews({ newsList }: BreakingNewsProps) {
  const [data, setData] = useState<ArticlesProps[]>([...newsList, ...newsList]);
  const [paginationIndex, setPaginationIndex] = useState<number>(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();
  const { Colors } = useDarkMode();
  


  useEffect(() => {
    if (isAutoPlay === true) {
      interval.current = setInterval(() => {
        offset.value = (offset.value + width) % (newsList.length * width);
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width, newsList.length]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
      if (e.contentOffset.x >= newsList.length * width) {
        scrollTo(ref, e.contentOffset.x % (newsList.length * width), 0, false);
      }
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % newsList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.heading }]}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item ${index}`}
          renderItem={({ item, index }) => (
            <NewsSlider item={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollBeginDrag={() => {
            setIsAutoPlay(false);
          }}
          onScrollEndDrag={() => {
            setIsAutoPlay(true);
          }}
        />
        <Pagination
          items={newsList}
          paginationIndex={paginationIndex}
          scrollX={scrollX}
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
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    marginTop: 10,
    justifyContent: "center",
  },
});
