<template>
  <div class="home-container">
    <div>
      sort the data
      <button
        name="sortByNewsSource"
        class="home-sort-by-newssource-button"
        @click="sortByNewsSource($event)"
      >Sort by news source</button>
      <button
        name="sortByNewsTitle"
        class="home-sort-by-newstitle-button"
        @click="sortByNewsSource($event)"
      >Sort by news title</button>
    </div>
    <br />
    <div v-if="this.newsDataToDisplay[0]" class="home-newsdata-loaded">
      Get to know what's currently happening in the world. Tap on the title to
      know more.
      <div
        value="sss"
        @click="makeCategoriesDivClosed"
        class="home-newsitems-with-picture"
        v-for="(newsItem, index) in this.newsDataToDisplay"
        :key="newsItem.title"
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
      <h1>Other news</h1>
      <div
        @click="makeCategoriesDivClosed"
        class="home-newsitems-no-picture"
        v-for="(newsItem, index) in this.newsDataToDisplay"
        :key="newsItem.contents"
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
    <div v-if="!this.newsDataToDisplay[0]" class="home-newsdata-not-loaded">
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
  test = [];

  router = new VueRouter({
    routes: [
      // dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage }
    ]
  });

  pictureNotLoaded(index: number) {
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
    const newsCategoryFetchObject = {
      fetchBase: "Default Country",
      typeOfFetchBase: "fetchCountry"
    };

    await news.fetchNewsQuery(newsCategoryFetchObject);
    console.log("mounted");
    // this.newsCountryQueriedIfPicture;
    // this.getAllNewsData;
    this.newsDataToDisplay = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsCountryQueriedGetter;
    this.newsData = this.newsDataToDisplay = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsCountryQueriedGetter;
    bus.$on("selectedCountry", () => {
      this.newsDataToDisplay = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].newsCountryQueriedGetter;
    });
    bus.$on("selectedNewsCategory", () => {
      this.newsDataToDisplay = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].newsCountryQueriedGetter;
    });

    //send input and onchange event to other components
    bus.$on("useInputValueToFetchData", (data: string) => {
      console.log("I GOT THE INPUTEVENT");
      console.log(data);

      this.newsDataToDisplay = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].newsCountryQueriedGetter;
    });
  }

  get getAllNewsData() {
    this.newsDataToDisplay = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsCountryQueriedIfPicture;
    return null;
  }

  makeCategoriesDivClosed() {
    bus.$emit("makeCategoriesDivClosedEventForDetailsPage");
  }

  //sort the news array bij news source name
  sortByNewsSource(event: Event) {
    const targetValue = (event.target as HTMLTextAreaElement).name;
    console.log(targetValue);
    function compare(a: NewsItemType, b: NewsItemType) {
      let propertyName = {} as keyof typeof a | keyof typeof b;
      const name = "name" as
        | keyof typeof propertyName
        | keyof typeof propertyName;
      if (targetValue === "sortByNewsTitle") {
        propertyName = "title";
      }
      if (targetValue === "sortByNewsSource") {
        console.log("NEWSCOUDERE");
        propertyName = name as keyof typeof a;
        console.log(a[propertyName]);
      }
      //   a.source.name = a.title;
      //   b.source.name = b.title;
      //   console.log("hsortbynewstitkle");
      //   console.log(a.source.name);
      // }
      // if (targetValue === "sortByNewsSource") {
      //   console.log("sortByNewsSource");
      // }
      console.log(propertyName);
      let returnComparisonNumber = 2;

      if (a[propertyName] !== undefined && b[propertyName] !== undefined) {
        if (a[propertyName] < b[propertyName]) {
          returnComparisonNumber = -1;
          console.log(returnComparisonNumber);
        }
        if (a[propertyName] > b[propertyName]) {
          returnComparisonNumber = 1;
          console.log(returnComparisonNumber);
        }

        if (
          !(a[propertyName] < b[propertyName]) &&
          !(a[propertyName] > b[propertyName])
        ) {
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

    const sorted: NewsItemType[] = newsDataToSort.sort(compare);
    console.log(sorted);
    console.log(this.newsDataToDisplay);
    this.newsDataToDisplay = sorted;
  }

  sortByNewsTitle() {
    console.log("sortByNewsTitle");
  }
}
</script>

<style scoped>
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
