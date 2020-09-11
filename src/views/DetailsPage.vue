<template>
  <div class="detailspage-container">
    {{ this.newsItemPublishedTime }} GMT
    <hr />
    <div
      v-for="newsItem in this.valuesForDetailComponent"
      :key="newsItem.title"
      class="detailspage-data"
    >
      <div
        class="detailspage-title"
        @mouseover="isHovering = true"
        @mouseout="isHovering = false"
        :class="{ hovering: isHovering }"
      >
        <a :href="newsItem.url">{{ newsItem.title }}</a>
      </div>

      <div>Written by:{{ " " }}{{ newsItem.author }}</div>
      <br />
      <div class="detailspage-description">
        <span class="detailspage-small-header">Description</span>
        <br />
        {{
        newsItem.description
        }}
      </div>
      <div class="detailspage-contents">
        <span class="detailspage-small-header">Contents</span>
        <br />
        {{
        newsItem.content
        }}
      </div>
      <div
        class="detailspage-read-more"
        @mouseover="hoveringReadMore = true"
        @mouseout="hoveringReadMore = false"
        :class="{ hovering: hoveringReadMore }"
      >
        <a :href="newsItem.url">READ MORE</a>
      </div>

      <div class="detailspage-picture">
        <img v-bind:src="newsItem.urlToImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsItemType from "../interfacesforapp";

import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import { convertNewsItemPublishedTime } from "../methodsForGeneralUse";

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    console.log("mounted");

    //fetch the newsData and put it in the vuex store
    await news.fetchNews();

    //get the newsdata when the vuex store is populated with newsdata
    this.getAllNewsData;

    //get the right detail object for a given newsitem
    this.getValuesForDetailComponent;

    //convert the publishedAt timestring to be more concrete
    if (this.valuesForDetailComponent[0].publishedAt) {
      this.newsItemPublishedTime = convertNewsItemPublishedTime(
        this.valuesForDetailComponent[0].publishedAt
      );
    }
  }
  isHovering = false;
  hoveringReadMore = false;
  newsData = [];

  //get the newsitem where a user clicked on to go to its detail page from params
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valuesForDetailComponent: NewsItemType[] = [];

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsCountryQueriedGetter;

    return null;
  }

  //populate the newsdata data item by filtering it, saving the newsItem that matches the newsItem a user clicked on to go to its detail page
  get getValuesForDetailComponent() {
    const valuesForDetailComponentFiltered: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType) => {
        return item.title === this.newsItemTitle;
      }
    );
    console.log(valuesForDetailComponentFiltered);
    console.log(this.valuesForDetailComponent);
    this.valuesForDetailComponent = valuesForDetailComponentFiltered;

    return valuesForDetailComponentFiltered;
  }
}
</script>

<style scoped>
.detailspage-container {
  color: black;
  margin-top: 161px;
}
.detailspage-title {
  font-weight: bold;
  color: black;
  margin-bottom: 5%;
}

a {
  text-decoration: none;
  color: black;
}

.hovering a {
  color: blue;
}
.detailspage-picture {
  display: grid;
  grid-template-columns: 100%;
}

.detailspage-picture img {
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
}
.detailspage-description,
.detailspage-read-more,
.detailspage-contents {
  margin-bottom: 5%;
}

.detailspage-read-more {
  font-weight: bold;
}

.detailspage-small-header {
  font-weight: bold;
}
</style>
