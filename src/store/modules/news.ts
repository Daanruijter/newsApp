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
    // console.log("sdkahdlafhfhlf");
    // let newsBool: NewsItemType[] = [];
    // console.log(newsBool);

    // if (this.newsCountryQueried.length !== 0) {
    //   newsBool = this.newsCountryQueried;
    //   console.log(newsBool);
    // }
    // if (this.newsCountryQueried.length === 0) {
    //   newsBool = tenFirstNewsItemsIfPicture;
    // }
    // // console.log(newsBool);
    // // return newsBool;
    // return newsBool;

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

  get newsCountryQueriedIfPicture(): NewsItemType[] {
    console.log("countriesqueried");

    const newsCountryQueriedIfPicture = this.newsCountryQueried.filter(
      (news: NewsItemType) => {
        return (
          news.urlToImage !== null ||
          (news.urlToImage !== this.pictureNotLoadedArray[0] &&
            news.urlToImage !== this.pictureNotLoadedArray[1] &&
            news.urlToImage !== this.pictureNotLoadedArray[2] &&
            news.urlToImage !== this.pictureNotLoadedArray[3])
          // );
        );
      }
    );
    console.log(newsCountryQueriedIfPicture);
    return newsCountryQueriedIfPicture;
  }

  // get tenFirstNewsItemsIfNoPicture(): NewsItemType[] {
  //   const tenFirstNewsItemsIfNoPicture = this.news.filter(
  //     (news: NewsItemType) => {
  //       return (
  //         news.urlToImage === null ||
  //         news.urlToImage === this.pictureNotLoadedArray[0] ||
  //         news.urlToImage === this.pictureNotLoadedArray[1] ||
  //         news.urlToImage === this.pictureNotLoadedArray[2] ||
  //         news.urlToImage === this.pictureNotLoadedArray[3]
  //         // );
  //       );
  //     }
  //   );
  //   console.log(tenFirstNewsItemsIfNoPicture);
  //   return tenFirstNewsItemsIfNoPicture;
  // }

  get categoriesPageBoolean(): boolean {
    const categoriesPageBooleanFromGetter = this.categoriesClickEventBoolean;
    // console.log(this.categoriesClickEventBoolean);

    return categoriesPageBooleanFromGetter;
  }

  @Mutation
  addNewsDataToState(data: NewsItemType[]) {
    this.news = data;
  }

  @Mutation
  addQueriedCountryNewsDataToState(data: NewsItemType[]) {
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
  async fetchNewsQueryCountry(country: string) {
    if (country === "Argentina") {
      country = "ar";
    }
    if (country === "Australia") {
      country = "au";
    }
    if (country === "Austria") {
      country = "at";
    }
    if (country === "Belgium") {
      country = "be";
    }
    if (country === "Brazil") {
      country = "br";
    }
    if (country === "Bulgaria") {
      country = "bg";
    }
    if (country === "Canada") {
      country = "ca";
    }
    if (country === "China") {
      country = "cn";
    }
    if (country === "Colombia") {
      country = "co";
    }
    if (country === "Cuba") {
      country = "cu";
    }
    if (country === "Czech Republic") {
      country = "cz";
    }
    if (country === "Egypt") {
      country = "eg";
    }
    if (country === "France") {
      country = "fr";
    }
    if (country === "Germany") {
      country = "de";
    }
    if (country === "Greece") {
      country = "gr";
    }
    if (country === "Hong Kong") {
      country = "hk";
    }
    if (country === "Hungary") {
      country = "hu";
    }
    if (country === "India") {
      country = "in";
    }
    if (country === "Indonesia") {
      country = "id";
    }
    if (country === "Ireland") {
      country = "ie";
    }
    if (country === "Israel") {
      country = "il";
    }
    if (country === "Italy") {
      country = "it";
    }
    if (country === "Japan") {
      country = "jp";
    }
    if (country === "Latvia") {
      country = "lv";
    }
    if (country === "Lithuania") {
      country = "lt";
    }
    if (country === "Malaysia") {
      country = "my";
    }
    if (country === "Mexico") {
      country = "mx";
    }
    if (country === "Netherlands") {
      country = "nl";
    }
    if (country === "New Zealand") {
      country = "nz";
    }
    if (country === "Nigeria") {
      country = "ng";
    }
    if (country === "Norway") {
      country = "no";
    }
    if (country === "Philippines") {
      country = "ph";
    }
    if (country === "Poland") {
      country = "pl";
    }
    if (country === "Portugal") {
      country = "pt";
    }
    if (country === "Romania") {
      country = "ro";
    }
    if (country === "Russia") {
      country = "ru";
    }
    if (country === "Saudi Arabia") {
      country = "sa";
    }
    if (country === "Serbia") {
      country = "rs";
    }
    if (country === "Singapore") {
      country = "sg";
    }
    if (country === "Slovakia") {
      country = "sk";
    }
    if (country === "Slovenia") {
      country = "si";
    }
    if (country === "South Africa") {
      country = "za";
    }
    if (country === "South Korea") {
      country = "kr";
    }
    if (country === "Sweden") {
      country = "se";
    }
    if (country === "Switzerland") {
      country = "ch";
    }
    if (country === "Taiwan") {
      country = "tw";
    }
    if (country === "Thailand") {
      country = "th";
    }
    if (country === "Turkey") {
      country = "tr";
    }
    if (country === "United Arabic Emirates") {
      country = "ae";
    }

    if (country === "Ukraine") {
      country = "ua";
    }
    if (country === "United Kingdom") {
      country = "gb";
    }
    if (country === "United States") {
      country = "us";
    }
    if (country === "Venezuela") {
      country = "ve";
    }

    const countryToFetch = country;
    const url = `http://newsapi.org/v2/top-headlines?language=en&country=${countryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        this.context.commit("addQueriedCountryNewsDataToState", data.articles);
      });
  }

  // https://newsapi.org/v2/everything?q=bitcoin&apiKey=771f495b60b94bfabf9a9800d4996456
}
export default getModule(NewsModule, store);
