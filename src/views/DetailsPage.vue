<template>
  <div class="details-page-container">
    <div class="details-page-data">
      <div class="details-page-title">
        {{ this.valuesForDetailComponent.title }}
      </div>

      <hr />
      <div>{{ this.valuesForDetailComponent.author }}</div>
      <hr />

      <div>{{ this.valuesForDetailComponent.description }}</div>

      <hr />
      <div>{{ this.valuesForDetailComponent.url }}</div>
      <hr />
      <div>{{ this.valuesForDetailComponent.urlToImage }}</div>
      <hr />
      <div>{{ this.valuesForDetailComponent.publishedAt }}</div>
      <hr />
      <div>{{ this.valuesForDetailComponent.content }}</div>
      <hr />
      <div>{{ this.valuesForDetailComponent.source.name }}</div>
      -->
    </div>
  </div>
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
  name?: string;
}
type Tuple = [NewsItemType];

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
  newsPapername: string | undefined;

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
    const valuesForDetailComponentFiltered: Tuple[] = this.newsData.filter(
      (item: NewsItemType) => {
        return item.title === this.newsItemTitle;
      }
    );
    console.log(valuesForDetailComponentFiltered[0]);
    console.log(this.valuesForDetailComponent);
    this.valuesForDetailComponent = valuesForDetailComponentFiltered[0];
    // this.newsPapername = valuesForDetailComponent2[0].source.name;

    return valuesForDetailComponentFiltered;
  }
}
</script>

<style scoped>
.details-page-container {
  color: black;
}
.details-page-title {
  color: black;
}
</style>
