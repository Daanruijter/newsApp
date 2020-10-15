//main interface that represents the news item array shape
export default interface NewsItemType {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  extraThreeItemsDetailsPageHovered?: boolean | string;
  linksNewsFooterHovered?: boolean | string;
  homePageLinksHovered?: boolean | string;
}

//source is a nested array on the news item type
export interface Source {
  id?: null;
  name?: string;
}
