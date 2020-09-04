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

// import { User, Profile, UserSubmit } from "../models";
// import { loginUser } from "../api";

// @Module({ dynamic: true, store: store, namespaced: true, name: "news" })

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  news: NewsItemType[] = [];

  //getters
  get newsDataGetter(): NewsItemType[] {
    const newsDataViaGetter = this.news;
    console.log("akdklhafklhsfklh");
    console.log(this.news.length === 0);
    console.log(this.news);
    console.log(newsDataViaGetter);
    console.log("akdkslhssafklhsfklh222s2");
    return newsDataViaGetter;
  }

  @Mutation
  addNewsDataToState(data: NewsItemType[]) {
    this.news = data;
    console.log(data);
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
