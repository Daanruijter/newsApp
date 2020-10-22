/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="home-container">
    <div v-if="this.newsDataToDisplay[0]" class="home-newsdata-loaded">
      <div
        class="home-show-selected-category"
        v-if="this.fetchedCategory !== 'Default Country'"
      >
        You selected {{ this.fetchedCategory }} news
      </div>

      <div class="home-newsdata-loaded">
        <div class="home-headers">
          <div class="home-get-to-know">
            Get to know what's currently happening in the world. Tap on a title
            to know more.
          </div>
          <div class="home-sort-the-data">Sort the data by:</div>
          <div class="home-buttons">
            <button
              name="sortByNewsSource"
              class="home-sort-by-newssource-button"
              @click="sortByNewsSource"
            >
              News source
            </button>

            <button
              name="sortByNewsTitle"
              class="home-sort-by-newstitle-button"
              @click="sortByNewsTitle"
            >
              News title
            </button>

            <button name="reset" class="home-reset" @click="reset">
              Reset
            </button>
          </div>
        </div>
        <div class="home-newsitems-flexer">
          <div
            @click="makeCategoriesDivClosed"
            class="home-newsitems-with-picture"
            v-for="(newsItem, index) in this.newsDataToDisplay"
            :key="newsItem.title + index"
          >
            <router-link
              :to="{ name: 'DetailsPage', params: { title: newsItem.title } }"
            >
              <div
                @click="makeHoveringEffectsUndone"
                class="home-newsitem-title"
                @mouseover="mouseEnter(index, pictureString)"
                @mouseout="mouseLeave(index, pictureString)"
                :class="{ hovering: newsItem.homePageLinksHovered }"
              >
                <div v-if="newsItem.title">{{ newsItem.title }}</div>
              </div>
            </router-link>
            <div
              class="home-newsitem-source"
              v-if="newsItem.source.name && newsItem.title"
            >
              Source: {{ newsItem.source.name }}
            </div>
            <div class="home-newsitem-picture">
              <img
                @error="pictureNotLoaded(index)"
                v-if="newsItem.urlToImage && newsItem.title"
                v-bind:src="newsItem.urlToImage"
              />
            </div>
            <hr v-if="newsItem.urlToImage" />
          </div>
        </div>
        <!-- if there is no picture, put those news items under the header Other News -->
        <div
          class="home-other-news"
          v-if="this.newsDataToDisplayWithNoPictures.length !== 0"
        >
          <h2>Other news</h2>
        </div>
        <div
          @click="makeCategoriesDivClosed"
          class="home-newsitems-no-picture"
          v-for="(newsItem, index) in this.newsDataToDisplayWithNoPictures"
          :key="newsItem.title"
        >
          <router-link
            :to="{ name: 'DetailsPage', params: { title: newsItem.title } }"
          >
            <div
              @click="makeHoveringEffectsUndone"
              v-if="newsItem.title"
              class="home-newsitem-title"
              @mouseover="mouseEnter(index, noPictureString)"
              @mouseout="mouseLeave(index, noPictureString)"
              :class="{ hovering: newsItem.homePageLinksHovered }"
            >
              {{ newsItem.title }}, Source: {{ newsItem.source.name }}
            </div>
          </router-link>
          <hr v-if="newsItem.title" />
        </div>
      </div>
    </div>
    <div v-if="!this.newsDataToDisplay[0]" class="home-newsdata-not-loaded">
      <div class="home-no-newsitems">No news items to show</div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsItemType from "../interfacesforapp";
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import DetailsPage from "./DetailsPage.vue";
import VueRouter from "vue-router";
import { bus } from "../main";

@Component({ components: { DetailsPage } })
export default class Home extends Vue {
  //STATE
  isHovering = false;
  indexOfHoveredLink: number | null = null;
  newsData: NewsItemType[] = [];
  newsDataToDisplay: NewsItemType[] = [];
  newsDataToDisplayUnsorted: NewsItemType[] = [];
  newsDataToDisplayWithNoPictures: NewsItemType[] = [];
  newsDataToDisplayWithNoPicturesUnsorted: NewsItemType[] = [];
  fetchedCategory: null | string = "";
  router = new VueRouter({
    routes: [
      // Dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage },
    ],
  });
  pictureString = "picture";
  noPictureString = "nopicture";

