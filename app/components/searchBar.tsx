import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDarkMode } from "@/context/darkModeProvider";

interface SearchBarProps {
  textValue?: string;
  setTextValue?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

export default function SearchBar({
  textValue,
  setTextValue,
  handleSubmit,
}: SearchBarProps) {
  const { Colors } = useDarkMode();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={[styles.searchText, { color: Colors.darkGrey }]}
          autoCapitalize="none"
          cursorColor={Colors.darkGrey}
          value={textValue}
          onChangeText={(e) => {
            if (setTextValue) {
              setTextValue(e);
            }
          }}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#e4e4e4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  searchText: {
    fontSize: 14,
    flex: 1,
  },
});
