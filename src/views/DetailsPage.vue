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

  data = this.$store.getters["vuexModuleDecorators/newsDataModule"]
    .newsDataGetter;

  get getAllNewsData() {
    return news;
  }
}
</script>
