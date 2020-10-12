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

import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";
import NewsItemType from "../../interfacesforapp";
// import FetchNews from "../../interfacesforapp";
// import FetchBase from "../../interfacesforapp";

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  //state

  queriedNewsItems: NewsItemType[] = [];
  fetchBaseObject: FetchBase = {};

  //getter to load the data in components
  get queriedNewsItemsGetter(): NewsItemType[] {
    return this.queriedNewsItems;
  }

  @Mutation
  addQueriedNewsDataToState(data: NewsItemType[]): void {
    data = data.map((item: NewsItemType) => {
      //remove the sourcename from the title
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item.title.includes(item.source.name!) &&
        item.source.name !== null
      ) {
        const replaceBase = " - " + item.source.name;
        item.title = item.title.replace(replaceBase, "");
      }
      //add the fetched newsData array to localstorage to be able to get it after page reloads or when coming back from external pages
      localStorage.setItem("newsData", JSON.stringify(data));
      return item;
    });
    //populate the data variable
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

  //fetch the country newsData if a user selects a certain country
  @Action
  async fetchNewsQuery(fetchBaseObject: FetchNews) {
    //save the fetch base in localStorage for when a user reloads the Detail Page
    localStorage.setItem("fetchBase", fetchBaseObject.fetchBase);
    localStorage.setItem("typeOfFetchBase", fetchBaseObject.typeOfFetchBase);

    // if(fetchBase === selectedCountry)

    let fetchUrl = "";

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

    //variable that holds the url to be fetched and sent to the backend
    const bodyWithUrls = { fetchUrl };

    //based on the mode, make a call to my restAPI
    let url = "";
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000/";
    }
    if (process.env.NODE_ENV === "production") {
      url = "https://worldnews-app.herokuapp.com/";
    }

    //make a call to the back-end to fetch the data
    await fetch(
      url,

      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bodyWithUrls),
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })

      .then((data) => {
        console.log(data);
        data = data.articles;

        //DATA to play around with to avoid making too many requests from the API (500 max a day!)//
        // let data = [
        //   {
        //     source: {
        //       id: null,
        //       name: "Boing Boing",
        //     },
        //     author: "Mark Frauenfelder",
        //     title: "The case for banning gold mining",
        //     description:
        //       "The world would be better off without gold mines, argues JP Koning. What would happen if mines (which are big polluters) stopped producing 3,000 tonnes of gold annually so we had to make do with what we already have (around 190,000 tonnes)? We already have en…",
        //     url:
        //       "https://boingboing.net/2020/08/28/the-case-for-banning-gold-mini.html",
        //     urlToImage:
        //       "https://i0.wp.com/boingboing.net/wp-content/uploads/2020/08/Depositphotos_63198097_s-2019.jpg?fit=700%2C463&ssl=1",
        //     publishedAt: "2020-08-28T15:51:21Z",
        //     content:
        //       "The world would be better off without gold mines, argues JP Koning. What would happen if mines (which are big polluters) stopped producing 3,000 tonnes of gold annually so we had to make do with what… [+2772 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "Boing Boing",
        //     },
        //     author: "Mark Frauenfelder",
        //     title:
        //       "How Starbucks borrows money from its customers at a negative 10% interest rate",
        //     description:
        //       "This essay from Moneyness by JP Koning is from 2019, but I just came across it. It's about Starbucks stored value accounts, which come in the form of physical cards but also as smartphone and smartwatch apps. In 2019 customers were holding about $1.6 billion …",
        //     url:
        //       "https://boingboing.net/2020/09/08/how-starbucks-borrows-money-fr.html",
        //     urlToImage:
        //       "https://i2.wp.com/boingboing.net/wp-content/uploads/2020/09/kyotostarbucks.jpg?fit=700%2C769&ssl=1",
        //     publishedAt: "2020-09-08T16:50:19Z",
        //     content:
        //       "It amounts to ~6% of all of the company's liabilities.\r\nThis is a pretty incredible number. Stored value card liabilities are the money that you, oh loyal Starbucks customer, use to buy coffee. What … [+529 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Abhinav Ramnarayan",
        //     title:
        //       "The Hut Group poised to launch $5.9 billion London listing, sources say - Reuters",
        //     description:
        //       "British e-commerce firm The Hut Group could launch an initial public offering (IPO) as early as this week in a deal that could value the company at up to 4.5 billion pounds ($5.9 billion), two sources with knowledge of the matter said.",
        //     url: "https://www.reuters.com/article/us-thehutgroup-ipo-idUSKBN25M1ZQ",
        //     urlToImage:
        //       "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        //     publishedAt: "2020-08-26T14:51:00Z",
        //     content:
        //       "LONDON (Reuters) - British e-commerce firm The Hut Group could launch an initial public offering (IPO) as early as this week in a deal that could value the company at up to 4.5 billion pounds ($5.9 b… [+2035 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title:
        //       "Samsung Elec wins $6.7 billion Verizon order for network equipment - Reuters",
        //     description:
        //       "Samsung Electronics <005930.KS> said on Monday its U.S. unit won a 7.9 trillion won ($6.7 billion) order to provide wireless communication solutions to Verizon in the United States.",
        //     url:
        //       "https://www.reuters.com/article/us-samsung-elec-verizon-idUSKBN25Y00Z",
        //     urlToImage:
        //       "https://s2.reutersmedia.net/resources/r/?m=02&d=20200907&t=2&i=1532417661&w=1200&r=LYNXMPEG8600F",
        //     publishedAt: "2020-09-07T00:31:00Z",
        //     content:
        //       "SEOUL (Reuters) - Samsung Electronics (005930.KS) said on Monday its U.S. unit won a 7.9 trillion won ($6.7 billion) order to provide wireless communication solutions to Verizon (VZ.N) in the United … [+747 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "Gigaom.com",
        //     },
        //     author: "Michael Desmond",
        //     title: "RPA Redux",
        //     description:
        //       "It was just over a year ago when former GigaOm Analyst JP Morgenthal published an in-depth Key Criteria/Market Landscape report, titled “Robotic…",
        //     url: "https://gigaom.com/2020/09/04/rpa-redux/",
        //     urlToImage:
        //       "https://storage.googleapis.com/stateless-gigaom-com/2018/11/bigstock-Application-Architecture-and-A-200604649-1024x512.jpg",
        //     publishedAt: "2020-09-04T22:00:20Z",
        //     content:
        //       "It was just over a year ago when former GigaOm Analyst JP Morgenthal published an in-depth Key Criteria/Market Landscape report, titled Robotic Process Automation in Digital Transformation. In it, JP… [+3151 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "AppleInsider",
        //     },
        //     author: "news@appleinsider.com (Mike Peterson)",
        //     title:
        //       "Apple Watch will drive Sept. 15 event with possible 'iPhone 12' announcement, says JP Morgan",
        //     description:
        //       "JP Morgan expects Apple's Sept. 15 event to drive upside for AAPL due to an Apple Watch launch, and a possible iPhone announcement.Credit: Andrew O'Hara, AppleInsiderIn a note to investors seen by AppleInsider, JP Morgan analyst Samik Chatterjee reiterates th…",
        //     url:
        //       "https://appleinsider.com/articles/20/09/09/jp-morgan-expects-apple-watch-to-drive-sept-15-event-with-possible-iphone-announcement",
        //     urlToImage:
        //       "https://photos5.appleinsider.com/gallery/37570-70614-49025332043_6065cefdf2_k(1)-xl.jpg",
        //     publishedAt: "2020-09-09T15:39:28Z",
        //     content:
        //       "JP Morgan expects Apple's Sept. 15 event to drive upside for AAPL due to an Apple Watch launch, and a possible iPhone announcement.\r\nIn a note to investors seen by AppleInsider, JP Morgan analyst Sam… [+1905 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title: "JPMorgan hires UK ex-finance minister Javid - Reuters",
        //     description:
        //       "Wall Street giant JPMorgan has hired Britain's former finance minister Sajid Javid as a senior adviser, the bank said on Monday, a move that sees the politician resume his career in investment banking.",
        //     url: "https://www.reuters.com/article/us-jp-morgan-javid-idUSKCN25D2BA",
        //     urlToImage:
        //       "https://s2.reutersmedia.net/resources/r/?m=02&d=20200817&t=2&i=1529950143&w=1200&r=LYNXNPEG7G1BI",
        //     publishedAt: "2020-08-17T18:40:00Z",
        //     content:
        //       "LONDON (Reuters) - Wall Street giant JPMorgan (JPM.N) has hired Britain’s former finance minister Sajid Javid as a senior adviser, the bank said on Monday, a move that sees the politician resume his … [+1242 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title: "The Hut Group launches $1.22 billion London float - Reuters",
        //     description:
        //       "E-commerce firm The Hut Group confirmed its intention to float on the London Stock Exchange on Thursday, in potentially the biggest listing of a British company since 2013 and the first major London listing since the COVID-19 crisis.",
        //     url:
        //       "https://www.reuters.com/article/us-the-hut-group-ipo-idUSKBN25U0UQ",
        //     urlToImage:
        //       "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        //     publishedAt: "2020-09-03T06:51:00Z",
        //     content:
        //       "LONDON (Reuters) - E-commerce firm The Hut Group confirmed its intention to float on the London Stock Exchange on Thursday, in potentially the biggest listing of a British company since 2013 and the … [+1266 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title:
        //       "KKR-backed Academy Sports and Outdoors files for U.S. IPO - Reuters",
        //     description:
        //       "Academy Sports and Outdoors Inc, owned by U.S. private equity firm KKR & Co, on Wednesday filed for an initial public offering in the United States, making it the latest firm to cash in on the stunning recovery in capital markets from the COVID-19 pandemic.",
        //     url:
        //       "https://www.reuters.com/article/academy-sports-and-outdoors-ipo-idUSL4N2G63KG",
        //     urlToImage:
        //       "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        //     publishedAt: "2020-09-09T20:20:00Z",
        //     content:
        //       "Sept 9 (Reuters) - Academy Sports and Outdoors Inc, owned by U.S. private equity firm KKR &amp; Co, on Wednesday filed for an initial public offering in the United States, making it the latest firm t… [+1037 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "Yahoo Entertainment",
        //     },
        //     author: "PR Newswire",
        //     title:
        //       "German real estate investment company LINUS Capital opens office in London, UK",
        //     description:
        //       "LINUS Capital continues its growth trajectory by establishing a presence in the United Kingdom (UK). The Berlin-based investment company finances real estate projects with debt and mezzanine capital through its self-managed £320 million debt fund. LINUS gives…",
        //     url:
        //       "https://finance.yahoo.com/news/german-real-estate-investment-company-080000300.html",
        //     urlToImage:
        //       "https://s.yimg.com/uu/api/res/1.2/iJxOA4vWlW5bRYh1aH3Rdw--~B/aD02NDt3PTQwMDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/prnewswire.com/41e1da18c257866b74a50dea36f97730",
        //     publishedAt: "2020-09-21T08:00:00Z",
        //     content:
        //       "In the trailer for First Kid, the forgettable 1996 comedy about a Secret Service agent assigned to protect the presidents son, the title character, played by a teenage Brock Pierce, describes himself… [+27305 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title: "RPT-JPMorgan hires ex-UK finance minister Javid - Reuters",
        //     description: "RPT-JPMorgan hires ex-UK finance minister Javid Reuters",
        //     url: "https://www.reuters.com/article/jp-morgan-javid-idUSL8N2FK1J4",
        //     urlToImage:
        //       "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        //     publishedAt: "2020-08-18T07:09:00Z",
        //     content:
        //       "(Repeats story that ran late Monday) \r\nLONDON, Aug 17 (Reuters) - Wall Street giant JPMorgan has hired Britain’s former finance minister Sajid Javid as a senior adviser, the bank said on Monday, a mo… [+1304 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title: "JPMorgan hires UK ex-finance minister Javid - Reuters UK",
        //     description:
        //       "Wall Street giant JPMorgan has hired Britain's former finance minister Sajid Javid as a senior adviser, the bank said on Monday, a move that sees the politician resume his career in investment banking.",
        //     url: "https://uk.reuters.com/article/us-jp-morgan-javid-idUKKCN25D2BA",
        //     urlToImage:
        //       "https://s2.reutersmedia.net/resources/r/?m=02&d=20200817&t=2&i=1529950143&w=1200&r=LYNXNPEG7G1BI",
        //     publishedAt: "2020-08-17T18:39:00Z",
        //     content:
        //       "LONDON (Reuters) - Wall Street giant JPMorgan (JPM.N) has hired Britain’s former finance minister Sajid Javid as a senior adviser, the bank said on Monday, a move that sees the politician resume his … [+1242 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Staff",
        //     title:
        //       "Samsung Electronics wins $6.7 billion Verizon order for network equipment - Reuters UK",
        //     description:
        //       "Samsung Electronics <005930.KS> said on Monday its U.S. unit won a 7.9 trillion won (£5.05 billion) order to provide wireless communication solutions to Verizon <VZ.N> in the United States.",
        //     url:
        //       "https://uk.reuters.com/article/uk-samsung-elec-verizon-idUKKBN25Y01F",
        //     urlToImage:
        //       "https://static.reuters.com/resources/r/?m=02&d=20200907&t=2&i=1532418485&r=LYNXMPEG8600R&w=800",
        //     publishedAt: "2020-09-07T00:42:00Z",
        //     content:
        //       "By Reuters Staff\r\nFILE PHOTO: The logo of Samsung Electronics is seen at its office building in Seoul, South Korea, March 23, 2018. REUTERS/Kim Hong-Ji/File Photo\r\nSEOUL (Reuters) - Samsung Electroni… [+794 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "AppleInsider",
        //     },
        //     author: "news@appleinsider.com (Mike Peterson)",
        //     title:
        //       "Apple smartphone shipments rebounding in China ahead of 'iPhone 12' launch",
        //     description:
        //       "Ahead of Apple's iPhone launch season, investment bank JP Morgan says that an August rebound in Chinese mobile device shipment in indicates improving momentum for the smartphone market.Credit: Andrew O'Hara, AppleInsiderIn a note to investors seen by AppleIns…",
        //     url:
        //       "https://appleinsider.com/articles/20/09/10/apple-smartphone-shipments-rebounding-in-china-ahead-of-iphone-12-launch",
        //     urlToImage:
        //       "https://photos5.appleinsider.com/gallery/37582-70631-iPhone-12-Lineup-xl.jpg",
        //     publishedAt: "2020-09-10T14:04:34Z",
        //     content:
        //       "Ahead of Apple's iPhone launch season, investment bank JP Morgan says that an August rebound in Chinese mobile device shipment in indicates improving momentum for the smartphone market.\r\nIn a note to… [+1950 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Kane Wu",
        //     title:
        //       "UPDATE 1-Ant Group makes pre-listing filing in China for blockbuster IPO - Reuters",
        //     description:
        //       "Ant Group, the fintech arm of Chinese e-commerce company Alibaba Group Holding, has made a preparatory filing with China's securities regulator for its planned blockbuster initial public offering onshore.",
        //     url: "https://www.reuters.com/article/ant-group-ipo-idUSL4N2FG3I9",
        //     urlToImage:
        //       "https://s4.reutersmedia.net/resources_v2/images/rcom-default.png",
        //     publishedAt: "2020-08-14T14:07:00Z",
        //     content:
        //       "(Adds banks, timetable on Hong Kong listing and offering size) \r\nBy Kane Wu and Julie Zhu \r\nHONG KONG, Aug 14 (Reuters) - Ant Group, the fintech arm of Chinese e-commerce company Alibaba Group Holdin… [+1571 chars]",
        //   },
        //   {
        //     source: {
        //       id: "business-insider",
        //       name: "Business Insider",
        //     },
        //     author: "Sponsor Post",
        //     title:
        //       "Changes to the ways we work are all but certain. Managers should watch this discussion for tips on fostering worker resilience.",
        //     description:
        //       "<ul>\n<li>The worker experience is likely to remain altered for the foreseeable future, creating uncertainty and testing worker resilience.</li>\n<li>Most managers use technology to maintain connection and collaborate virtually with their teams.</li>\n<li>This c…",
        //     url:
        //       "https://www.businessinsider.com/sc/foster-worker-resilience-with-insights-from-two-technology-executives-2020-8",
        //     urlToImage:
        //       "https://i.insider.com/5f1206f3aee6a83f4025e189?width=1200&format=jpeg",
        //     publishedAt: "2020-08-13T19:30:00Z",
        //     content:
        //       "In the spring of 2020, when COVID-19 disrupted the work styles and team structures of companies around the world, the immediate focus was maintaining the continuity of work as carefully as possible.\r… [+957 chars]",
        //   },
        //   {
        //     source: {
        //       id: "reuters",
        //       name: "Reuters",
        //     },
        //     author: "Reuters Editorial",
        //     title:
        //       "JPMorgan to pay $1 billion for full ownership of China mutual fund JV - Reuters",
        //     description:
        //       "JPMorgan is to pay $1 billion for full ownership of its Chinese mutual fund venture, a statement on the Shanghai United Asset and Equity Exchange said on Tuesday, a price tag that analysts said was expensive.",
        //     url:
        //       "https://www.reuters.com/article/us-china-fund-jpmorgan-idUSKBN25L1HA",
        //     urlToImage:
        //       "https://s3.reutersmedia.net/resources/r/?m=02&d=20200825&t=2&i=1530927819&w=1200&r=LYNXMPEG7O0XL",
        //     publishedAt: "2020-08-25T12:12:00Z",
        //     content:
        //       "SHANGHAI (Reuters) - JPMorgan (JPM.N) is to pay $1 billion for full ownership of its Chinese mutual fund venture, a statement on the Shanghai United Asset and Equity Exchange said on Tuesday, a price… [+1759 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "MarketWatch",
        //     },
        //     author: "Joy Wiltermuth",
        //     title:
        //       "Market Extra: JP Morgan enters green bond push with $1 billion debut debt deal",
        //     description:
        //       "JP Morgan follows Citigroup and Bank of America into the 'green' debt fray, as big U.S. banks start issuing more debt specifically to fund projects with a sustainable bent.",
        //     url:
        //       "https://www.marketwatch.com/story/jp-morgan-enters-green-bond-push-with-1-billion-debut-debt-deal-11599703139",
        //     urlToImage: "https://images.mktw.net/im-230438/social",
        //     publishedAt: "2020-09-10T01:59:00Z",
        //     content:
        //       "JP Morgan Chase &amp; Co. entered the green-bond world on Wednesday, offloading the banks first set of bonds specifically to fund projects with a sustainability bent.While the banking giant has arran… [+3701 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "AppleInsider",
        //     },
        //     author: "news@appleinsider.com (Mike Peterson)",
        //     title: "JP Morgan raises AAPL price target to $150, with room to grow",
        //     description:
        //       "JP Morgan has raised its 12-month price AAPL target to $150 after Apple's four-for-one split, noting that there are still significant upsides to the stock despite its already rich valuation.Credit: Andrew O'Hara, AppleInsiderIn a note to investors seen by App…",
        //     url:
        //       "https://appleinsider.com/articles/20/09/01/jp-morgan-raises-aapl-price-target-to-150-with-room-to-grow",
        //     urlToImage:
        //       "https://photos5.appleinsider.com/gallery/37436-70297-50086957093_d4e72f968e_k(1)-xl.jpg",
        //     publishedAt: "2020-09-01T14:16:05Z",
        //     content:
        //       "JP Morgan has raised its 12-month price AAPL target to $150 after Apple's four-for-one split, noting that there are still significant upsides to the stock despite its already rich valuation.\r\nIn a no… [+2072 chars]",
        //   },
        //   {
        //     source: {
        //       id: null,
        //       name: "Livedoor.jp",
        //     },
        //     author: "dqnplus",
        //     title: "【画像】 とんでもない家が激写される",
        //     description:
        //       "1 名前：コビシスタット(栃木県) [JP]：2020/09/02(水) 10:08:09.71 ID:t2t/BD+40\n\n\n\nYuko Mohri 毛利悠子 @mo_hrizm\nなんか一本で建ってる\n\nhttps://twitter.com/mo_hrizm/status/1300748965369925632",
        //     url: "http://blog.livedoor.jp/dqnplus/archives/2002917.html",
        //     urlToImage: "https://livedoor.blogimg.jp/dqnplus/imgs/a/e/ae3a3724.jpg",
        //     publishedAt: "2020-09-02T10:13:21Z",
        //     content: null,
        //   },
        // ];
        //HONG KONG
        //HONG KONG
        //HONG KONG
        //HONG KONG
        //HONG KONG
        //HONG KONG
        // if (fetchBaseObject.fetchBase === "Hong Kong") {
        //   data = [
        //     {
        //       source: { id: null, name: "Mingpao.com" },
        //       author: "https://www.facebook.com/mingpaoinews",
        //       title:
        //         "新冠肺炎｜袁國勇籲巿民進入嚴密戒備狀態(12:10) - 20201008 - 港聞 - 明報新聞網",
        //       description:
        //         "本港新型冠狀病毒疫情有反彈迹象，港大微生物學系講座教授袁國勇今早（8日）在商台節目提醒，不應待疫情爆發嚴重才增加防疫措施，市民現已應開始進入嚴密戒備狀態，盡早斬斷隱性傳播鏈。",
        //       url:
        //         "https://news.mingpao.com/ins/%e6%b8%af%e8%81%9e/article/20201008/s00001/1602127604456/%e6%96%b0%e5%86%a0%e8%82%ba%e7%82%8e-%e8%a2%81%e5%9c%8b%e5%8b%87%e7%b1%b2%e5%b7%bf%e6%b0%91%e9%80%b2%e5%85%a5%e5%9a%b4%e5%af%86%e6%88%92%e5%82%99%e7%8b%80%e6%85%8b",
        //       urlToImage:
        //         "https://fs.mingpao.com/ins/20201008/s00001/3e374ec3e02a184a56508ed5fc7c7b79.jpg",
        //       publishedAt: "2020-10-08T04:19:17Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Thestandnews.com" },
        //       author: "立場報道",
        //       title:
        //         "何俊堯斥作供警「大話冚大話」 司法機構：投訴不成立裁判官有權評證人可信性| 立場報道 - 立場新聞",
        //       description:
        //         "由中聯辦控制《大公報》、《文匯報》近期多次炮轟裁判官何俊堯，批評他「放生黑暴被告」，親中陣營發...",
        //       url:
        //         "https://www.thestandnews.com/politics/%E8%A3%81%E5%88%A4%E5%AE%98%E4%BD%95%E4%BF%8A%E5%A0%AF%E6%96%A5%E4%BD%9C%E4%BE%9B%E8%AD%A6-%E5%A4%A7%E8%A9%B1%E5%86%9A%E5%A4%A7%E8%A9%B1-%E5%8F%B8%E6%B3%95%E6%A9%9F%E6%A7%8B-%E6%8A%95%E8%A8%B4%E4%B8%8D%E6%88%90%E7%AB%8B-%E5%AE%98%E6%9C%89%E6%AC%8A%E8%A9%95%E8%AB%96%E8%AD%89%E4%BA%BA%E5%8F%AF%E4%BF%A1%E6%80%A7/",
        //       urlToImage:
        //         "https://cdn.thestandnews.com/media/photos/cache/judge-04_rubIs_1200x630cropcenter.png",
        //       publishedAt: "2020-10-08T03:37:21Z",
        //       content: "© 2020 . All rights reserved.",
        //     },
        //     {
        //       source: { id: null, name: "Hket.com" },
        //       author: "香港經濟日報HKET",
        //       title:
        //         "【新冠肺炎】港大數據指病毒有效繁殖率超越1 反映疫情有爆發趨勢- 香港經濟日報- TOPick - 新聞- 社會 - 香港經濟日報 - TOPick",
        //       description:
        //         "本港新冠肺炎疫情反覆，已連續8天錄得本地感染個案。港大醫學院公共衞生學院的實時數據顯示，本地病毒即時有效繁殖率（傳播率）由9月中的約0.5，回升近一倍至今日（8日）起突破1，推斷每個患者可以將病毒傳染",
        //       url:
        //         "https://topick.hket.com/article/2771540/【新冠肺炎】港大數據指病毒有效繁殖率超越1反映疫情有爆發趨勢",
        //       urlToImage:
        //         "https://static02-proxy.hket.com/res/v3/image/content/2770000/2771540/leung_exmobile_20201008_J_1024.png",
        //       publishedAt: "2020-10-08T02:57:00Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Hket.com" },
        //       author: "香港經濟日報HKET",
        //       title:
        //         "【新冠肺炎】消息：今日新增約17宗確診個案疫情似有反彈之勢- 香港經濟日報- TOPick - 新聞- 社會 - 香港經濟日報 - TOPick",
        //       description:
        //         "本港新冠肺炎疫情似有反彈之勢，消息指今日（8日）新增約17宗確診個案。昨日（7日）新增11宗確診個案，2宗屬輸入個案，其餘9宗為本地感染，當中有3宗為源頭不明個案。昨日新增的本地不明源頭個案涉及三個群",
        //       url:
        //         "https://topick.hket.com/article/2771513/【新冠肺炎】消息：今日新增約17宗確診個案疫情似有反彈之勢",
        //       urlToImage:
        //         "https://static02-proxy.hket.com/res/v3/image/content/2770000/2771513/case_exmobile_20201008_J_1024.png",
        //       publishedAt: "2020-10-08T02:32:00Z",
        //       content:
        //         "817711293\r\n2\r\n2\r\n382\r\nTOPick\r\n/Appbit.ly/2JdOaiS\r\nTOPick Telegrambit.ly/3bebLM2",
        //     },
        //     {
        //       source: { id: null, name: "Hk.on.cc" },
        //       author: "",
        //       title: "海洋公園森度遊涉霸官地牟利議員斥思慮不周 - on.cc東網",
        //       description:
        //         "海洋公園獲撥款54億港元「救亡」，本月1日起推出一系列「森度遊」，包括「秘行南朗山」，市民需付80港元活動費。不過，該山",
        //       url:
        //         "https://hk.on.cc/hk/bkn/cnt/news/20201008/bkn-20201008091750500-1008_00822_001.html",
        //       urlToImage:
        //         "https://hk.on.cc/hk/bkn/cnt/news/20201008/photo/bkn-20201008091750500-1008_00822_001_01b.jpg?20201008113537",
        //       publishedAt: "2020-10-08T02:05:34Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Thestandnews.com" },
        //       author: "立場報道",
        //       title:
        //         "特朗普稱感染武肺是「上帝祝福」 承諾免費為國民提供新藥重提「是中國的錯，要付沉重代價」 | 立場報道 - 立場新聞",
        //       description:
        //         "感染武漢肺炎 (COVID-19) 留院 3 晚即出院的美國總統特朗普，首次回到橢圓形辦公室工...",
        //       url:
        //         "https://www.thestandnews.com/international/%E7%89%B9%E6%9C%97%E6%99%AE%E7%A8%B1%E6%84%9F%E6%9F%93%E6%AD%A6%E8%82%BA%E6%98%AF-%E4%B8%8A%E5%B8%9D%E7%A5%9D%E7%A6%8F-%E6%89%BF%E8%AB%BE%E5%85%8D%E8%B2%BB%E7%82%BA%E5%9C%8B%E6%B0%91%E6%8F%90%E4%BE%9B%E6%96%B0%E8%97%A5-%E9%87%8D%E6%8F%90-%E6%98%AF%E4%B8%AD%E5%9C%8B%E7%9A%84%E9%8C%AF-%E8%A6%81%E4%BB%98%E6%B2%89%E9%87%8D%E4%BB%A3%E5%83%B9/",
        //       urlToImage:
        //         "https://cdn.thestandnews.com/media/photos/cache/T_2IdqX_1200x630cropcenter.png",
        //       publishedAt: "2020-10-08T01:24:56Z",
        //       content: "© 2020 . All rights reserved.",
        //     },
        //     {
        //       source: { id: null, name: "Appledaily.com" },
        //       author: "https://www.facebook.com/hk.nextmedia/",
        //       title:
        //         "古蹟重建｜北角皇都戲院強拍新世界底價47.76億投得測量師：保育發展難計投資額 - 香港蘋果日報",
        //       description:
        //         "歷來最大宗強拍項目，位於北角英皇道之北、渣華道之南及與電照街交界，部份建築獲古諮會評為一級歷史建築物的皇都戲院，今日公開拍賣出售，底價47.76億元，強拍申請發展商為新世界發展（017），最終亦由新世界以底價投得。 拍賣自早上10時開始，現場僅有新世界代表參與競投，共有3人出...",
        //       url:
        //         "https://hk.appledaily.com/finance/20201008/COTXF6ME6FACZCIP7QVJ2JC4HY/",
        //       urlToImage:
        //         "https://hk.appledaily.com/resizer/C1W7n2sgcTfxO7borlBQHfM6vBc=/1280x853/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/N7AGNFX5IZHDNJZM24GN4X5MWU.JPG",
        //       publishedAt: "2020-10-08T01:17:19Z",
        //       content:
        //         "47.76017\r\n103147.7647.76\r\n47.763024\r\n3.62195998%201831.1753%\r\n20178258S/H8/26/195910.538.347.761.2\r\n-----------------------------\r\nFAN\r\n-----------------------------\r\ninvestMAN\r\n---------------------… [+89 chars]",
        //     },
        //     {
        //       source: { id: null, name: "Hk01.com" },
        //       author: "許懿安, 梁凱怡",
        //       title:
        //         "賀錦麗：特朗普政府打輸中美貿易戰了彭斯反擊：彭登打都未打過 - 香港01",
        //       description:
        //         "美國副總統候選人辯論當地時間10月7日晚上9時舉行，是共和黨副總統提名人彭斯（Mike Pence）和民主黨副總統提名人賀錦麗（Kamala Harris）之間唯一",
        //       url:
        //         "https://www.hk01.com/即時國際/532758/美副總統候選人辯論結束-賀錦麗善言巧論形象鮮明-彭斯相形見絀",
        //       urlToImage:
        //         "https://cdn.hk01.com/di/media/images/dw/20201008/390823264986992640.jpeg/-zbeMUXVLHKgC85aSpcWXkp4NcX7nS4NaOlmJ2jpZic",
        //       publishedAt: "2020-10-08T00:47:03Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Eprice.com.hk" },
        //       author: "虎仔 / 馬日山",
        //       title: "iPhone 12 發表前調查三分一Android 用戶考慮過檔 - ePrice.HK",
        //       description:
        //         "iPhone12下星期就會發表，雖然未知道具體規格配置，但幾乎可以肯定會支援5G，並且採用最新最快的A14Bionic處理器，傳聞Apple今年將會推出多達4款型號，包括iPhone12mini、iPhone12、iPhone12Pro和iPhone12ProMax，到底有幾多人考慮入手新iPhone呢？",
        //       url: "https://www.eprice.com.hk/mobile/talk/4544/216871/1/",
        //       urlToImage:
        //         "https://timg.eprice.com.hk/hk/mobile/img/2020-10/08/216871/eprice_1_7f4631492bb697b33ac72edcffeb736f.jpg",
        //       publishedAt: "2020-10-08T00:35:55Z",
        //       content:
        //         "iPhone 12 5G A14 Bionic Apple 4 iPhone 12 miniiPhone 12iPhone 12 Pro iPhone 12 Pro Max iPhone SellCell 2,000 Android iPhone 12 33% Android iPhone 12 48.1% iPhone 12 iPhone 12 Pro Max 22.9% \r\nAndroid … [+211 chars]",
        //     },
        //     {
        //       source: { id: null, name: "Sina.com.hk" },
        //       author: "",
        //       title: "當代稀奇古怪手機殼大賞 - 香港新浪網",
        //       description:
        //         "每個時代都有人關心手機的形態，不過要說感知最敏感的，可能是配件廠商, 功能機時代有人爭論翻蓋...",
        //       url:
        //         "https://sina.com.hk/news/article/20201008/0/5/2/當代稀奇古怪手機殼大賞-12260728.html",
        //       urlToImage:
        //         "https://rs3.sinahk.net/1y/cap/crop/0/012/260/728/c.jpg?20201008110055",
        //       publishedAt: "2020-10-08T00:13:00Z",
        //       content:
        //         "OPPO Find X\r\n+\r\nSamsung Galaxy A80 \r\n MIX 3 \r\n MIX Alpha\r\nSamsungSamsung Galaxy Fold\r\nSamsung Galaxy Z Fold2 \r\n Mate Xs \r\nSamsung Galaxy Z Flip \r\n Motorola Razr \r\n Surface Duo Surface Duo Bumper \r\nLG… [+4 chars]",
        //     },
        //     {
        //       source: { id: null, name: "Yahoo Entertainment" },
        //       author: "now.com 體育",
        //       title: "C朗拉莫斯更衣室破冰 - Yahoo體育",
        //       description:
        //         "【Now Sports】西班牙後衛沙治奧拉莫斯與葡萄牙球星基斯坦奴朗拿度於周三友誼賽後，在更衣室兩年來首次重聚，過去的恩怨劃上句號。西班牙於周三友誼賽與葡萄牙0:0握手言和，兩位前皇家馬德里隊友沙治奧拉莫斯和基斯坦奴朗拿度（Cristiano Ronaldo）也兩年來首次重遇，前者賽後就到葡萄牙更衣室探望對方，並獲贈簽名球衣，更一起與比比一起合照。 沙治奧拉莫斯在社交網站分享相片，寫道：「我們終於再次見面，非常高興，老友們！」C朗則在戰衣上寫道：「送給我的好友沙治奧！」這張合照見證了兩人的關係破冰。 原來，沙治奧…",
        //       url:
        //         "https://hk.sports.yahoo.com/news/c%E6%9C%97%E6%8B%89%E8%8E%AB%E6%96%AF%E6%9B%B4%E8%A1%A3%E5%AE%A4%E7%A0%B4%E5%86%B0-000614994.html",
        //       urlToImage:
        //         "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png",
        //       publishedAt: "2020-10-08T00:06:00Z",
        //       content: "Now Sports0:0Cristiano Ronaldo C CCC\r\nnow.com",
        //     },
        //     {
        //       source: { id: null, name: "Yahoo Entertainment" },
        //       author: "東方日報",
        //       title: "亞姐軍心不穩 3分1佳麗退選 - 雅虎香港新聞",
        //       description:
        //         "今屆亞姐再爆負面新聞！有佳麗擔心入圍獎金1萬元落空，拒絕再玩觸發「跳船」潮，結果有三分一佳麗決絕斬纜，只剩14人繼續參選。有人怒斥亞視安排混亂，每日特訓要呆等幾個鐘才開課，怨聲載道！",
        //       url:
        //         "https://hk.news.yahoo.com/%E4%BA%9E%E5%A7%90%E8%BB%8D%E5%BF%83%E4%B8%8D%E7%A9%A9-3%E5%88%861%E4%BD%B3%E9%BA%97%E9%80%80%E9%81%B8-214500348.html",
        //       urlToImage:
        //         "https://s.yimg.com/uu/api/res/1.2/rfFFvh8yRk7_eoLYfRRolw--~B/aD00NTA7dz02MDA7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/zh-TW/thesun.hk.com/5a1880fe85225a8e37ca2149d28118ac",
        //       publishedAt: "2020-10-07T21:45:00Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Mingpao.com" },
        //       author: "https://www.facebook.com/mingpaoinews",
        //       title:
        //         "大陸軍機台空域喊「台灣地區訓練」 台軍事觀察者：如同視自家空域- 20201008 - 中國 - 明報新聞網",
        //       description:
        //         "【明報專訊】解放軍軍機昨日再度飛入台灣防空識別區，並罕有在台軍機廣播驅離時喊話回應，稱是在「我國台灣地區」例行訓練。台軍事觀察者稱，此舉如同視台灣空域為「自家空域」。而作為應對，台空軍年初至今出動2972架次戰機，耗費成本255億元新台幣。",
        //       url:
        //         "https://news.mingpao.com/pns/%e4%b8%ad%e5%9c%8b/article/20201008/s00013/1602095504840/%e5%a4%a7%e9%99%b8%e8%bb%8d%e6%a9%9f%e5%8f%b0%e7%a9%ba%e5%9f%9f%e5%96%8a%e3%80%8c%e5%8f%b0%e7%81%a3%e5%9c%b0%e5%8d%80%e8%a8%93%e7%b7%b4%e3%80%8d-%e5%8f%b0%e8%bb%8d%e4%ba%8b%e8%a7%80%e5%af%9f%e8%80%85-%e5%a6%82%e5%90%8c%e8%a6%96%e8%87%aa%e5%ae%b6%e7%a9%ba%e5%9f%9f",
        //       urlToImage:
        //         "https://fs.mingpao.com/pns/20201008/s00055/2b1b7b62b8b9a1ebf483608566db89d5.jpg",
        //       publishedAt: "2020-10-07T21:10:18Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Yahoo Entertainment" },
        //       author: "now.com 體育",
        //       title: "德國遭土耳其逼和 法國炒烏克蘭7：1 - Yahoo體育",
        //       description:
        //         "【Now Sports】周三國際友誼賽，德國被作客的土耳其逼和3:3，法國主場大炒烏克蘭7:1。德國由射手華特舒密特取代患病缺陣的迪姆雲拿，中場哈伐斯、戴斯拿（Julian Draxler）、祖利安白蘭治支援。雖然有多名主將避戰，但日耳曼兵團仍然在上半場控制戰局，取得5次中目標埋門。 上半場補時1分鐘，哈伐斯交出美妙過頭波，戴斯拿突破越位射入，德國半場領先1:0。49分鐘，隊長中場杜芬擺脫祖利安白蘭治後射入，土耳其追平1:1。德國於9分鐘後有哈伐斯再度交出助攻，翼衛奈侯斯士哥。67分鐘，中場加拉卡爭贏奈侯斯後射入…",
        //       url:
        //         "https://hk.sports.yahoo.com/news/%E5%BE%B7%E5%9C%8B%E9%81%AD%E5%9C%9F%E8%80%B3%E5%85%B6%E9%80%BC%E5%92%8C-%E6%B3%95%E5%9C%8B%E7%82%92%E7%83%8F%E5%85%8B%E8%98%AD7-1-210149427.html",
        //       urlToImage:
        //         "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png",
        //       publishedAt: "2020-10-07T21:01:00Z",
        //       content:
        //         "Now Sports3:37:1Julian Draxler5 11:0491:196743:3 Olivier Giroud111:04:037:1\r\nnow.com",
        //     },
        //     {
        //       source: { id: null, name: "Hket.com" },
        //       author: "香港經濟日報HKET",
        //       title:
        //         "【恒指夜期】美國研再對騰訊出手夜期續漲70點升幅一度蒸發（不斷更新） - 香港經濟日報- 即時新聞頻道- 即市財經 - 香港經濟日報 - 即時新聞",
        //       description:
        //         "港股10月開市連升三日，並突破24000關阻力，一反投資界第四季審慎的預期，恒指從9月25日即市低位23124點計，累升4.8%，期間最主要得力於滙豐同期反彈10.3%。 恒生指數開報23999點，升",
        //       url:
        //         "https://inews.hket.com/article/2770587/【恒指夜期】美國研再對騰訊出手 夜期續漲70點 升幅一度蒸發（不斷更新）",
        //       urlToImage:
        //         "https://static01-proxy.hket.com/res/v3/image/content/2770000/2770587/hsi02_1024.jpeg",
        //       publishedAt: "2020-10-07T20:45:00Z",
        //       content:
        //         "1024000925231244.8%10.3%\r\n239991920024000202404124242262922\r\n00700\r\nADR\r\n<table><tr><td>0400</td><td></td><td></td></tr><tr><td>ADR</td><td>537.23</td><td>+0.4%</td></tr><tr><td>ADR</td><td>287.24</… [+2271 chars]",
        //     },
        //     {
        //       source: { id: null, name: "Mingpao.com" },
        //       author: "https://www.facebook.com/mingpaoinews",
        //       title: "林志玲手術後變圓潤- 20201008 - 娛樂- 每日明報 - 明報新聞網",
        //       description:
        //         "【明報專訊】台灣第一名模林志玲早前被指秘密入醫院接受手術，令外界擔心。她的經理人當時回應指林志玲是因為支氣管問題，常常過敏發炎，檢查呼吸系統後，在醫生建議下做了耳鼻喉科的一個小手術。近日網上流傳一張聲稱是林志玲出院後的最新照片，見到林志玲戴着白色帽，穿喱士上衣，向鏡頭舉起V字手勢。見她面色紅潤，一向面尖尖的她，面形圓潤不少，有點發福。",
        //       url:
        //         "https://news.mingpao.com/pns/%e5%a8%9b%e6%a8%82/article/20201008/s00016/1602095539279/%e6%9e%97%e5%bf%97%e7%8e%b2%e6%89%8b%e8%a1%93%e5%be%8c%e8%ae%8a%e5%9c%93%e6%bd%a4",
        //       urlToImage:
        //         "https://fs.mingpao.com/pns/20201008/s00092/2b20bba8f324b165100f73927bbeeac1.jpg",
        //       publishedAt: "2020-10-07T20:36:27Z",
        //       content: null,
        //     },
        //     {
        //       source: { id: null, name: "Appledaily.com" },
        //       author: "https://www.facebook.com/hk.nextmedia/",
        //       title:
        //         "美國大選：斥佩洛西無誠意與民主黨一拍兩散特朗普兵行險着煞停紓困談判 - 香港蘋果日報",
        //       description:
        //         "美國總統特朗普前日忽然宣佈，叫停白宮與國會民主黨就新一輪財政刺激方案的談判，直至下月大選結束之後，歸咎民主黨籍的眾議院議長佩洛西談判欠誠意。選情墮後的特朗普造勢靠經濟，如今選擇自絕短期內提振經濟的可能性，是跟民主黨一拍兩散的高風險一着。 染上武漢肺炎正在白宮隔離的特朗普，推文...",
        //       url:
        //         "https://hk.appledaily.com/international/20201008/FNDMP2JID5GCHGACQ5ZIUUMKWY/",
        //       urlToImage:
        //         "https://hk.appledaily.com/resizer/685lSZ3piIsFVlBzUikwxp7Pj2w=/1920x1080/filters:quality(100)/d87urpdhi5rdo.cloudfront.net/10-07-2020/t_6643aabdc55d4296ac983e98a60c6bcf_name_20201007_int_06.jpg",
        //       publishedAt: "2020-10-07T20:00:53Z",
        //       content: "© 2020 AD Internet Limited.\r\n© 2020 AD Internet Limited.",
        //     },
        //     {
        //       source: { id: null, name: "Appledaily.com" },
        //       author: "https://www.facebook.com/hk.nextmedia/",
        //       title:
        //         "黑白陳述- 陶傑｜ 果籽｜ 日報｜ 名采｜ l012黃金冒險號｜ 專欄｜ 專欄｜ 20201008 - 香港蘋果日報",
        //       description:
        //         "繼川普中武肺，拜登也遭美國「政治正確」左膠病毒反噬。 代表種族平等大愛包容反極右法西斯、同時又特殊酷愛幼嫩女童肩膊、耳珠、腰肢的拜登，被指竟口出種族歧視之語。網路瘋傳的十秒影片，拜登「語出驚人」，聲稱「我之所以能夠被隔離在家裏，是因為某個黑人婦女能夠在雜貨店搬貨上架。」 雖然...",
        //       url:
        //         "https://hk.appledaily.com/columnist/20201008/QNOXXNLWFBHNHM5IP4K2PLP4ME/",
        //       urlToImage:
        //         "https://hk.appledaily.com/resizer/MewupiWYRmO__7gq-K6q4tfpdPA=/3960x2048/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/72VUIKGASJEGJKNMNQI4MO3H6U.jpg",
        //       publishedAt: "2020-10-07T20:00:50Z",
        //       content: "© 2020 AD Internet Limited.\r\n© 2020 AD Internet Limited.",
        //     },
        //     {
        //       source: { id: null, name: "Yahoo Entertainment" },
        //       author: "on.cc 東網",
        //       title:
        //         "第二期保就業首輪僱主名單出爐 港怡醫院獲批3109萬居榜首 - 雅虎香港新聞",
        //       description:
        //         "【on.cc東網專訊】補貼僱主9至11月支薪的第二期保就業計劃，首批獲得資助的僱主名單今日(7日)出爐，涉及1.92萬名僱主，涉及約68億港元工資補貼，承諾受薪僱員人數超過27萬。此輪獲得最多補貼的是港怡醫院，涉及資助額3109萬港元，承諾受薪僱員為1151人；",
        //       url:
        //         "https://hk.news.yahoo.com/%E7%AC%AC%E4%BA%8C%E6%9C%9F%E4%BF%9D%E5%B0%B1%E6%A5%AD%E9%A6%96%E8%BC%AA%E5%83%B1%E4%B8%BB%E5%90%8D%E5%96%AE%E5%87%BA%E7%88%90-%E6%B8%AF%E6%80%A1%E9%86%AB%E9%99%A2%E7%8D%B2%E6%89%B93109%E8%90%AC%E5%B1%85%E6%A6%9C%E9%A6%96-093147862.html",
        //       urlToImage:
        //         "https://s.yimg.com/uu/api/res/1.2/aoZtZpPRJbdZ0veNmoWlKw--~B/aD01NTU7dz03ODA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/ko/onccinstantnews.com/a0e3125c8061833b47ed16695915bf5c",
        //       publishedAt: "2020-10-07T09:31:00Z",
        //       content:
        //         "on.cc911(7)1.9268273109115118386861646624\r\n2.21315612.5318133810075006100\r\n1.546731.90.6%\r\n()20177()11947()13048166\r\n94942621563()747320TORY BURCH23083()12144\r\n()872335()()10872\r\n584213110\r\n: http://… [+21 chars]",
        //     },
        //     {
        //       source: { id: null, name: "Appledaily.com" },
        //       author: "https://www.facebook.com/hk.nextmedia/",
        //       title:
        //         "美股三件事｜特朗普似收回中止救濟方案談判決定道指收市彈升530點 - 香港蘋果日報",
        //       description:
        //         "【截至05:00】 美國總統特朗普確診武漢肺炎後迅速康復，又似乎收回中止救濟方案談判的決定，刺激美股上升。道指收報28303點，升530點(1.9%)；標普500指數報3419點，升58點(1.7%)；納指報11364點，升210點(1.9%)。 【截至23:40】 救濟方案...",
        //       url:
        //         "https://hk.appledaily.com/finance/20201007/NJCSGYNW5VHZ3LFCZKCNUCMHHY/",
        //       urlToImage:
        //         "https://hk.appledaily.com/resizer/66ELQYyqHuaVM9TREGXbndb7AOc=/720x405/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/BZBYPK77EBCB5IZAVI5H2VTIII.jpg",
        //       publishedAt: "2020-10-07T09:26:55Z",
        //       content:
        //         "05:00\r\n28303530(1.9%)500341958(1.7%)11364210(1.9%)\r\n23:40\r\n1.5%42028,1921.4%1.3%\r\nCatherine WoodARKG9%CRISPR TherapeuticsCPRSCRPSARKG4%\r\n22:00\r\n50011441.3%3,4041.4%\r\nTSM4%86.4\r\nCRISPR Therapeutics4%\r… [+454 chars]",
        //     },
        //   ];
        // }

        // data = [];

        //making sure that the data are always sorted on date: most recent news must be displayed first and so have the highest indexes in the array
        function sortOnPublishedDate(): void {
          function comparePublishData(
            a: NewsItemType,
            b: NewsItemType
          ): number {
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
        }
        sortOnPublishedDate();

        //call the mutator
        this.context.commit("addQueriedNewsDataToState", data);

        //call the mutator
        this.context.commit("addFetchBaseToState", fetchBaseObject);
      });
    url = "";
  }
}

export default getModule(NewsModule, store);
