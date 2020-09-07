<template>
  <div class="home">{{ this.valuesForDetailComponent }}}</div>
</template>

<script lang="ts">
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

import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    console.log("mounted");
    await news.fetchNews();
    this.getAllNewsData;
    this.getValuesForDetailComponent;
  }

  newsData = [];
  tenFirstNewsItems = [];
  newsItemTitle = this.$route.params.title;
  valuesForDetailComponent: NewsItemType[] = [];

  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

    this.tenFirstNewsItems = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].tenFirstNewsItems;

    return null;
  }

  get getValuesForDetailComponent() {
    const valuesForDetailComponent = this.newsData.filter(
      (item: NewsItemType) => {
        return item.title === this.newsItemTitle;
      }
    );
    console.log(valuesForDetailComponent);
    this.valuesForDetailComponent = valuesForDetailComponent;
    return valuesForDetailComponent;
  }
}
</script>
