<template>
  <div class="home">
    <div v-for="newsItem in this.tenFirstNewsItems" :key="newsItem.title">
      <div>{{ newsItem.title }}</div>
      <div><img v-bind:src="newsItem.urlToImage" /></div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
console.log("hi");

// import store from "../store";
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";

@Component

// ({ computed: {mapGetters(['foo']})})
export default class Home extends Vue {
  newsData = [];
  tenFirstNewsItems = [];
  async mounted() {
    console.log("mounted");
    await news.fetchNews();
    this.getAllNewsData;
  }
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
</script>

<style scoped></style>
