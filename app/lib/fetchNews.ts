import { useFetch } from "@/hooks/useFetch";
import { ArticlesProps, NewsDataType } from "@/types";

const url = 'http://192.168.56.1:3000/news';

if (!url) {
  console.error("EXPO_PUBLIC__NEWS_SERVER_URL is not set in the environment");
}

export const getBreakingNews = () => {
  return useFetch<ArticlesProps[]>(`${url}/breaking-news`);
};

export const getNewsByCategory = (category: string) => {
  return useFetch<ArticlesProps[]>(`${url}/category/${category}`);
}