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

//interface for fetch function

export interface FetchNews {
  fetchBase: string;
  typeOfFetchBase: string;
}

import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";

//to use locally saved newsdata//
// import testData from "@/testData";

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  //state
  news: NewsItemType[] = [];
  newsCountryQueried: NewsItemType[] = [];
  pictureNotLoadedArray: string[] = [];
  categoriesClickEventBoolean = false;

  //getters
  get newsDataGetter(): NewsItemType[] {
    const newsDataViaGetter = this.news;
    // console.log(newsDataViaGetter);

    return newsDataViaGetter;
  }

  get newsCountryQueriedGetter(): NewsItemType[] {
    console.log("countriesqueried");

    const newsCountryQueriedIfPicture = this.newsCountryQueried.filter(
      (news: NewsItemType) => {
        return (
          news.urlToImage !== this.pictureNotLoadedArray[0] &&
          news.urlToImage !== this.pictureNotLoadedArray[1] &&
          news.urlToImage !== this.pictureNotLoadedArray[2] &&
          news.urlToImage !== this.pictureNotLoadedArray[3]
          // );
        );
      }
    );
    console.log(newsCountryQueriedIfPicture);
    return newsCountryQueriedIfPicture;
  }

  @Mutation
  addNewsDataToState(data: NewsItemType[]) {
    this.news = data;
  }

  @Mutation
  addQueriedNewsDataToState(data: NewsItemType[]) {
    console.log("addQueriedNewsDataACTION works");
    this.newsCountryQueried = data;
  }

  @Mutation
  addPictureNotLoadedArray(data: string[]) {
    this.pictureNotLoadedArray = data;
  }

  @Mutation
  addBooleanOfCategoriesPageEvent(data: boolean) {
    this.categoriesClickEventBoolean = data;
  }

  // @Action
  // async fetchNews() {
  //   const url = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=771f495b60b94bfabf9a9800d4996456`;
  //   const req = new Request(url);
  //   await fetch(req)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       this.context.commit("addNewsDataToState", data.articles);
  //     });
  // }

  @Action
  sendPictureNotLoadedArray(pictureNotLoadedArray: string[]) {
    // console.log(pictureNotLoadedArray);
    this.context.commit("addPictureNotLoadedArray", pictureNotLoadedArray);
  }

  @Action
  setBooleanOfCategoriesPageEvent(categoryPageBoolean: boolean): boolean {
    this.context.commit("addBooleanOfCategoriesPageEvent", categoryPageBoolean);
    return categoryPageBoolean;
  }

  //fetch the country newsData if a user selects a certain country
  @Action
  async fetchNewsQuery(fetchBaseObject: FetchNews) {
    console.log(fetchBaseObject);

    // if(fetchBase === selectedCountry)

    let url = "";

    //country conditions to fetch a country's news dynamically
    //the url needs to contain the country abbreviations
    if (fetchBaseObject.typeOfFetchBase === "fetchCountry") {
      let countryToFetch = "";
      if (fetchBaseObject.fetchBase === "Argentina") {
        countryToFetch = "ar";
      }
      if (fetchBaseObject.fetchBase === "Australia") {
        countryToFetch = "au";
      }
      if (fetchBaseObject.fetchBase === "Austria") {
        countryToFetch = "at";
      }
      if (fetchBaseObject.fetchBase === "Belgium") {
        countryToFetch = "be";
      }
      if (fetchBaseObject.fetchBase === "Brazil") {
        countryToFetch = "br";
      }
      if (fetchBaseObject.fetchBase === "Bulgaria") {
        countryToFetch = "bg";
      }
      if (fetchBaseObject.fetchBase === "Canada") {
        countryToFetch = "ca";
      }
      if (fetchBaseObject.fetchBase === "China") {
        countryToFetch = "cn";
      }
      if (fetchBaseObject.fetchBase === "Colombia") {
        countryToFetch = "co";
      }
      if (fetchBaseObject.fetchBase === "Cuba") {
        countryToFetch = "cu";
      }
      if (fetchBaseObject.fetchBase === "Czech Republic") {
        countryToFetch = "cz";
      }
      if (fetchBaseObject.fetchBase === "Egypt") {
        countryToFetch = "eg";
      }
      if (fetchBaseObject.fetchBase === "France") {
        countryToFetch = "fr";
      }
      if (fetchBaseObject.fetchBase === "Germany") {
        countryToFetch = "de";
      }
      if (fetchBaseObject.fetchBase === "Greece") {
        countryToFetch = "gr";
      }
      if (fetchBaseObject.fetchBase === "Hong Kong") {
        countryToFetch = "hk";
      }
      if (fetchBaseObject.fetchBase === "Hungary") {
        countryToFetch = "hu";
      }
      if (fetchBaseObject.fetchBase === "India") {
        countryToFetch = "in";
      }
      if (fetchBaseObject.fetchBase === "Indonesia") {
        countryToFetch = "id";
      }
      if (fetchBaseObject.fetchBase === "Ireland") {
        countryToFetch = "ie";
      }
      if (fetchBaseObject.fetchBase === "Israel") {
        countryToFetch = "il";
      }
      if (fetchBaseObject.fetchBase === "Italy") {
        countryToFetch = "it";
      }
      if (fetchBaseObject.fetchBase === "Japan") {
        countryToFetch = "jp";
      }
      if (fetchBaseObject.fetchBase === "Latvia") {
        countryToFetch = "lv";
      }
      if (fetchBaseObject.fetchBase === "Lithuania") {
        countryToFetch = "lt";
      }
      if (fetchBaseObject.fetchBase === "Malaysia") {
        countryToFetch = "my";
      }
      if (fetchBaseObject.fetchBase === "Mexico") {
        countryToFetch = "mx";
      }
      if (fetchBaseObject.fetchBase === "Netherlands") {
        countryToFetch = "nl";
      }
      if (fetchBaseObject.fetchBase === "New Zealand") {
        countryToFetch = "nz";
      }
      if (fetchBaseObject.fetchBase === "Nigeria") {
        countryToFetch = "ng";
      }
      if (fetchBaseObject.fetchBase === "Norway") {
        countryToFetch = "no";
      }
      if (fetchBaseObject.fetchBase === "Philippines") {
        countryToFetch = "ph";
      }
      if (fetchBaseObject.fetchBase === "Poland") {
        countryToFetch = "pl";
      }
      if (fetchBaseObject.fetchBase === "Portugal") {
        countryToFetch = "pt";
      }
      if (fetchBaseObject.fetchBase === "Romania") {
        countryToFetch = "ro";
      }
      if (fetchBaseObject.fetchBase === "Russia") {
        countryToFetch = "ru";
      }
      if (fetchBaseObject.fetchBase === "Saudi Arabia") {
        countryToFetch = "sa";
      }
      if (fetchBaseObject.fetchBase === "Serbia") {
        countryToFetch = "rs";
      }
      if (fetchBaseObject.fetchBase === "Singapore") {
        countryToFetch = "sg";
      }
      if (fetchBaseObject.fetchBase === "Slovakia") {
        countryToFetch = "sk";
      }
      if (fetchBaseObject.fetchBase === "Slovenia") {
        countryToFetch = "si";
      }
      if (fetchBaseObject.fetchBase === "South Africa") {
        countryToFetch = "za";
      }
      if (fetchBaseObject.fetchBase === "South Korea") {
        countryToFetch = "kr";
      }
      if (fetchBaseObject.fetchBase === "Sweden") {
        countryToFetch = "se";
      }
      if (fetchBaseObject.fetchBase === "Switzerland") {
        countryToFetch = "ch";
      }
      if (fetchBaseObject.fetchBase === "Taiwan") {
        countryToFetch = "tw";
      }
      if (fetchBaseObject.fetchBase === "Thailand") {
        countryToFetch = "th";
      }
      if (fetchBaseObject.fetchBase === "Turkey") {
        countryToFetch = "tr";
      }
      if (fetchBaseObject.fetchBase === "United Arabic Emirates") {
        countryToFetch = "ae";
      }
      if (fetchBaseObject.fetchBase === "Ukraine") {
        countryToFetch = "ua";
      }
      if (fetchBaseObject.fetchBase === "United Kingdom") {
        countryToFetch = "gb";
      }
      if (fetchBaseObject.fetchBase === "United States") {
        countryToFetch = "us";
      }
      if (fetchBaseObject.fetchBase === "Venezuela") {
        countryToFetch = "ve";
      }
      if (fetchBaseObject.fetchBase === "Default Country") {
        countryToFetch = "jp";
      }

      url = `https://newsapi.org/v2/top-headlines?country=${countryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }

    if (fetchBaseObject.typeOfFetchBase === "fetchNewsCategory") {
      let newsCategoryToFetch = "";
      if (
        fetchBaseObject.fetchBase === "Economics" ||
        fetchBaseObject.fetchBase === "Politics" ||
        fetchBaseObject.fetchBase === "Science" ||
        fetchBaseObject.fetchBase === "Health" ||
        fetchBaseObject.fetchBase === "Sports" ||
        fetchBaseObject.fetchBase === "Leisure" ||
        fetchBaseObject.fetchBase === "Entertainment" ||
        fetchBaseObject.fetchBase === "Travel" ||
        fetchBaseObject.fetchBase === "Default News Category"
      )
        newsCategoryToFetch = fetchBaseObject.fetchBase;
      url = `https://newsapi.org/v2/everything?q=${newsCategoryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }

    if (fetchBaseObject.typeOfFetchBase === "fetchInput") {
      const inputToFetch = fetchBaseObject.fetchBase;

      url = `https://newsapi.org/v2/everything?q=${inputToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }

    console.log(url);

    // const data = testData;
    //EVEN UITGEZET
    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.context.commit("addQueriedNewsDataToState", data.articles);

        // this.context.commit("addQueriedNewsDataToState", data);
      });
    url = "";
  }

  // https://newsapi.org/v2/everything?q=bitcoin&apiKey=771f495b60b94bfabf9a9800d4996456
}
export default getModule(NewsModule, store);
