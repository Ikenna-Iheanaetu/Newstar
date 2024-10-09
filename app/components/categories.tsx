import newsCategoryList from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoriesProps {
  onCategoryChange: (category: number) => void;
  activeNewsCategoryIndex: number;
  setActiveNewsCategoryIndex: React.Dispatch<
    React.SetStateAction<number>
  >;
}

export default function Categories({
  onCategoryChange,
  activeNewsCategoryIndex,
  setActiveNewsCategoryIndex,
}: CategoriesProps) {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];
    setActiveNewsCategoryIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
    });

    onCategoryChange(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderWrapper}
      >
        {newsCategoryList.map((category, index) => {
          return (
            <TouchableOpacity
              ref={(element) => itemRef.current[index] === element}
              key={index}
              style={[
                styles.item,
                activeNewsCategoryIndex === index && styles.itemActive,
              ]}
              onPress={() => handleSelectCategory(index)}
            >
              <Text
                style={[
                  styles.itemText,
                  activeNewsCategoryIndex === index && styles.itemTextActive,
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  sliderWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemActive: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  itemText: {
    fontSize: 14,
    color: Colors.darkGrey,
    letterSpacing: 0.5,
  },
  itemTextActive: {
    fontWeight: "600",
    color: "#fff",
  },
});
