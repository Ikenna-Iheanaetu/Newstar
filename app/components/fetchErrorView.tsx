import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useDarkMode } from "@/context/darkModeProvider";

interface FetchErrorViewProps {
  onPress: () => void;
}

export default function FetchErrorView({ onPress }: FetchErrorViewProps) {
  const { Colors } = useDarkMode();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: Colors.fetchErrorText }]}>
        Something went wrong
      </Text>
      <Pressable
        style={[styles.btn, { backgroundColor: Colors.tint }]}
        onPress={onPress}
      >
        <Text style={[styles.btnText, { color: Colors.white }]}>Reload</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  btn: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
  },
});
