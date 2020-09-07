<template>
  <div class="home">
    {{ newsData }}
    <!-- <DetailsPage /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    console.log("mounted");
    await news.fetchNews();
    this.getAllNewsData;
  }

  newsData = [];
  tenFirstNewsItems = [];

  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

    this.tenFirstNewsItems = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].tenFirstNewsItems;

    return null;
  }
}

// <a v-bind:href="newsItem.url">{{ newsItem.title }}</a>
</script>
