import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

export default function Settings() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const toggleSwitch = () => {
    setEnabled(!enabled);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.itemBtn}>
        <Text style={styles.itemText}>Dark Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#3e3e3e" }}
          thumbColor={enabled ? "#f5dd4b" : "#f3f3f4"}
          ios_backgroundColor={"#3e3e3e"}
          onValueChange={toggleSwitch}
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
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
});
