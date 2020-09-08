<template>
  <div class="random-page"><h1>RandomPage</h1></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
// import NewsItemType from "../interfacesforapp";

@Component
export default class RandomPage extends Vue {
  newsData = [];

  async mounted() {
    console.log("mounted");

    //fetch the newsData and put it in the vuex store
    await news.fetchNews();
  }

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

    return null;
  }
}
</script>