  //If a picture cannot load, filter it out of the newsItemToDisplay Array by filtering the item(s) out
  //and pushing them to the newsDataToDisplayWithNoPictures array that is constructed to display items without a picture
  pictureNotLoaded(indexOfNotLoadedPicture: number): void {
    this.newsDataToDisplay = this.newsDataToDisplayUnsorted = this.newsDataToDisplay.filter(
      (item: NewsItemType, index: number) => {
        if (
          index === indexOfNotLoadedPicture &&
          //Make sure that the item has a title
          item.title &&
          //Make sure that the broken picture does get added only once (the function gets called after a reset of the sorting)
          !this.newsDataToDisplayWithNoPictures.includes(item) &&
          !this.newsDataToDisplayWithNoPicturesUnsorted.includes(item)
        ) {
          //Push the broken picture(s) in the newsDataToDisplayWithNoPictures, but also in the newsDataToDisplayWithNoPicturesUnsorted that I
          //Use to give a user the option to reset a sorting action
          this.newsDataToDisplayWithNoPictures.push(item);
          this.newsDataToDisplayWithNoPicturesUnsorted.push(item);
        }
        return index !== indexOfNotLoadedPicture;
      }
    );
  }

  //Bus objects can listen to events in another component if you put them in the mounted hook of the component in which you want to listen to the event
  async mounted() {
    alert("hi");

    //If there is data fetched already, make sure that on mounting, the same data is fetched, otherwise fetch the defaults

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let newsCategoryFetchObject = null;
    newsCategoryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry",
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (localStorage.getItem("fetchBase")!) {
      newsCategoryFetchObject = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fetchBase: localStorage.getItem("fetchBase")!,

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        typeOfFetchBase: localStorage.getItem("typeOfFetchBase")!,
      };
    }

    await news.fetchNewsQuery(newsCategoryFetchObject);

    //Disable non-null assertion, because fetchedCategory will not be null is it must not be. It get's populated with users querying the API
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fetchedCategory = localStorage.getItem("fetchBase"!);

    //Get the data from vuex in the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");

    //Load the newsdata in the component through the queriedNewsItemsGetter. On mounting it will be the default news array (United States)
    this.setData();

    //The "buses" below listen to users querying the API in the navbar and they change the news array accordingly
    bus.$on("selectedCountry", (selectedCountry: string) => {
      this.fetchedCategory = selectedCountry;
      this.setData();
      this.checkIfThereIsANewsItemWithoutAPicture();
      this.hideSelectedCategoryDiv();
    });

    bus.$on("selectedNewsCategory", (selectedNewsCategory: string) => {
      this.fetchedCategory = selectedNewsCategory;
      this.setData();
      this.checkIfThereIsANewsItemWithoutAPicture();
      this.hideSelectedCategoryDiv();
    });

    bus.$on("useInputValueToFetchData", (inputFetchValue: string) => {
      this.fetchedCategory = inputFetchValue;
      this.setData();
      this.checkIfThereIsANewsItemWithoutAPicture();
      this.hideSelectedCategoryDiv();
    });

    bus.$on("loadDefaultNewsItemsAfterClickOnHomeButton", () => {
      this.setData();
      this.checkIfThereIsANewsItemWithoutAPicture();
      this.fetchedCategory = "Default Country";
    });

