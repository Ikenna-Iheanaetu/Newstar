import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface FetchErrorViewProps{
    onPress: () => void
}

export default function FetchErrorView({ onPress }: FetchErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong</Text>
      <Pressable style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>Reload</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.darkGrey,    
    },
    btn: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.tint,
        borderRadius: 10
    },
    btnText: {
        fontSize: 16,
        color: Colors.white
    }
})