import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'

interface NewsSliderProps{
    item: NewsDataType
    index: number
}

const { width } = Dimensions.get('screen')

export default function NewsSlider({ item, index }: NewsSliderProps) {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: item.articles[0].urlToImage }} />
      
    </View>
  )
}

const styles = StyleSheet.create({
    itemWrapper: {
        position: 'relative',
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: width,
        height: 180,
        borderRadius: 20
    }
})