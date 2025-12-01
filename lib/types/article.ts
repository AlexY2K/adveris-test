export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  tag: string;
  image: string;
}

export interface ArticleCardProps {
  article: Article;
}
