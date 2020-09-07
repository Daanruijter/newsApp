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

// let item = "";
// import { User, Profile, UserSubmit } from "../models";
// import { loginUser } from "../api";

// @Module({ dynamic: true, store: store, namespaced: true, name: "news" })

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
        // const err = new Image();
        // err.src = "/error.png";
        // console.log(news.urlToImage);
        // console.log(err.src);
        // console.log(news.urlToImage);
        // console.log(news.urlToImage == err.src);

        // console.log(news.urlToImage);
        // console.log(this.pictureNotLoadedArray[index]);
        // console.log(!(news.urlToImage === this.pictureNotLoadedArray[index]));

        // return (

        //   let j: number;
        //   for (j = 0; j < this.pictureNotLoadedArray.length; j++) {
        //     console.log(j);

        //     if (
        //       index < 10 &&
        //       news.urlToImage !== null &&
        //       news.urlToImage !== this.pictureNotLoadedArray[j]
        //     ) {
        //       item = this.pictureNotLoadedArray[index];
        //     }

        //     //
        //     // );
        //   }
        //   return item;
        // }

        return (
          index < 10 &&
          news.urlToImage !== null &&
          `${news.urlToImage !== this.pictureNotLoadedArray[0] &&
            news.urlToImage !== this.pictureNotLoadedArray[1] &&
            news.urlToImage !== this.pictureNotLoadedArray[2] &&
            news.urlToImage !== this.pictureNotLoadedArray[3]}`
        );
      }
    );

    console.log("waarom doet ie het niet");
    // console.log(item);
    console.log(tenFirstNewsItemsIfPicture);

    return tenFirstNewsItemsIfPicture;
  }

  get tenFirstNewsItemsIfNoPicture(): NewsItemType[] {
    // console.log(this.news);
    const tenFirstNewsItemsIfNoPicture = this.news.filter(
      (news: NewsItemType) => {
        return (
          news.urlToImage === null ||
          `${news.urlToImage !== this.pictureNotLoadedArray[0] &&
            news.urlToImage == this.pictureNotLoadedArray[1] &&
            news.urlToImage == this.pictureNotLoadedArray[2] &&
            news.urlToImage == this.pictureNotLoadedArray[3]}`
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
        // console.log(data.articles);
      });
  }

  @Action
  sendPictureNotLoadedArray(pictureNotLoadedArray: string[]) {
    console.log(pictureNotLoadedArray);
    this.context.commit("addPictureNotLoadedArray", pictureNotLoadedArray);
  }
}
export default getModule(NewsModule, store);
// export const newsModule = new NewsModule({ store, name: "newsDataModule" });

// export default NewsModule;

// export default getModule(NewsModule, store);
// class NewsModule extends VuexModule {

// user: User | null = null;
// profile: Profile | null = null;

// @Mutation
// setNews(newsData: any) {
//   this.news = newsData;
// }
//     (state.newsData = newsData),
// };
// setUser(user: User) {
//   this.user = user;
// }

// get username() {
//   return (this.user && this.user.username) || null;
// }

// get allNews() {
//   return this.news || null;
// }

// @Action({ commit: "setNews" })
// async fetchNews() {
//   const url: string =
//     "http://newsapi.org/v2/top-headlines?" +
//     "country=au&" +
//     "apiKey=771f495b60b94bfabf9a9800d4996456";
//   const req = new Request(url);
//   await fetch(req)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       this.news = data;
//       this.context.commit("setNews", data.articles);
//       // console.log(data.articles);
//     });
// }
// async login(userSubmit: UserSubmit) {
//   const user = await loginUser(userSubmit);
//   return user;
// }
// }

// export default getModule(NewsModule);

// const state = { newsData: [] };

// export type State = { newsData: NewsDataType };

// const getters = {
//   allNews: (state: StateType) => state.newsData,
//   tenFirstNewsRecords: (state: StateType) =>
//     state.newsData.filter((news: NewsItemType, index: number) => index < 10),
// };

// const actions = {
//   async fetchNews({ commit }: { commit: Function }) {
//     const url: string =
//       "http://newsapi.org/v2/top-headlines?" +
//       "country=au&" +
//       "apiKey=771f495b60b94bfabf9a9800d4996456";
//     const req = new Request(url);
//     await fetch(req)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         commit("setNews", data.articles);
//         console.log(data.articles);
//       });
//   },
// };
// const mutations = {
//   setNews: (state: NewsDataType, newsData: NewsDataType) =>
//     (state.newsData = newsData),
// };

// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };
