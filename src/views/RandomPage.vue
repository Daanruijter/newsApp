/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="randompage-container">
    <div
      v-if="this.newsData[0] || this.randomNewsItem[0]"
      class="randompage-newsdata-loaded"
    >
      <hr
        v-if="this.newsData[0] || this.randomNewsItem[0]"
        class="randompage-hr-adapt-size"
      />
      {{ this.newsItemPublishedTime }} GMT
      <hr
        v-if="this.newsData[0] || this.randomNewsItem[0]"
        class="randompage-hr-adapt-size"
      />

      <div
        v-for="newsItem in this.randomNewsItem"
        :key="newsItem.title"
        class="randompage-data"
      >
        <div
          class="randompage-title"
          @mouseover="linkIsHovered = true"
          @mouseout="linkIsHovered = false"
          :class="{ hovering: linkIsHovered }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>

        <div>
          <i v-if="newsItem.author && newsItem.title"
            >Written by:{{ " " }}{{ newsItem.author }}</i
          >
          <i v-if="newsItem.source.name && newsItem.author && newsItem.title">
            <i v-if="newsItem.source.name && newsItem.author && newsItem.title"
              >,</i
            >
            {{ " source: " }}{{ newsItem.source.name }}
          </i>
        </div>
        <br />

        <div class="randompage-description-wrapper">
          <span v-if="newsItem.description" class="randompage-small-header"
            >Description</span
          >
          <br />
          <div v-if="newsItem.description" class="randompage-description">
            {{ newsItem.description }}
          </div>
        </div>
        <div class="randompage-contents-wrapper">
          <span v-if="newsItem.content" class="randompage-small-header"
            >Contents</span
          >
          <br />
          <div v-if="newsItem.content" class="randompage-contents">
            {{ newsItem.content }}
          </div>
        </div>
        <div class="randompage-button">
          <button @click="changeRandomNewsItemOnButtonClick">
            Show another random news item
          </button>
        </div>
        <div class="randompage-picture">
          <img v-if="newsItem.urlToImage" v-bind:src="newsItem.urlToImage" />
        </div>
      </div>
    </div>
    <!-- The previous news item -->
    <div class="random-page-previous-item-container">
      <div v-if="previousNewsItem[0]" class="randompage-previous-item-bar">
        <h2>Previous news item</h2>
      </div>
      <div class="randompage-button" v-if="this.previousNewsItem">
        <button
          v-if="this.showAnotherNewsItemButtonClicked"
          @click="showPreviousNewsItem"
        >
          Show previous news item
        </button>
      </div>
      <div v-if="this.previousDate">
        <hr class="randompage-hr-adapt-size" />
        {{ this.previousDate }} GMT
        <hr class="randompage-hr-adapt-size" />
      </div>
      <div
        v-for="newsItem in this.previousNewsItem"
        :key="newsItem.title"
        class="randompage-data"
      >
        <div
          class="randompage-title"
          @mouseover="previousArticleLinkIsHovered = true"
          @mouseout="previousArticleLinkIsHovered = false"
          :class="{ hovering: previousArticleLinkIsHovered }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>

        <div>
          <i v-if="newsItem.author && newsItem.title"
            >Written by:{{ " " }}{{ newsItem.author }}</i
          >
          <i v-if="newsItem.source.name && newsItem.author && newsItem.title">
            <i v-if="newsItem.source.name && newsItem.author && newsItem.title"
              >,</i
            >
            {{ " source: " }}{{ newsItem.source.name }}
          </i>
        </div>
        <br />

        <div class="randompage-description-wrapper">
          <span v-if="newsItem.description" class="randompage-small-header"
            >Description</span
          >
          <br />
          <div v-if="newsItem.description" class="randompage-description">
            {{ newsItem.description }}
          </div>
        </div>
        <div class="randompage-contents-wrapper">
          <span v-if="newsItem.content" class="randompage-small-header"
            >Contents</span
          >
          <br />
          <div v-if="newsItem.content" class="randompage-contents">
            {{ newsItem.content }}
          </div>
        </div>
        <div class="randompage-picture">
          <img
            @error="pictureNotLoaded(index)"
            v-if="newsItem.urlToImage"
            v-bind:src="newsItem.urlToImage"
          />
        </div>
      </div>

      <div
        v-if="!this.randomNewsItem[0]"
        class="randompage-newsdata-not-loaded"
      >
        <div class="randompage-no-newsitems">No news items to show</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import NewsItemType from "../interfacesforapp";
import { bus } from "../main";

@Component
export default class RandomPage extends Vue {
  //STATE
  newsData = [];
  randomNewsItem: NewsItemType[] = [];
  threeOtherNewsItems: NewsItemType[] = [];
  newsItemPublishedTime = "";
  linkIsHovered = false;
  previousArticleLinkIsHovered = false;
  hoveringReadMore = false;
  previousNewsItem: NewsItemType[] = [];
  previousDate = "";
  showAnotherNewsItemButtonClicked = false;

  //Base to fetch news from a random news category
  randomNewsCategoriesArray = [
    "Economics",
    "Politics",
    "Science",
    "Health",
    "Sports",
    "Leisure",
    "Entertainment",
    "Travel",
    "Default News Category",
  ];

