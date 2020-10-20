//Interface for fetch function
export interface FetchNews {
  fetchBase: string;
  typeOfFetchBase: string;
}

//Interface for fetch function
export interface FetchBase {
  fetchBase?: string;
  typeOfFetchBase?: string;
}

import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";
import NewsItemType from "../../interfacesforapp";
import offLineData from "../../offLineData";
import { convertNewsItemPublishedTime } from "../../methodsForGeneralUse";
import createSitemap from "../../methodsForGeneralUse";

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  //STATE
  queriedNewsItems: NewsItemType[] = [];
  fetchBaseObject: FetchBase = {};
  testMode = false;

  //Getter to load the data in components
  get queriedNewsItemsGetter(): NewsItemType[] {
    return this.queriedNewsItems;
  }

  @Mutation
  addQueriedNewsDataToState(data: NewsItemType[]): void {
    //Making sure that the data are always sorted on date: most recent news must be displayed first and so have the highest indexes in the array
    function sortOnPublishedDate(): void {
      function comparePublishData(a: NewsItemType, b: NewsItemType): number {
        let returnComparisonNumber = 2;

        if (a.publishedAt !== undefined && b.publishedAt !== undefined) {
          if (a.publishedAt < b.publishedAt) {
            returnComparisonNumber = 1;
          }
          if (a.publishedAt > b.publishedAt) {
            returnComparisonNumber = -1;
          }
          if (
            !(a.publishedAt < b.publishedAt) &&
            !(a.publishedAt > b.publishedAt)
          ) {
            returnComparisonNumber = 0;
          }
        }
        return returnComparisonNumber;
      }

      data.sort(comparePublishData);

      //Convert the publishedAt property to a string that is readable for users
      let i = 0;

      for (i = 0; i < data.length; i++) {
        //Only change the date if it contains a "Z", because then you know that the date has not been converted yet
        //This prevents the bug that the convertNewsItemPublishedTime gets served a converted date as an argument, which returns  NaN  NaN NaN:NaN
        if (data[i].publishedAt.includes("Z")) {
          data[i].publishedAt = convertNewsItemPublishedTime(
            data[i].publishedAt
          );
        }
      }
    }
    //Only sort the data if publishedAt contains a "Z", because then you know that the date has not been converted yet
    //Otherwise the array gets sorted with the converted publishedAt, which causes unexpected behaviour (if the same array gets fetched sorting them again, but not in the right way)
    if (data[0].publishedAt.includes("Z")) {
      sortOnPublishedDate();
    }

    data = data.map((item: NewsItemType) => {
      //Remove the sourcename from the title
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item.title.includes(item.source.name!) &&
        item.source.name !== null
      ) {
        const replaceBase = " - " + item.source.name;
        item.title = item.title.replace(replaceBase, "");
      }

      //Add the fetched newsData array to localstorage to be able to get it after page reloads or when coming back from external pages
      localStorage.setItem("newsData", JSON.stringify(data));
      return item;
    });

    //Populate the data variable
    this.queriedNewsItems = data;
  }

  @Mutation
  addFetchBaseToState(fetchBaseObject: FetchBase): void {
    this.fetchBaseObject = fetchBaseObject;
  }

  @Action
  setBooleanOfCategoriesPageEvent(categoryPageBoolean: boolean): boolean {
    this.context.commit("addBooleanOfCategoriesPageEvent", categoryPageBoolean);
    return categoryPageBoolean;
  }

  //Fetch the newsData based on what the user selects on the UI
  @Action
  async fetchNewsQuery(fetchBaseObject: FetchNews) {
    //Save the fetch base in localStorage for when a user reloads the Detail Page
    localStorage.setItem("fetchBase", fetchBaseObject.fetchBase);
    localStorage.setItem("typeOfFetchBase", fetchBaseObject.typeOfFetchBase);

    let fetchUrl = "";

    //Country conditions to fetch a country's news dynamically
    //The url needs to contain the country abbreviations
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
      if (fetchBaseObject.fetchBase === "Morocco") {
        countryToFetch = "ma";
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
        countryToFetch = "us";
      }

      fetchUrl = `https://newsapi.org/v2/top-headlines?country=${countryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
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
      fetchUrl = `https://newsapi.org/v2/everything?q=${newsCategoryToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }

    if (fetchBaseObject.typeOfFetchBase === "fetchInput") {
      const inputToFetch = fetchBaseObject.fetchBase;

      fetchUrl = `https://newsapi.org/v2/everything?q=${inputToFetch}&apiKey=771f495b60b94bfabf9a9800d4996456`;
    }

    //Variable that holds the url to be fetched and sent to the backend
    const bodyWithUrls = { fetchUrl };

    //Based on the mode, make a call to my restAPI
    let url = "";
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/";
    }

    if (process.env.NODE_ENV === "production") {
      url = "https://worldnews-app.herokuapp.com/";
    }

    //Make a call to the back-end to fetch the data
    // await fetch(
    //   url,

    //   {
    //     method: "POST",

    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify(bodyWithUrls),
    //   }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })

    //   .then((data) => {
    //     data = data.articles;

    //TEST MODE
    //*********************************
    //TEST MODE

    // Set the data to the country array in the offline data document if the user wants to fetch a country
    let data: any;
    data = offLineData.UnitedStates;

    if (fetchBaseObject.typeOfFetchBase === "fetchCountry") {
      data = offLineData.UnitedStates;
      if (fetchBaseObject.fetchBase === "Argentina") {
        data = offLineData.Argentina;
      }
      if (fetchBaseObject.fetchBase === "Australia") {
        data = offLineData.Australia;
      }
      if (fetchBaseObject.fetchBase === "Austria") {
        data = offLineData.Austria;
      }
      if (fetchBaseObject.fetchBase === "Belgium") {
        data = offLineData.Belgium;
      }
      if (fetchBaseObject.fetchBase === "Brazil") {
        data = offLineData.Brazil;
      }
      if (fetchBaseObject.fetchBase === "Bulgaria") {
        data = offLineData.Bulgaria;
      }
      if (fetchBaseObject.fetchBase === "Canada") {
        data = offLineData.Canada;
      }
      if (fetchBaseObject.fetchBase === "China") {
        data = offLineData.China;
      }
      if (fetchBaseObject.fetchBase === "Colombia") {
        data = offLineData.Colombia;
      }
      if (fetchBaseObject.fetchBase === "Cuba") {
        data = offLineData.Cuba;
      }
      if (fetchBaseObject.fetchBase === "Czech Republic") {
        data = offLineData.CzechRepublic;
      }
      if (fetchBaseObject.fetchBase === "Egypt") {
        data = offLineData.Egypt;
      }
      if (fetchBaseObject.fetchBase === "France") {
        data = offLineData.France;
      }
      if (fetchBaseObject.fetchBase === "Germany") {
        data = offLineData.Germany;
      }
      if (fetchBaseObject.fetchBase === "Greece") {
        data = offLineData.Greece;
      }
      if (fetchBaseObject.fetchBase === "Hong Kong") {
        data = offLineData.HongKong;
      }
      if (fetchBaseObject.fetchBase === "Hungary") {
        data = offLineData.Hungary;
      }
      if (fetchBaseObject.fetchBase === "India") {
        data = offLineData.India;
      }
      if (fetchBaseObject.fetchBase === "Indonesia") {
        data = offLineData.Indonesia;
      }
      if (fetchBaseObject.fetchBase === "Ireland") {
        data = offLineData.Ireland;
      }
      if (fetchBaseObject.fetchBase === "Israel") {
        data = offLineData.Israel;
      }
      if (fetchBaseObject.fetchBase === "Italy") {
        data = offLineData.Italy;
      }
      if (fetchBaseObject.fetchBase === "Japan") {
        data = offLineData.Japan;
      }
      if (fetchBaseObject.fetchBase === "Latvia") {
        data = offLineData.Latvia;
      }
      if (fetchBaseObject.fetchBase === "Lithuania") {
        data = offLineData.Lithuania;
      }
      if (fetchBaseObject.fetchBase === "Malaysia") {
        data = offLineData.Malaysia;
      }
      if (fetchBaseObject.fetchBase === "Mexico") {
        data = offLineData.Mexico;
      }
      if (fetchBaseObject.fetchBase === "Morocco") {
        data = offLineData.Morocco;
      }
      if (fetchBaseObject.fetchBase === "Netherlands") {
        data = offLineData.Netherlands;
      }
      if (fetchBaseObject.fetchBase === "New Zealand") {
        data = offLineData.NewZealand;
      }
      if (fetchBaseObject.fetchBase === "Nigeria") {
        data = offLineData.Nigeria;
      }
      if (fetchBaseObject.fetchBase === "Norway") {
        data = offLineData.Norway;
      }
      if (fetchBaseObject.fetchBase === "Philippines") {
        data = offLineData.Phillippines;
      }
      if (fetchBaseObject.fetchBase === "Poland") {
        data = offLineData.Poland;
      }
      if (fetchBaseObject.fetchBase === "Portugal") {
        data = offLineData.Portugal;
      }
      if (fetchBaseObject.fetchBase === "Romania") {
        data = offLineData.Romania;
      }
      if (fetchBaseObject.fetchBase === "Russia") {
        data = offLineData.Russia;
      }
      if (fetchBaseObject.fetchBase === "Saudi Arabia") {
        data = offLineData.SaudiArabia;
      }
      if (fetchBaseObject.fetchBase === "Serbia") {
        data = offLineData.Serbia;
      }
      if (fetchBaseObject.fetchBase === "Singapore") {
        data = offLineData.Singapore;
      }
      if (fetchBaseObject.fetchBase === "Slovakia") {
        data = offLineData.Slovakia;
      }
      if (fetchBaseObject.fetchBase === "Slovenia") {
        data = offLineData.Slovenia;
      }
      if (fetchBaseObject.fetchBase === "South Africa") {
        data = offLineData.SouthAfrica;
      }
      if (fetchBaseObject.fetchBase === "South Korea") {
        data = offLineData.SouthKorea;
      }
      if (fetchBaseObject.fetchBase === "Sweden") {
        data = offLineData.Sweden;
      }
      if (fetchBaseObject.fetchBase === "Switzerland") {
        data = offLineData.Switzerland;
      }
      if (fetchBaseObject.fetchBase === "Taiwan") {
        data = offLineData.Taiwan;
      }
      if (fetchBaseObject.fetchBase === "Thailand") {
        data = offLineData.Thailand;
      }
      if (fetchBaseObject.fetchBase === "Turkey") {
        data = offLineData.Turkey;
      }
      if (fetchBaseObject.fetchBase === "United Arabic Emirates") {
        data = offLineData.UnitedArabicEmirates;
      }
      if (fetchBaseObject.fetchBase === "Ukraine") {
        data = offLineData.Ukraine;
      }
      if (fetchBaseObject.fetchBase === "United Kingdom") {
        data = offLineData.UnitedKingdom;
      }
      if (fetchBaseObject.fetchBase === "United States") {
        data = offLineData.UnitedStates;
      }
      if (fetchBaseObject.fetchBase === "Venezuela") {
        data = offLineData.Venezuela;
      }
      if (fetchBaseObject.fetchBase === "Default Country") {
        data = offLineData.defaultCountry;
      }
    }

    // Set the data to the country array in the offline data document if the user wants to fetch a country
    if (fetchBaseObject.typeOfFetchBase === "fetchNewsCategory") {
      if (fetchBaseObject.fetchBase === "Economics") {
        data = offLineData.Economics;
      }
      if (fetchBaseObject.fetchBase === "Politics") {
        data = offLineData.Politics;
      }
      if (fetchBaseObject.fetchBase === "Science") {
        data = offLineData.Science;
      }
      if (fetchBaseObject.fetchBase === "Health") {
        data = offLineData.Health;
      }
      if (fetchBaseObject.fetchBase === "Sports") {
        data = offLineData.Sports;
      }
      if (fetchBaseObject.fetchBase === "Leisuer") {
        data = offLineData.Leisure;
      }
      if (fetchBaseObject.fetchBase === "Entertainment") {
        data = offLineData.Entertainment;
      }
      if (fetchBaseObject.fetchBase === "Travel") {
        data = offLineData.Travel;
      }
      if (fetchBaseObject.fetchBase === "Default News Category") {
        data = offLineData.Economics;
      }
    }

    //Set the data to a default if a user wants to fetch by input
    if (fetchBaseObject.typeOfFetchBase === "fetchInput") {
      data = offLineData.Trump;
    }

    //TEST MODE
    //*********************************
    //TEST MODE

    //Call the mutator
    this.context.commit("addQueriedNewsDataToState", data);

    //Call the mutator
    this.context.commit("addFetchBaseToState", fetchBaseObject);
    // });
    url = "";
  }
}

export default getModule(NewsModule, store);
