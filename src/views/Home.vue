<template>
  <div class="home-container">
    Get to know what's currently happening in the world. Tap on the title to
    know more.
    <div
      class="home-newsitems-with-picture"
      v-for="(newsItem, index) in this.tenFirstNewsItemsIfPicture"
      :key="newsItem.title"
    >
      <router-link
        :to="{ name: 'DetailsPage', params: { title: newsItem.title } }"
      >
        <div
          class="home-newsitem-title"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{ hovering: isHovering }"
        >
          {{ newsItem.title }}
        </div></router-link
      >
      <div class="home-newsitem-picture">
        <img
          @error="pictureNotLoaded(index)"
          v-bind:src="newsItem.urlToImage"
        />
        <!-- <DetailsPage :test="newsItem.title"></DetailsPage> -->
      </div>

      <hr />
    </div>
    <h1>Other news</h1>
    <div
      class="home-newsitems-no-picture"
      v-for="newsItem in this.tenFirstNewsItemsIfNoPicture"
      :key="newsItem.title"
    >
      <div
        class="home-newsitem-title"
        @mouseover="isHovering = true"
        @mouseout="isHovering = false"
        :class="{ hovering: isHovering }"
      >
        {{ newsItem.title }}
      </div>

      <hr />
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

@Component({ components: { DetailsPage } })
export default class Home extends Vue {
  isHovering = false;
  newsData = [];
  tenFirstNewsItemsIfPicture = [];
  tenFirstNewsItemsIfNoPicture = [];
  router = new VueRouter({
    routes: [
      // dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage },
    ],
  });

  pictureNotLoaded(index: number) {
    let i: number;
    const tenFirstNewsItemsIfPicture: NewsItemType[] = this
      .tenFirstNewsItemsIfPicture;
    const pictureNotLoadedArray: string[] = [];

    for (i = 0; i < tenFirstNewsItemsIfPicture.length; i++) {
      if (i === index) {
        pictureNotLoadedArray.push(tenFirstNewsItemsIfPicture[i].urlToImage);
      }
    }

    news.sendPictureNotLoadedArray(pictureNotLoadedArray);
  }

  async mounted() {
    console.log("mounted");
    await news.fetchNews();
    this.getAllNewsData;
  }
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

    this.tenFirstNewsItemsIfPicture = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].tenFirstNewsItemsIfPicture;

    this.tenFirstNewsItemsIfNoPicture = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].tenFirstNewsItemsIfNoPicture;

    return null;
  }
}
</script>

<style scoped>
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
