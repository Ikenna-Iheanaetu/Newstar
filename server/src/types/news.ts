export interface NewsDataType {
  status: string;
  totalResults: number;
  articles: ArticlesProps[];
}

interface SourceProps {
  id: string | null;
  name: string;
}

export interface ArticlesProps {
  source: SourceProps;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
