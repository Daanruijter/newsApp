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

//to use locally saved newsdata//
// import testData from "@/testData";

@Module({ namespaced: true, name: "newsDataModule", store, dynamic: true })
class NewsModule extends VuexModule {
  //state
  news: NewsItemType[] = [];
  queriedNewsItems: NewsItemType[] = [];
  categoriesClickEventBoolean = false;
  fetchBaseObject: FetchBase = {};

  //getters
  get newsDataGetter(): NewsItemType[] {
    const newsDataViaGetter = this.news;

    return newsDataViaGetter;
  }

  //getter to load the data in components
  get queriedNewsItemsGetter(): NewsItemType[] {
    return this.queriedNewsItems;
  }

  //getter to get the fetchBaseObject in components after each data fetching
  get fetchDateObject(): FetchBase {
    return this.fetchBaseObject;
  }

  @Mutation
  addNewsDataToState(data: NewsItemType[]) {
    this.news = data;
  }

  @Mutation
  addQueriedNewsDataToState(data: NewsItemType[]) {
    data = data.map((item: NewsItemType) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        !item.title.includes(item.source.name!) &&
        item.source.name !== null
      ) {
        item.title = item.title + " - " + item.source.name;
      }
      return item;
    });

    this.queriedNewsItems = data;
  }

  @Mutation
  addBooleanOfCategoriesPageEvent(data: boolean) {
    this.categoriesClickEventBoolean = data;
  }

  @Mutation
  addFetchBaseToState(fetchBaseObject: FetchBase) {
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
        countryToFetch = "us";
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

    //EVEN UITGEZET
    const req = new Request(url);
    await fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        //DATA to play around with to avoid making to many requests//
        // const data = [
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

        data = data.articles;

        //making sure that the data are always sorted on date: most recent news displayed first
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

        localStorage.setItem("newsData", JSON.stringify(data));

        this.context.commit("addQueriedNewsDataToState", data);

        this.context.commit("addFetchBaseToState", fetchBaseObject);
      });
    url = "";
  }

  // https://newsapi.org/v2/everything?q=bitcoin&apiKey=771f495b60b94bfabf9a9800d4996456
}
export default getModule(NewsModule, store);
