import { Colors } from "@/constants/Colors";
import { ArticlesProps } from "@/types";
import { NewsByCategoryType } from "@/types/newsByCategory";
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import FetchErrorView from "./fetchErrorView";

interface NewsByCategoryProps {
    newsByCategory: NewsByCategoryType;
    activeNewsSlug: string;
    newsCategoryRefetch: () => void;
    newsCategoryLoading: boolean;
    newsCategoryError: boolean;
}

export default function NewsByCategory({ 
    newsByCategory, 
    activeNewsSlug, 
    newsCategoryRefetch, 
    newsCategoryLoading, 
    newsCategoryError 
}: NewsByCategoryProps) {
    
    // Get the news articles for the active category
    const articles: ArticlesProps[] = newsByCategory[activeNewsSlug] || [];

    if (newsCategoryLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.black} />
                <Text>Loading news...</Text>
            </View>
        );
    }

    if(newsCategoryError){
        return <FetchErrorView onPress={newsCategoryRefetch} />
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {articles.length > 0 ? (
                articles.map((news: ArticlesProps, index: number) => (
                    <View key={index} style={styles.newsContainer}>
                        <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{news.title}</Text>
                            <Text style={styles.itemDesc} numberOfLines={2}>{news.description}</Text>
                            <Text>{news.source.name}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noNewsText}>No news available for this category.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    newsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        gap: 10,
    },
    newsImage: {
        width: 90,
        height: 100,
        borderRadius: 20,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
        justifyContent: "space-between",
        gap: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.8,
    },
    itemDesc: {
        color: Colors.darkGrey,
    },
    noNewsText: {
        textAlign: "center",
        marginTop: 20,
        color: Colors.darkGrey,
    },
});