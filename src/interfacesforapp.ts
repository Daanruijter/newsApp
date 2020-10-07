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
export interface Source {
  id?: null;
  name?: string;
}

//interface for fetch function
export interface FetchNews {
  fetchBase: string;
  typeOfFetchBase: string;
}

//interface for fetch function
export interface FetchBase {
  fetchBase?: string;
  typeOfFetchBase?: string;
}
