import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDarkMode } from "@/context/darkModeProvider";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const { Colors } = useDarkMode();

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
          style={styles.img}
        />
        <View style={{ gap: 3 }}>
          <Text style={[styles.welcomeText, { color: Colors.darkGrey }]}>
            Welcome
          </Text>
          <Text style={[styles.username, { color: Colors.darkGrey }]}>
            Ikenna Iheanaetu
          </Text>
        </View>
      </View>
      <Pressable>
        <Ionicons name="notifications-outline" size={24} color={Colors.notificationColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: "700",
  },
});
