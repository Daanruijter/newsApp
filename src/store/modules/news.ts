// import axios from "axios";

// const state = {
//   news: [
//     { id: 1, title: "news 1" },
//     { id: 2, title: "news 2" },
//   ],
// };

// interface newsType {
//   { id: 1, title: "news 1" },
// ]

// let userTestStatus: { id: number, name: string }[] = [
//   { "id": 0, "name": "Available" },
//   { "id": 1, "name": "Ready" },
//   { "id": 2, "name": "Started" }
// ];

const state = { newsData: [] };

const getters = { allNews: (state: any) => state.newsData };

const actions = {
  async fetchNews({ commit }: { commit: Function }) {
    const url: string =
      "http://newsapi.org/v2/top-headlines?" +
      "country=au&" +
      "apiKey=771f495b60b94bfabf9a9800d4996456";
    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        commit("setNews", data.articles);
        console.log(data.articles);
      });
  },
};
const mutations = {
  setNews: (state: any, newsData: any) => (state.newsData = newsData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
