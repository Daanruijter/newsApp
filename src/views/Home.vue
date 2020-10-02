<template>
  <div class="home-container">
    <div
      class="home-show-selected-category"
      v-if="this.fetchedCategory !== 'Default Country'"
    >
      You selected {{ this.fetchedCategory }} news
    </div>

    <div class="home-newsdata-loaded">
      <div class="home-headers">
        <div class="home-get-to-know">
          Get to know what's currently happening in the world. Tap on a title to
          know more.
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

          <button name="reset" class="home-reset" @click="reset">Reset</button>
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
              v-if="
                newsItem.urlToImage &&
                  index < 10 &&
                  index !== pictureNotLoadedArray[0] &&
                  index !== pictureNotLoadedArray[1]
              "
              class="home-newsitem-title"
              @mouseover="isHovering = true"
              @mouseout="isHovering = false"
              :class="{ hovering: isHovering }"
            >
              {{ newsItem.title }}
            </div>
          </router-link>
          <div class="home-newsitem-picture">
            <img
              @error="pictureNotLoaded(index)"
              v-if="
                newsItem.urlToImage &&
                  index < 10 &&
                  index !== pictureNotLoadedArray[0] &&
                  index !== pictureNotLoadedArray[1]
              "
              v-bind:src="newsItem.urlToImage"
            />
          </div>
          <hr
            v-if="
              newsItem.urlToImage &&
                index < 10 &&
                index !== pictureNotLoadedArray[0] &&
                index !== pictureNotLoadedArray[1]
            "
          />
        </div>
      </div>
      <!-- if there is no picture, put those news items under the header Other News -->
      <h2 v-if="noImage || pictureNotLoadedArray.length !== 0">Other news</h2>
      <div
        @click="makeCategoriesDivClosed"
        class="home-newsitems-no-picture"
        v-for="(newsItem, index) in this.newsDataToDisplay"
        :key="newsItem.title"
      >
        <router-link
          :to="{ name: 'DetailsPage', params: { title: newsItem.title } }"
        >
          <div
            v-if="
              (!newsItem.urlToImage && index < 10) ||
                index === pictureNotLoadedArray[0] ||
                index === pictureNotLoadedArray[1]
            "
            class="home-newsitem-title"
            @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{ hovering: isHovering }"
          >
            {{ newsItem.title }}
          </div>
        </router-link>
        <hr v-if="!newsItem.urlToImage" />
      </div>
    </div>

    <div v-if="!newsDataToDisplay" class="home-newsdata-not-loaded">
      <div class="home-no-newsitems">No news items to show</div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsItemType from "../interfacesforapp";

// Prop

import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import DetailsPage from "./DetailsPage.vue";
import VueRouter from "vue-router";
import { bus } from "../main";

@Component({ components: { DetailsPage } })
export default class Home extends Vue {
  isHovering = false;
  newsData: NewsItemType[] = [];
  newsDataToDisplay: NewsItemType[] = [];
  noImage = false;
  fetchedCategory: null | string = "";
  router = new VueRouter({
    routes: [
      // dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage },
    ],
  });
  pictureNotLoadedArray: Array<number> = [];

  //if a picture cannot load, filter it out of the newsItemTodisplay Array by filtering the item(s) out of that array in the news module
  pictureNotLoaded(index: number): void {
    let i: number;

    // const tenFirstNewsItemsIfPicture: NewsItemType[] = this.newsDataToDisplay;
    // const pictureNotLoadedArray: string[] = [];

    for (i = 0; i < this.newsDataToDisplay.length; i++) {
      if (i === index) {
        this.pictureNotLoadedArray.push(index);
      }
    }
  }

  //bus object needs to listen to events in another component on mounted hook
  async mounted() {
    console.log("mounted");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    const newsCategoryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry",
    };

    await news.fetchNewsQuery(newsCategoryFetchObject);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fetchedCategory = localStorage.getItem("fetchBase"!);

    //get the data from vuex in the newsFooter component
    bus.$emit("triggerDataToFetchInFooter");

