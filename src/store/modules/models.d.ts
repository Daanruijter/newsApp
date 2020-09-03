interface StateType {
  newsData: [];
}

interface NewsItemType {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsDataType {
  newsData: Array<NewsItemType>;
}
