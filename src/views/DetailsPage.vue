<template>
  <div class="home">
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

  newsData = this.$store.getters["vuexModuleDecorators/newsDataModule"]
    .newsDataGetter;
  tenFirstNewsItems = this.$store.getters["vuexModuleDecorators/newsDataModule"]
    .tenFirstNewsItems;

  get getAllNewsData() {
    console.log(
      this.$store.getters["vuexModuleDecorators/newsDataModule"].newsDataGetter,
      this.$store.getters["vuexModuleDecorators/newsDataModule"]
        .tenFirstNewsItems
    );
    return news;
  }
  get getTenFirstNewsItems() {
    return "ss";
  }
}
</script>
