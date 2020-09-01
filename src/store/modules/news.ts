const state = { newsData: [] };

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

const getters = {
  allNews: (state: StateType) => state.newsData,
  tenFirstNewsRecords: (state: StateType) =>
    state.newsData.filter((news: NewsItemType, index: number) => index < 10),
};

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
  setNews: (state: NewsDataType, newsData: NewsDataType) =>
    (state.newsData = newsData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
