import { Colors } from "@/constants/Colors"
import { ArticlesProps, NewsDataType } from "@/types"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"

interface NewsByCategoryProps{
    newsList: ArticlesProps[]
}

export default function NewsByCategory({ newsList }: NewsByCategoryProps) {
    return(
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            { newsList.map((news, index) => {
                return(
                    <View key={index} style={styles.newsContainer}>
                        <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{news.title}</Text>
                            <Text style={styles.itemDesc} numberOfLines={2}>{news.description}</Text>
                            <Text>{news.source.name}</Text>
                        </View>
                    </View>
                )
            }) }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    newsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
        // flex: 1
    },
    newsImage: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10
    },
    itemInfo: {
        flex: 10,
        justifyContent: "space-between",
        gap: 10
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: .8
    },
    itemDesc: {
        color: Colors.darkGrey
    },
})