    //load the data in the component through the queriedNewsItemsGetter
    this.setData();
    bus.$on("selectedCountry", (selectedCountry: string) => {
      this.fetchedCategory = selectedCountry;
      this.setData();
      // this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });
    bus.$on("selectedNewsCategory", (selectedNewsCategory: string) => {
      this.fetchedCategory = selectedNewsCategory;
      this.setData();
      // this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });

    //send input and onchange event to other components
    bus.$on("useInputValueToFetchData", (inputFetchValue: string) => {
      this.fetchedCategory = inputFetchValue;

      this.setData();
      // this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });

    bus.$on("loadDefaultNewsItemsAfterClickOnHomeButton", () => {
      this.setData();
      // this.addNewsSource();
    });

    this.checkIfThereIsANewsItemWithoutAPicture();
    // this.addNewsSource();
  }

  //set the data to the current values in the news module
  setData(): void {
    this.newsDataToDisplay = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
  }

  //hide selected category div after a few seconds
  hideSelectedCategoryDiv(): void {
    setTimeout(() => {
      this.fetchedCategory = "Default Country";
    }, 3000);
  }

  //hide "other news" if there is no news item without a picture.
  //If so, set the data variable noImage to true and display the Other News header
  checkIfThereIsANewsItemWithoutAPicture(): void {
    let filteredArray: NewsItemType[] = this.newsData;
    filteredArray = filteredArray.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );

    let i = 0;
    for (i = 0; i < filteredArray.length; i++) {
      if (
        filteredArray[i].urlToImage === "" ||
        filteredArray[i].urlToImage === null
      ) {
        this.noImage = true;
      }
    }
  }

  makeCategoriesDivClosed(): void {
    bus.$emit("makeCategoriesDivClosedEventForDetailsPage");
  }

  // //add the news source if it's not shown
  // addNewsSource(): void {
  //   let newsDataFiltered = this.newsDataToDisplay.filter(
  //     (item: NewsItemType, index: number) => {
  //       return index < 10;
  //     }
  //   );
  //   newsDataFiltered = newsDataFiltered.map((item: NewsItemType) => {
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     if (
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //       !item.title.includes(item.source.name!) &&
  //       item.source.name !== null
  //     ) {
  //       item.title = item.title + " - " + item.source.name;
  //     }
  //     return item;
  //   });
  //   this.newsDataToDisplay = newsDataFiltered;
  // }

  //sort the news array bij news source name
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

    this.newsDataToDisplay = this.newsData;

    //Before sorting filter the 10 least recent news items out of the array to have the 10 most recent ones left and display them
    let newsDataToSort: NewsItemType[] = this.newsData;
    newsDataToSort = newsDataToSort.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
    const sorted: NewsItemType[] = newsDataToSort.sort(compareTitles);
    this.newsDataToDisplay = sorted;
  }

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

    this.newsDataToDisplay = this.newsData;

    //Before sorting filter the 10 least recent news items out of the array to have the 10 most recent ones left and display them
    let newsDataToSort: NewsItemType[] = this.newsData;
    newsDataToSort = newsDataToSort.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
    this.newsDataToDisplay = newsDataToSort;

    const sorted: NewsItemType[] = newsDataToSort.sort(compareSourceNames);

    this.newsDataToDisplay = sorted;
  }

  //reset the sorted news items to the list that it was
  reset(): void {
    this.newsDataToDisplay = this.newsData;
  }
}
</script>

<style scoped>
/* bigger screens */

@media only screen and (min-width: 1000px) {
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

  .home-container {
    padding-left: 15%;
    width: 70%;
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
    margin-bottom: 5%;
    margin-top: 8%;
    height: 60px;
  }
  .hovering {
    color: blue;
  }

  a {
    text-decoration: none;
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

  /* .home-newsitem-picture {
    display: grid;
    grid-template-columns: 100%;
  }
 */
  .home-newsitem-picture img {
    /* grid-column-start: 1;
    grid-column-end: 2; */
    width: 100%;
    height: 275px;
    max-height: 275px;
  }

  .home-newsitems-no-picture {
    font-weight: bold;
    color: black;
  }

  .home-newsdata-not-loaded {
    background-color: purple;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50%;
  }

  .home-no-newsitems {
    color: white;
    font-weight: bold;
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
  .home-show-selected-category {
    background-color: darkblue;
    color: white;

    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 3%;
  }

  /* .home-container {
    margin-top: 175px;
  } */

  .home-sort-the-data {
    margin-top: 5%;
    margin-bottom: 1%;
    text-align: center;
    font-weight: bold;
  }

  .home-newsitem-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
    margin-top: 8%;
  }
  .hovering {
    color: blue;
  }

  a {
    text-decoration: none;
  }

  button {
    width: 28%;
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

  .home-newsitems-no-picture {
    font-weight: bold;
    color: black;
  }

  .home-newsdata-not-loaded {
    background-color: purple;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50%;
  }

  .home-no-newsitems {
    color: white;
    font-weight: bold;
  }
}

/* smaller screens */
@media only screen and (max-width: 700px) {
  .home-show-selected-category {
    background-color: darkblue;
    color: white;

    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 3%;
  }

  /* .home-container {
    margin-top: 175px;
  } */

  .home-sort-the-data {
    margin-top: 5%;
    margin-bottom: 1%;
    text-align: center;
    font-weight: bold;
  }

  .home-newsitem-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
    margin-top: 8%;
  }
  .hovering {
    color: blue;
  }

  a {
    text-decoration: none;
  }

  button {
    width: 28%;
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

  .home-newsitems-no-picture {
    font-weight: bold;
    color: black;
  }

  .home-newsdata-not-loaded {
    background-color: purple;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 50%;
  }

  .home-no-newsitems {
    color: white;
    font-weight: bold;
  }
}
</style>
