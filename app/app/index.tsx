import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useDarkMode } from "@/context/darkModeProvider";

export default function Index() {
  const { Colors } = useDarkMode();

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text
            style={[styles.title, { color: Colors.white }]}
            entering={FadeInRight.delay(300).duration(500)}
          >
            Stay Updated
          </Animated.Text>
          <Animated.Text
            style={[styles.desc, { color: Colors.white }]}
            entering={FadeInRight.delay(700).duration(500)}
          >
            Get breaking news and personalized updates directly to your feed
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <Pressable
              style={[styles.btn, { backgroundColor: Colors.tint }]}
              onPress={() => router.replace("/(tabs)/")}
            >
              <Text style={[styles.btnText, { color: Colors.white }]}>
                Get Started
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: "center",
  },
  btn: {
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
