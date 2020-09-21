<template>
  <div class="randompage-container">
    <div v-if="this.randomNewsItem[0]" class="randompage-newsdata-loaded">
      {{ this.newsItemPublishedTime }} GMT
      <hr />
      <div v-for="newsItem in this.randomNewsItem" :key="newsItem.title" class="randompage-data">
        <div
          class="randompage-title"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{ hovering: isHovering }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>

        <div v-if="newsItem.author">Written by:{{ " " }}{{ newsItem.author }}</div>
        <br />
        <div class="randompage-description">
          <span class="randompage-small-header">Description</span>
          <br />
          {{
          newsItem.description
          }}
        </div>
        <div class="randompage-contents">
          <span class="randompage-small-header">Contents</span>
          <br />
          {{
          newsItem.content
          }}
        </div>
        <div
          class="randompage-read-more"
          @mouseover="hoveringReadMore = true"
          @mouseout="hoveringReadMore = false"
          :class="{ hovering: hoveringReadMore }"
        >
          <a :href="newsItem.url">READ MORE</a>
        </div>
        <div class="randompage-button">
          <button @click="changeRandomNewsItemOnButtonClick">Show another random news item</button>
        </div>
        <div class="randompage-picture">
          <img v-bind:src="newsItem.urlToImage" />
        </div>
      </div>
    </div>
    <div v-if="!this.randomNewsItem[0]" class="randompage-newsdata-not-loaded">
      <div class="randompage-no-newsitems">No news items to show</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import NewsItemType from "../interfacesforapp";
import { convertNewsItemPublishedTime } from "../methodsForGeneralUse";
import { bus } from "../main";

@Component
export default class RandomPage extends Vue {
  newsData = [];
  randomNewsItem: NewsItemType[] = [];
  threeOtherNewsItems: NewsItemType[] = [];
  newsItemPublishedTime = "";
  isHovering = false;
  hoveringReadMore = false;

  //base to fetch news from a random news category
  randomNewsCategoriesArray = [
    "Economics",
    "Politics",
    "Science",
    "Health",
    "Sports",
    "Leisure",
    "Entertainment",
    "Travel",
    "Default News Category"
  ];

  //base to fetch news from a random country
  randomCountryCategoriesArray = [
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Canada",
    "China",
    "Colombia",
    "Cuba",
    "Cuba",
    "Egypt",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Latvia",
    "Lithuania",
    "Malaysia",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Arabic Emirates",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Default Country"
  ];

  randomNewsCategoryFetchBaseArray = [
    this.randomCountryCategoriesArray,
    this.randomNewsCategoriesArray
  ];

  async mounted() {
    console.log("mounted");

    //display a random newsItem when the component mounts/on refreshing the page
    this.fetchDataForRandomPage();

    //display a random newsItem when the user clicks the random button from the navbar

    await bus.$on("makeCategoriesDivClosedEventForRandomPage", () => {
      this.fetchDataForRandomPage();
      this.newsData = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].newsCountryQueriedGetter;
      this.filterArrayByRandomIndex();
    });
  }

  //function fetches from the API randomly:
  //picks the country fetchbase array or the newscategory fetchbase array
  //then picks a country or newscategory from the selected array
  //passes that information on to the fetch action, which fetches the data
  //the newsCountryQueriedGetter getter is are used to get the data in the component

  async fetchDataForRandomPage() {
    const randomNumberZeroOrOne = this.randomIntFromInterval(0, 1);
    const pickCountryOrNewsCategoriesArray = this
      .randomNewsCategoryFetchBaseArray[randomNumberZeroOrOne];

    const pickCountryOrNewsCategorieFromItsArrayLength =
      pickCountryOrNewsCategoriesArray.length;

    const pickFetchBase =
      pickCountryOrNewsCategoriesArray[
        this.randomIntFromInterval(
          0,
          pickCountryOrNewsCategorieFromItsArrayLength
        )
      ];

    let pickType = "";
    if (randomNumberZeroOrOne === 0) {
      pickType = "fetchCountry";
    }
    if (randomNumberZeroOrOne === 1) {
      pickType = "fetchNewsCategory";
    }

    const fetchRandomNewsItemObject = {
      fetchBase: pickFetchBase,
      typeOfFetchBase: pickType
    };

    //fetch the newsData and put it in the vuex store
    await news.fetchNewsQuery(fetchRandomNewsItemObject);
  }

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    this.filterArrayByRandomIndex();
    return null;
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsitems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //filter the array with one random index to display a random news item
  filterArrayByRandomIndex() {
    const randomNewsItemNumber = this.randomIntFromInterval(
      0,
      this.newsData.length - 1
    );

    const filterToGetRandomNewsItem: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        return index === randomNewsItemNumber;
      }
    );
    this.randomNewsItem = filterToGetRandomNewsItem;

    this.newsItemPublishedTime = convertNewsItemPublishedTime(
      this.randomNewsItem[0].publishedAt
    );
    return filterToGetRandomNewsItem;
  }

  //if a user hits the button on the random page, it triggers another newsItem to show
  changeRandomNewsItemOnButtonClick() {
    this.fetchDataForRandomPage();
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    this.filterArrayByRandomIndex();
  }
}
</script>

<style scoped>
.randompage-container {
  color: black;
  margin-top: 175px;
}

.randompage-title {
  font-weight: bold;
  color: black;
  margin-bottom: 5%;
}
a {
  text-decoration: none;
  color: black;
}

.hovering a {
  color: blue;
}
.randompage-picture {
  display: grid;
  grid-template-columns: 100%;
}

.randompage-picture img {
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
}
.randompage-description,
.randompage-read-more,
.randompage-contents {
  margin-bottom: 5%;
}

.randompage-read-more {
  font-weight: bold;
  margin-bottom: 12%;
}

.randompage-small-header {
  font-weight: bold;
}

.randompage-button button {
  margin-bottom: 5%;
  font-size: 100%;
}

.randompage-newsdata-not-loaded {
  background-color: purple;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50%;
}

.randompage-no-newsitems {
  color: white;
  font-weight: bold;
}
</style>
