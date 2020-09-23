<template>
  <div class="home-container">
    <div
      class="home-show-selected-category"
      v-if="this.fetchedCategory!=='Default Country'"
    >You selected {{this.fetchedCategory}} news</div>
    <br />
    <div>
      sort the data
      <button
        name="sortByNewsSource"
        class="home-sort-by-newssource-button"
        @click="sortByNewsSource"
      >Sort by news source</button>
      <button
        name="sortByNewsTitle"
        class="home-sort-by-newstitle-button"
        @click="sortByNewsTitle"
      >Sort by news title</button>
      <button name="reset" class="home-reset" @click="reset">Reset</button>
    </div>
    <br />
    <div class="home-newsdata-loaded">
      Get to know what's currently happening in the world. Tap on the title to
      know more.
      <div
        @click="makeCategoriesDivClosed"
        class="home-newsitems-with-picture"
        v-for="(newsItem, index) in this.newsDataToDisplay"
        :key="newsItem.title + index"
      >
        <router-link :to="{ name: 'DetailsPage', params: { title: newsItem.title } }">
          <div
            v-if="newsItem.urlToImage  && index < 10"
            class="home-newsitem-title"
            @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{ hovering: isHovering }"
          >{{ newsItem.title }}</div>
        </router-link>
        <div class="home-newsitem-picture">
          <img
            @error="pictureNotLoaded(index)"
            v-if="newsItem.urlToImage && index < 10"
            v-bind:src="newsItem.urlToImage"
          />
        </div>
        <hr v-if="newsItem.urlToImage && index < 10" />
      </div>
      <!-- if there is no picture, put those news items under the header Other News -->
      <h2 v-if="this.noImage">Other news</h2>
      <div
        @click="makeCategoriesDivClosed"
        class="home-newsitems-no-picture"
        v-for="(newsItem, index) in this.newsDataToDisplay"
        :key="newsItem.title"
      >
        <router-link :to="{ name: 'DetailsPage', params: { title: newsItem.title } }">
          <div
            v-if="!newsItem.urlToImage && index < 10"
            class="home-newsitem-title"
            @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{ hovering: isHovering }"
          >{{ newsItem.title }}</div>
        </router-link>
        <hr v-if="!newsItem.urlToImage" />
      </div>
    </div>

    <div v-if="!this.newsDataToDisplay" class="home-newsdata-not-loaded">
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

interface Test {
  newsDataToDisplay: NewsItemType[];
}

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
      { path: "/details /:id", component: DetailsPage }
    ]
  });

  //if a picture cannot load, filter it out of the newsItemTodisplay Array by filtering the item(s) out of that array in the news module
  pictureNotLoaded(index: number): void {
    let i: number;
    const tenFirstNewsItemsIfPicture: NewsItemType[] = this.newsDataToDisplay;
    const pictureNotLoadedArray: string[] = [];

    for (i = 0; i < tenFirstNewsItemsIfPicture.length; i++) {
      if (i === index) {
        pictureNotLoadedArray.push(tenFirstNewsItemsIfPicture[i].urlToImage);
      }
    }

    news.sendPictureNotLoadedArray(pictureNotLoadedArray);
  }

  //bus object needs to listen to events in another component on mounted hook
  async mounted() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    const newsCategoryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry"
    };

    await news.fetchNewsQuery(newsCategoryFetchObject);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fetchedCategory = localStorage.getItem("fetchBase"!);
    console.log("mounted");
    console.log(this.newsData);

    //load the data in the component through the queriedNewsItemsGetter
    this.setData();
    bus.$on("selectedCountry", (selectedCountry: string) => {
      this.fetchedCategory = selectedCountry;
      this.setData();
      this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });
    bus.$on("selectedNewsCategory", (selectedNewsCategory: string) => {
      this.fetchedCategory = selectedNewsCategory;
      this.setData();
      this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });

    //send input and onchange event to other components
    bus.$on("useInputValueToFetchData", (useInputValueToFetchData: string) => {
      this.fetchedCategory = useInputValueToFetchData;

      this.setData();
      this.addNewsSource();
      this.hideSelectedCategoryDiv();
    });
    // this.newsData = this.$store.getters[
    //   "vuexModuleDecorators/newsDataModule"
    // ].queriedNewsItemsGetter;
    bus.$on("loadDefaultNewsItemsAfterClickOnHomeButton", () => {
      this.setData();
      this.addNewsSource();
    });

    this.checkIfThereIsANewsItemWithoutAPicture();
    this.addNewsSource();
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
    console.log("hi");
    let i = 0;
    for (i = 0; i < this.newsDataToDisplay.length; i++) {
      if (
        this.newsDataToDisplay[i].urlToImage === "" ||
        this.newsDataToDisplay[i].urlToImage === null
      ) {
        this.noImage = true;
      }
    }
  }

  makeCategoriesDivClosed(): void {
    bus.$emit("makeCategoriesDivClosedEventForDetailsPage");
  }

  //add the news source if it's not shown
  addNewsSource(): void {
    let newsDataFiltered = this.newsDataToDisplay.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
    newsDataFiltered = newsDataFiltered.map((item: NewsItemType) => {
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
    this.newsDataToDisplay = newsDataFiltered;
  }

  //sort the news array bij news source name
  sortByNewsTitle(): void {
    function compareTitles(a: NewsItemType, b: NewsItemType): number {
      let returnComparisonNumber = 2;

      if (a.title !== undefined && b.title !== undefined) {
        if (a.title < b.title) {
          returnComparisonNumber = -1;
          console.log(returnComparisonNumber);
        }
        if (a.title > b.title) {
          returnComparisonNumber = 1;
          console.log(returnComparisonNumber);
        }

        if (!(a.title < b.title) && !(a.title > b.title)) {
          returnComparisonNumber = 0;
          console.log(returnComparisonNumber);
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
          // console.log(returnComparisonNumber);
        }
        if (a.source.name > b.source.name) {
          returnComparisonNumber = 1;
          // console.log(returnComparisonNumber);
        }

        if (
          !(a.source.name < b.source.name) &&
          !(a.source.name > b.source.name)
        ) {
          returnComparisonNumber = 0;
          // console.log(returnComparisonNumber);
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
    // console.log(sorted);
    // console.log(this.newsDataToDisplay);
    this.newsDataToDisplay = sorted;
  }

  //reset the sorted news items to the list that it was
  reset(): void {
    this.newsDataToDisplay = this.newsData;
  }
}
</script>

<style scoped>
.home-show-selected-category {
  background-color: darkblue;
  color: white;

  padding-top: 1%;
  padding-bottom: 1%;
}

.home-container {
  margin-top: 175px;
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
</style>
