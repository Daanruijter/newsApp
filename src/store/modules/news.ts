export interface NewsItemType {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
export interface Source {
  id?: null;
  name: string;
}

import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  news: NewsItemType[] = [];
  pictureNotLoadedArray: string[] = [];

  //getters
  get newsDataGetter(): NewsItemType[] {
    const newsDataViaGetter = this.news;
    // console.log(newsDataViaGetter);

    return newsDataViaGetter;
  }

  get tenFirstNewsItemsIfPicture(): NewsItemType[] {
    console.log("tenfirstNewsItems");

    const tenFirstNewsItemsIfPicture = this.news.filter(
      (news: NewsItemType, index: number) => {
        return (
          index < 10 &&
          news.urlToImage !== null &&
          news.urlToImage !== this.pictureNotLoadedArray[0] &&
          news.urlToImage !== this.pictureNotLoadedArray[1] &&
          news.urlToImage !== this.pictureNotLoadedArray[2] &&
          news.urlToImage !== this.pictureNotLoadedArray[3]
        );
      }
    );

    return tenFirstNewsItemsIfPicture;
  }

  get tenFirstNewsItemsIfNoPicture(): NewsItemType[] {
    const tenFirstNewsItemsIfNoPicture = this.news.filter(
      (news: NewsItemType) => {
        return (
          news.urlToImage === null ||
          news.urlToImage === this.pictureNotLoadedArray[0] ||
          news.urlToImage === this.pictureNotLoadedArray[1] ||
          news.urlToImage === this.pictureNotLoadedArray[2] ||
          news.urlToImage === this.pictureNotLoadedArray[3]
          // );
        );
      }
    );
    console.log(tenFirstNewsItemsIfNoPicture);
    return tenFirstNewsItemsIfNoPicture;
  }

  @Mutation
  addNewsDataToState(data: NewsItemType[]) {
    this.news = data;
    // console.log(data);
  }

  @Mutation
  addPictureNotLoadedArray(data: string[]) {
    this.pictureNotLoadedArray = data;
  }

  @Action
  async fetchNews() {
    const url = `http://newsapi.org/v2/top-headlines?country=au&apiKey=771f495b60b94bfabf9a9800d4996456`;
    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.context.commit("addNewsDataToState", data.articles);
      });
  }

  @Action
  sendPictureNotLoadedArray(pictureNotLoadedArray: string[]) {
    console.log(pictureNotLoadedArray);
    this.context.commit("addPictureNotLoadedArray", pictureNotLoadedArray);
  }
}
export default getModule(NewsModule, store);