  //Base to fetch news from a random country
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
    "Default Country",
  ];

  randomNewsCategoryFetchBaseArray = [
    this.randomCountryCategoriesArray,
    this.randomNewsCategoriesArray,
  ];

  async mounted() {
    this.prepareDataForDisplay();
  }
  //The function below fetches from the API randomly:
  //picks the country fetchbase array (that holds all country names) or the news category fetchbase array (which holds all news category names)
  //then picks a country or news category from the selected array
  //passes that information on to the fetch action, which fetches the data

  async fetchDataForRandomPageAndLoadItInRandomComponent() {
    const randomNumberZeroOrOne = this.randomIntFromInterval(0, 1);
    const pickCountryOrNewsCategoriesArray = this
      .randomNewsCategoryFetchBaseArray[randomNumberZeroOrOne];

    const pickCountryOrNewsCategoryFromItsArrayLength =
      pickCountryOrNewsCategoriesArray.length;

    const pickFetchBase =
      pickCountryOrNewsCategoriesArray[
        this.randomIntFromInterval(
          0,
          pickCountryOrNewsCategoryFromItsArrayLength
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
      typeOfFetchBase: pickType,
    };

    //Fetch the newsData and put it in the Vuex store
    await news.fetchNewsQuery(fetchRandomNewsItemObject);
  }

  picturerNotLoaded(index: number) {
    alert(index);
  }

  //Get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsItems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //Filter the array with one random index to display a random news item
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
    this.newsItemPublishedTime = this.randomNewsItem[0].publishedAt;

    return filterToGetRandomNewsItem;
  }

  async prepareDataForDisplay() {
    //Fetch the data and load it in the random component

    await this.fetchDataForRandomPageAndLoadItInRandomComponent();

    const data = this.$store.getters["vuexModuleDecorators/newsDataModule"]
      .queriedNewsItemsGetter;

    this.newsData = data;

    //Change newsData also in the newsFooter
    bus.$emit("setNewsDataInNewsFooter", data);

    //Filter the data to display one random item
    this.filterArrayByRandomIndex();
  }

  //Save the previous random item in LocalStorage to make it possible for the user to retrieve it
  saveRandomItemInLocalStorage() {
    if (this.randomNewsItem.length !== 0) {
      localStorage.setItem(
        "randomNewsItem",
        JSON.stringify(this.randomNewsItem)
      );
    }
  }

  //If a user hits the button on the random page, it triggers another newsItem to show
  async changeRandomNewsItemOnButtonClick() {
    this.showAnotherNewsItemButtonClicked = true;
    this.previousNewsItem = [];
    this.previousDate = "";

    //Fetch the data and load it in the Random component
    this.saveRandomItemInLocalStorage();
    this.prepareDataForDisplay();
  }

  //If a user hits the button to show a previous article, show it also on the page.
  showPreviousNewsItem() {
    this.showAnotherNewsItemButtonClicked = false;

    if (localStorage.getItem("randomNewsItem") !== null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.previousNewsItem = JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.getItem("randomNewsItem")!
      );
    this.previousDate = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.getItem("randomNewsItemPublishedAt")!
    );
  }
}
</script>

<style scoped>
/* general rules */
.hovering a {
  color: blue;
}

a {
  text-decoration: none;
  color: black;
}

.randompage-picture {
  display: grid;
  grid-template-columns: 100%;
}

.randompage-button button {
  margin-bottom: 5%;
  font-size: 100%;
}

.random-page-previous-item-container button {
  margin-top: 5%;
}

.randompage-no-newsitems {
  color: white;
  font-weight: bold;
}

.randompage-description-wrapper,
.randompage-contents-wrapper {
  text-align: left;
}

/* bigger screens */
@media only screen and (min-width: 1000px) {
  .randompage-container {
    color: black;
    margin-left: 15%;
    width: 70%;
    height: 100%;
    margin-bottom: 1%;
    margin-top: 131px;
  }

  .randompage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 2%;
    font-size: 105%;
  }

  .randompage-hr-adapt-size {
    margin-left: 15%;
    margin-top: 2%;
    margin-right: 15%;
    margin-bottom: 2%;
  }

  .randompage-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    margin-left: 35%;
    margin-right: 35%;
    width: 35%;
  }
  .randompage-description,
  .randompage-contents {
    margin-bottom: 5%;
  }

  .randompage-small-header {
    font-weight: bold;
    margin-left: 15%;
  }

  .randompage-description,
  .randompage-contents {
    margin-bottom: 2%;
    margin-left: 15%;
    margin-right: 15%;
  }

  .randompage-previous-item-bar {
    background-color: blue;
    margin: 2% 15% 2% 15%;
    color: white;
  }

  .randompage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* medium screens */
@media only screen and (min-width: 701px) and (max-width: 999px) {
  .randompage-container {
    color: black;
    margin-left: 15%;
    width: 70%;
    height: 100%;
    margin-bottom: 1%;
    margin-top: 131px;
  }

  .randompage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 2%;
    font-size: 105%;
    text-align: left;
  }

  .randompage-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100%;
  }

  .randompage-description,
  .randompage-contents {
    margin-bottom: 5%;
  }

  .randompage-small-header {
    font-weight: bold;
  }

  .randompage-description,
  .randompage-contents {
    margin-bottom: 2%;
  }

  .randompage-previous-item-bar {
    background-color: blue;
    margin: 2% 0 2% 0;
    color: white;
  }

  .randompage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* smaller screens */
@media only screen and (max-width: 700px) {
  .randompage-container {
    color: black;
    margin-bottom: 1%;
    height: 100%;
    margin-top: 138px;
  }

  .randompage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
    text-align: left;
    font-size: 105%;
  }

  .randompage-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100%;
  }

  .randompage-description,
  .randompage-contents {
    margin-bottom: 5%;
  }

  .randompage-small-header {
    font-weight: bold;
  }

  .randompage-previous-item-bar {
    background-color: blue;
    margin: 2% 0 2% 0;
    color: white;
  }

  .randompage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