    this.checkIfThereIsANewsItemWithoutAPicture();
  }

  //Set the data to the current values in the news module
  setData(): void {
    const filteredNewsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;

    this.newsDataToDisplay = filteredNewsData.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
    this.newsData = filteredNewsData.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
  }

  //Hide selected category div after a while
  hideSelectedCategoryDiv(): void {
    setTimeout(() => {
      this.fetchedCategory = "Default Country";
    }, 10000);
  }

  //If there is an item without a picture, create an array with pictures and an array without pictures
  checkIfThereIsANewsItemWithoutAPicture(): void {
    //Clear the arrays (to prevent them to grow unintentionally on every query to the API from the user)
    this.newsDataToDisplayWithNoPictures = [];
    this.newsDataToDisplayWithNoPicturesUnsorted = [];
    this.newsDataToDisplayUnsorted = [];

    //Filter the items without a picture out of the newsDataToDisPlay array and put them in the newsDataToDisplayWithNoPictures array
    //Those items get displayed below the header "Other news" with that particular array
    //Also set the variable this.newsDataToDisplayUnsorted to the unsorted array, to be able to reset after sorting
    this.newsDataToDisplay = this.newsDataToDisplayUnsorted = this.newsDataToDisplay.filter(
      (item: NewsItemType) => {
        if (
          (item.urlToImage === null || item.urlToImage === "") &&
          item.title
        ) {
          this.newsDataToDisplayWithNoPictures.push(item);
          this.newsDataToDisplayWithNoPicturesUnsorted.push(item);
        }
        return item.urlToImage !== null;
      }
    );
  }

  //Close the categories div if a user clicks on news items or on their link to the detail page
  makeCategoriesDivClosed(): void {
    bus.$emit("makeCategoriesDivClosedEventForDetailsPage");
  }

  //Sort the news array by news title
  sortByNewsTitle(): void {
    function compareTitles(a: NewsItemType, b: NewsItemType): number {
      let returnComparisonNumber = 2;

      if (a.title !== undefined && b.title !== undefined) {
        if (a.title < b.title) {
          returnComparisonNumber = -1;
        }
        if (a.title > b.title) {
          returnComparisonNumber = 1;
        }

        if (!(a.title < b.title) && !(a.title > b.title)) {
          returnComparisonNumber = 0;
        }
      }

      return returnComparisonNumber;
    }

    //Before sorting filter the 10 least recent news items out of the array to have the 10 most recent ones left and display them
    let newsDataToSort: NewsItemType[] = this.newsDataToDisplay;
    newsDataToSort = newsDataToSort.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );

    const sorted: NewsItemType[] = newsDataToSort.sort(compareTitles);
    this.newsDataToDisplay = sorted;

    //Sorting the array of items without pictures
    const sortedWithoutPictures: NewsItemType[] = this.newsDataToDisplayWithNoPictures.sort(
      compareTitles
    );
    this.newsDataToDisplayWithNoPictures = sortedWithoutPictures;
  }

  //Sort the news array by news source
  sortByNewsSource(): void {
    function compareSourceNames(a: NewsItemType, b: NewsItemType): number {
      let returnComparisonNumber = 2;

      if (a.source.name !== undefined && b.source.name !== undefined) {
        if (a.source.name < b.source.name) {
          returnComparisonNumber = -1;
        }
        if (a.source.name > b.source.name) {
          returnComparisonNumber = 1;
        }

        if (
          !(a.source.name < b.source.name) &&
          !(a.source.name > b.source.name)
        ) {
          returnComparisonNumber = 0;
        }
      }

      return returnComparisonNumber;
    }

    //Before sorting filter the 10 least recent news items out of the array to have the 10 most recent ones left and display them
    let newsDataToSort: NewsItemType[] = this.newsDataToDisplay;
    newsDataToSort = newsDataToSort.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );

    const sorted: NewsItemType[] = newsDataToSort.sort(compareSourceNames);

    this.newsDataToDisplay = sorted;

    //Sorting the array of items without pictures
    const sortedWithoutPictures: NewsItemType[] = this.newsDataToDisplayWithNoPictures.sort(
      compareSourceNames
    );
    this.newsDataToDisplayWithNoPictures = sortedWithoutPictures;
  }

  //Reset the sorted news items arrays to the original, unsorted arrays
  reset(): void {
    this.newsDataToDisplay = this.newsDataToDisplayUnsorted;
    this.newsDataToDisplayWithNoPictures = this.newsDataToDisplayWithNoPicturesUnsorted;
  }

  //Create a hovering effect if a user enters a link with his mouse, for both the array with pictures and the array without pictures
  mouseEnter(
    index: number | null,
    pictureOrNoPictureArrayIndicator: string
  ): void {
    this.indexOfHoveredLink = index;
    if (pictureOrNoPictureArrayIndicator === "picture") {
      if (index !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const item = this.newsDataToDisplay[index]!;

        item.homePageLinksHovered = !item.homePageLinksHovered;

        //Add homePageLinksHovered as a property to the picture news array with a boolean that is set to true, indicating that the link with "index" is hovered
        this.$set(this.newsDataToDisplay, index, item);
      }
    }
    if (pictureOrNoPictureArrayIndicator === "nopicture") {
      if (index !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const item = this.newsDataToDisplayWithNoPictures[index]!;

        item.homePageLinksHovered = !item.homePageLinksHovered;

        //Add homePageLinksHovered as a property to the no picture array with a boolean that is set to true, indicating that the link with "index" is hovered
        this.$set(this.newsDataToDisplayWithNoPictures, index, item);
      }
    }
  }

  //Create a hovering effect if a user leaves a link with his mouse, for both the array with pictures and the array without pictures

  mouseLeave(
    index: number | null,
    pictureOrNoPictureArrayIndicator: string
  ): void {
    if (pictureOrNoPictureArrayIndicator === "picture") {
      if (index !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const item = this.newsDataToDisplay[index]!;
        if (item.homePageLinksHovered) {
          item.homePageLinksHovered = false;

          //Set homePageLinksHovered in the picture array to false
          this.$set(this.newsDataToDisplay, index, item);
        }
      }
    }
    if (pictureOrNoPictureArrayIndicator === "nopicture") {
      if (index !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const item = this.newsDataToDisplayWithNoPictures[index]!;

        item.homePageLinksHovered = false;

        //Set homePageLinksHovered in the no picture array to false
        this.$set(this.newsDataToDisplayWithNoPictures, index, item);
      }
    }
  }

  //After a click on a link to an item's details page the fetchbase should be saved.
  //I can use that in order to make a user land on the right details page if he comes back to the details page from the random page

  saveFetchBaseInLocalStorage() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fetchBaseForDetailsComponent = localStorage.getItem("fetchBase")!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newsCategoryFetchObject = localStorage.getItem("typeOfFetchBase")!;

    localStorage.setItem(
      "fetchBaseForDetailsComponent",
      fetchBaseForDetailsComponent
    );
    localStorage.setItem(
      "newsCategoryForDetailsComponent",
      newsCategoryFetchObject
    );
  }

  //Clearing all hovering effect booleans on the arrays by this function, that gets fired after a click on a link to an item's details page.
  makeHoveringEffectsUndone() {
    let i = 0;
    for (i = 0; i < this.newsDataToDisplay.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let item = this.newsDataToDisplay[i];

      if (item.homePageLinksHovered) {
        item.homePageLinksHovered = false;

        //Set homePageLinksHovered in the picture array to false
        this.$set(this.newsDataToDisplay, i, item);
      }
      let j = 0;

      for (j = 0; j < this.newsDataToDisplayWithNoPictures.length; j++) {
        item = this.newsDataToDisplayWithNoPictures[j];

        if (item.homePageLinksHovered) {
          item.homePageLinksHovered = false;
          //Set homePageLinksHovered in the picture array to false
          this.$set(this.newsDataToDisplayWithNoPictures, j, item);
        }
      }
    }

    //"makeHoveringEffectsUndone" is called because a user clicked on an item's link to its DetailPage
    //This is exactly the moment when "saveFetchBaseInLocalStorage" must be called to save the fetchbase in LocalStorage
    this.saveFetchBaseInLocalStorage();
  }
}
</script>

