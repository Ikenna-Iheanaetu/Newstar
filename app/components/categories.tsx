import newsCategoryList from "@/constants/Categories";
import { useDarkMode } from "@/context/darkModeProvider";
import { useRef } from "react";
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
  setActiveNewsCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Categories({
  onCategoryChange,
  activeNewsCategoryIndex,
  setActiveNewsCategoryIndex,
}: CategoriesProps) {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const { Colors } = useDarkMode();

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
      <Text style={[styles.title, { color: Colors.heading }]}>
        Trending Right Now
      </Text>
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
                { borderColor: Colors.border },
                activeNewsCategoryIndex === index && {
                  backgroundColor: Colors.tint,
                  borderColor: Colors.tint,
                },
              ]}
              onPress={() => handleSelectCategory(index)}
            >
              <Text
                style={[
                  { color: Colors.text },
                  activeNewsCategoryIndex === index && {
                    fontWeight: "600",
                    color: Colors.white,
                  },
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
