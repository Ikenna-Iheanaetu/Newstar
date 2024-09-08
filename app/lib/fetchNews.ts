import { useFetch } from "@/hooks/useFetch";
import { NewsDataType } from "@/types";

const url = 'http://localhost:3000/news';

if (!url) {
  console.error("EXPO_PUBLIC__NEWS_SERVER_URL is not set in the environment");
}

export const getBreakingNews = () => {
  return useFetch<NewsDataType[]>(`${url}/breaking-news`);
};