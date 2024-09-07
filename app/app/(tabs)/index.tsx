import Header from "@/components/header";
import SearchBar from "@/components/searchBar";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
