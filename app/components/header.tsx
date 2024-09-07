import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
          style={styles.img}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.username}>John Doe</Text>
        </View>
      </View>
      <Pressable>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
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
    marginBottom: 20
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
    color: Colors.darkGrey
  },
  username: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.darkGrey
  }
});