<style scoped>
/* general rules */

.home-newsitem-title {
  font-size: 105%;
}

a {
  text-decoration: none;
}

.hovering {
  color: blue !important;
}

.home-buttons {
  margin-bottom: 2%;
}

.home-no-newsitems {
  color: white;
  font-weight: bold;
}

.home-newsitem-picture {
  margin-top: 2%;
}

.home-newsitems-no-picture {
  font-weight: bold;
  color: black;
}

.home-no-newsitems {
  color: white;
  font-weight: bold;
}

.home-other-news {
  background-color: blue;
  color: white;
}

/* bigger screens */
@media only screen and (min-width: 1000px) {
  .home-container {
    padding-left: 15%;
    width: 70%;
    margin-top: 131px;
  }

  .home-show-selected-category {
    background-color: darkblue;
    color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 3%;
  }

  .home-headers {
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 65% 35%;
  }

  .home-newsitems-with-picture {
    text-align: left;
    width: 40%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-right: 5%;
  }

  .home-get-to-know {
    text-align: left;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .home-buttons {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    text-align: left;
  }

  .home-sort-the-data {
    margin-bottom: 1%;
    text-align: left;
    padding-left: 1%;
    font-weight: bold;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .home-newsitem-title {
    font-weight: bold;
    color: black;
    height: 60px;
  }

  button {
    width: auto;
    margin-left: 1%;
    margin-right: 1%;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 2;
  }

  .home-newsitems-flexer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .home-newsitems-flexer hr {
    display: none;
  }

  .home-newsitem-picture img {
    width: 100%;
    height: 275px;
    max-height: 275px;
  }

  .home-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* pretty large screens */
@media only screen and (min-width: 1000px) and (max-width: 1200px) {
  .home-newsitems-with-picture {
    text-align: left;
    width: 49%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-right: 1%;
  }
}

/* medium screens */
@media only screen and (min-width: 701px) and (max-width: 999px) {
  .home-container {
    padding-left: 15%;
    width: 70%;
    margin-top: 131px;
  }

  .home-get-to-know {
    text-align: left;
  }

  .home-newsitems-with-picture {
    text-align: left;
  }

  .home-show-selected-category {
    background-color: darkblue;
    color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 3%;
  }

  .home-sort-the-data {
    margin-top: 5%;
    margin-bottom: 1%;
    text-align: center;
    font-weight: bold;
  }

  .home-newsitem-title {
    font-weight: bold;
    color: black;
    padding-top: 2%;
    text-align: left;
  }

  .home-newsitem-source {
    margin-top: 1%;
  }

  button {
    width: 20%;
    margin-left: 2%;
    margin-right: 2%;
  }

  .home-newsitem-picture {
    display: grid;
    grid-template-columns: 100%;
  }

  .home-newsitem-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100%;
  }

  .home-newsdata-not-loaded {
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
  .home-container {
    margin-top: 138px;
  }

  .home-get-to-know {
    text-align: left;
  }

  .home-newsitems-with-picture {
    text-align: left;
  }

  .home-show-selected-category {
    background-color: darkblue;
    color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 3%;
  }

  .home-sort-the-data {
    margin-top: 5%;
    margin-bottom: 1%;
    text-align: center;
    font-weight: bold;
  }

  .home-newsitem-title {
    font-weight: bold;
    color: black;
    text-align: left;
    padding-top: 2%;
  }

  .home-newsitem-source {
    margin-top: 1%;
  }

  .home-newsitem-picture {
    display: grid;
    grid-template-columns: 100%;
  }

  .home-newsitem-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100%;
  }

  .home-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* change button sizes when the screen sizes alter */
@media only screen and (min-width: 376px) and (max-width: 700px) {
  button {
    width: 28%;
    margin-left: 2%;
    margin-right: 2%;
  }
}

/* change button sizes when the screen sizes alter */
@media only screen and (max-width: 375px) {
  button {
    width: 29%;
    margin-left: 1%;
    margin-right: 1%;
    font-size: 75%;
  }
}
</style>
