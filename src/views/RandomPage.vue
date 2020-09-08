<template>
  <div class="random-page"><h1>RandomPage</h1></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import NewsItemType from "../interfacesforapp";

@Component
export default class RandomPage extends Vue {
  newsData = [];
  randomNewsItem: NewsItemType[] = [];

  async mounted() {
    console.log("mounted");

    //fetch the newsData and put it in the vuex store
    await news.fetchNews();
    this.getAllNewsData;
    this.filterArrayByRandomIndex();
  }

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

    return null;
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsitems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //filter the array with one random index to display a random news item
  filterArrayByRandomIndex() {
    const randomNewsItem = this.randomIntFromInterval(10, this.newsData.length);
    const filterToGetRandomNewsItem: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        console.log(randomNewsItem);
        return index > 9 && index === randomNewsItem;
      }
    );
    this.randomNewsItem = filterToGetRandomNewsItem;
    console.log(filterToGetRandomNewsItem);
    return filterToGetRandomNewsItem;
  }
}
</script>
