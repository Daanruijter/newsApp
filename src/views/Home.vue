<template>
  <div class="home-container">
    Get to know what's currently happening in the world. Tap on the title to
    know more.
    <div
      class="home-newsitems-with-picture"
      v-for="(newsItem, index) in this.newsDataToDisplay"
      :key="newsItem.title"
    >
      <router-link :to="{ name: 'DetailsPage', params: { title: newsItem.title } }">
        <div
          v-if="newsItem.urlToImage"
          class="home-newsitem-title"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{ hovering: isHovering }"
        >{{ newsItem.title }}</div>
      </router-link>
      <div class="home-newsitem-picture">
        <img
          @error="pictureNotLoaded(index)"
          v-if="newsItem.urlToImage"
          v-bind:src="newsItem.urlToImage"
        />
      </div>
      <hr v-if="newsItem.urlToImage" />
    </div>
    <h1>Other news</h1>
    <div
      class="home-newsitems-no-picture"
      v-for="newsItem in this.newsDataToDisplay"
      :key="newsItem.contents"
    >
      <router-link :to="{ name: 'DetailsPage', params: { title: newsItem.title } }">
        <div
          v-if="!newsItem.urlToImage"
          class="home-newsitem-title"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{ hovering: isHovering }"
        >{{ newsItem.title }}</div>
      </router-link>
      <hr v-if="!newsItem.urlToImage" />
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
  newsData = [];
  newsDataToDisplay = [];

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

  async mounted() {
    await news.fetchNewsQuery("Default Country");
    console.log("mounted");
    // this.newsCountryQueriedIfPicture;
    // this.getAllNewsData;
    this.newsDataToDisplay = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsCountryQueriedGetter;
    bus.$on("selectedCountryOrCategory", () => {
      console.log("I GOT THE CLICKEVENT");

      this.newsDataToDisplay = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].newsCountryQueriedGetter;
    });
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
}
</script>

<style scoped>
.home-container {
  margin-top: 161px;
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
</style>
