import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDarkMode } from "@/context/darkModeProvider";
import { getIsDarkModeTrue } from "@/utils/darkModeStorage";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";

export default function Settings() {
  const { enabled, toggleDarkMode, Colors } = useDarkMode();
  const [isDarkModeActive, setIsDarkModeActive] = useState<boolean>(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings", 
      headerStyle: {
        backgroundColor: Colors.background, 
      },
      headerTintColor: Colors.heading, 

    });
  }, [navigation, Colors]);

  useEffect(() => {
    const fetchDarkModeSetting = async () => {
      const isDarkTrue = await getIsDarkModeTrue();
      setIsDarkModeActive(isDarkTrue);
    };

    fetchDarkModeSetting();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <StatusBar
        style={isDarkModeActive ? "light" : "dark"} // Adjust the text color
        backgroundColor={Colors.background}
      />
      <Pressable style={[styles.itemBtn, { backgroundColor: Colors.settingCard }]}>
        <Text style={[styles.itemText, { color: Colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#f4f4f4" }}
          thumbColor={enabled ? Colors.tint : "#f3f3f4"}
          ios_backgroundColor={"#3e3e3e"}
          onValueChange={toggleDarkMode}
          value={enabled}
          style={{ transform: [{ scale: 1 }] }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
