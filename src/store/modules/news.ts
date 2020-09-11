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
    console.log("addQueriedCountryACTION works");
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
  async fetchNewsQuery(selectedCountryOrCategory: string) {
    let country = "";

    //country conditions to fetch a country's news dynamically

    if (selectedCountryOrCategory !== null) {
      if (selectedCountryOrCategory === "Argentina") {
        country = "ar";
      }
      if (selectedCountryOrCategory === "Australia") {
        country = "au";
      }
      if (selectedCountryOrCategory === "Austria") {
        country = "at";
      }
      if (selectedCountryOrCategory === "Belgium") {
        country = "be";
      }
      if (selectedCountryOrCategory === "Brazil") {
        country = "br";
      }
      if (selectedCountryOrCategory === "Bulgaria") {
        country = "bg";
      }
      if (selectedCountryOrCategory === "Canada") {
        country = "ca";
      }
      if (selectedCountryOrCategory === "China") {
        country = "cn";
      }
      if (selectedCountryOrCategory === "Colombia") {
        country = "co";
      }
      if (selectedCountryOrCategory === "Cuba") {
        country = "cu";
      }
      if (selectedCountryOrCategory === "Czech Republic") {
        country = "cz";
      }
      if (selectedCountryOrCategory === "Egypt") {
        country = "eg";
      }
      if (selectedCountryOrCategory === "France") {
        country = "fr";
      }
      if (selectedCountryOrCategory === "Germany") {
        country = "de";
      }
      if (selectedCountryOrCategory === "Greece") {
        country = "gr";
      }
      if (selectedCountryOrCategory === "Hong Kong") {
        country = "hk";
      }
      if (selectedCountryOrCategory === "Hungary") {
        country = "hu";
      }
      if (selectedCountryOrCategory === "India") {
        country = "in";
      }
      if (selectedCountryOrCategory === "Indonesia") {
        country = "id";
      }
      if (selectedCountryOrCategory === "Ireland") {
        country = "ie";
      }
      if (selectedCountryOrCategory === "Israel") {
        country = "il";
      }
      if (selectedCountryOrCategory === "Italy") {
        country = "it";
      }
      if (selectedCountryOrCategory === "Japan") {
        country = "jp";
      }
      if (selectedCountryOrCategory === "Latvia") {
        country = "lv";
      }
      if (selectedCountryOrCategory === "Lithuania") {
        country = "lt";
      }
      if (selectedCountryOrCategory === "Malaysia") {
        country = "my";
      }
      if (selectedCountryOrCategory === "Mexico") {
        country = "mx";
      }
      if (selectedCountryOrCategory === "Netherlands") {
        country = "nl";
      }
      if (selectedCountryOrCategory === "New Zealand") {
        country = "nz";
      }
      if (selectedCountryOrCategory === "Nigeria") {
        country = "ng";
      }
      if (selectedCountryOrCategory === "Norway") {
        country = "no";
      }
      if (selectedCountryOrCategory === "Philippines") {
        country = "ph";
      }
      if (selectedCountryOrCategory === "Poland") {
        country = "pl";
      }
      if (selectedCountryOrCategory === "Portugal") {
        country = "pt";
      }
      if (selectedCountryOrCategory === "Romania") {
        country = "ro";
      }
      if (selectedCountryOrCategory === "Russia") {
        country = "ru";
      }
      if (selectedCountryOrCategory === "Saudi Arabia") {
        country = "sa";
      }
      if (selectedCountryOrCategory === "Serbia") {
        country = "rs";
      }
      if (selectedCountryOrCategory === "Singapore") {
        country = "sg";
      }
      if (selectedCountryOrCategory === "Slovakia") {
        country = "sk";
      }
      if (selectedCountryOrCategory === "Slovenia") {
        country = "si";
      }
      if (selectedCountryOrCategory === "South Africa") {
        country = "za";
      }
      if (selectedCountryOrCategory === "South Korea") {
        country = "kr";
      }
      if (selectedCountryOrCategory === "Sweden") {
        country = "se";
      }
      if (selectedCountryOrCategory === "Switzerland") {
        country = "ch";
      }
      if (selectedCountryOrCategory === "Taiwan") {
        country = "tw";
      }
      if (selectedCountryOrCategory === "Thailand") {
        country = "th";
      }
      if (selectedCountryOrCategory === "Turkey") {
        country = "tr";
      }
      if (selectedCountryOrCategory === "United Arabic Emirates") {
        country = "ae";
      }

      if (selectedCountryOrCategory === "Ukraine") {
        country = "ua";
      }
      if (selectedCountryOrCategory === "United Kingdom") {
        country = "gb";
      }
      if (selectedCountryOrCategory === "United States") {
        country = "us";
      }
      if (selectedCountryOrCategory === "Venezuela") {
        country = "ve";
      }
    }
    //category to fetch

    const countryToFetch = country;
    let url = "";
    url = `http://newsapi.org/v2/top-headlines?language=en&country=${countryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;

    if (selectedCountryOrCategory === "Default Country") {
      url =
        "https://newsapi.org/v2/top-headlines?country=jp&apiKey=771f495b60b94bfabf9a9800d4996456";
      // "https://newsapi.org/v2/top-headlines?country=jp&q=Apple&apiKey=771f495b60b94bfabf9a9800d4996456";
    }
    let newsCategory = "";
    if (
      selectedCountryOrCategory === "Economics" ||
      selectedCountryOrCategory === "Politics" ||
      selectedCountryOrCategory === "Science" ||
      selectedCountryOrCategory === "Health" ||
      selectedCountryOrCategory === "Sports" ||
      selectedCountryOrCategory === "Leisure" ||
      selectedCountryOrCategory === "Entertainment" ||
      selectedCountryOrCategory === "Travel"
    ) {
      newsCategory = selectedCountryOrCategory;
      console.log(newsCategory);
      url = `https://newsapi.org/v2/everything?q=${newsCategory}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }
    console.log("299");
    console.log(newsCategory);
    console.log(country);
    console.log("302");

    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        this.context.commit("addQueriedNewsDataToState", data.articles);
      });
  }

  // https://newsapi.org/v2/everything?q=bitcoin&apiKey=771f495b60b94bfabf9a9800d4996456
}
export default getModule(NewsModule, store);
