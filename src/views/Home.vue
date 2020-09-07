<template>
  <div class="home">
    <div
      class="home-newsitems-with-picture"
      v-for="(newsItem, index) in this.tenFirstNewsItemsIfPicture"
      :key="newsItem.title"
    >
      <div class="home-newsitem-title ">
        {{ newsItem.title }}
      </div>
      <div class="home-newsitem-picture">
        <img
          @error="pictureNotLoaded(index)"
          v-bind:src="newsItem.urlToImage"
        />
      </div>

      <hr />
    </div>
    <div
      class="home-newsitems-no-picture"
      v-for="newsItem in this.tenFirstNewsItemsIfNoPicture"
      :key="newsItem.title"
    >
      <div class="home-newsitem-title">{{ newsItem.title }}</div>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
console.log("hi");
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
// export interface PictureNotLoadedInterFace {
//   string;
//   }

// import store from "../store";
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";

@Component

// ({ computed: {mapGetters(['foo']})})
export default class Home extends Vue {
  newsData = [];
  tenFirstNewsItemsIfPicture = [];
  tenFirstNewsItemsIfNoPicture = [];

  pictureNotLoaded(index: number) {
    let i: number;
    const tenFirstNewsItemsIfPicture: NewsItemType[] = this
      .tenFirstNewsItemsIfPicture;
    const pictureNotLoadedArray: string[] = [];

    for (i = 0; i < tenFirstNewsItemsIfPicture.length; i++) {
      if (i === index) {
        pictureNotLoadedArray.push(tenFirstNewsItemsIfPicture[i].urlToImage);
      }
      console.log(pictureNotLoadedArray);
    }
    console.log(news);
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

.home-newsitem-picture {
  display: grid;
  grid-template-columns: 100%;
}

.home-newsitem-picture img {
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
}
</style>
