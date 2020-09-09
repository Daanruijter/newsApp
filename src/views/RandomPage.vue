<template>
  <div class="randompage-container">
    {{ this.newsItemPublishedTime }} GMT
    <hr />
    <div
      v-for="newsItem in this.randomNewsItem"
      :key="newsItem.title"
      class="randompage-data"
    >
      <div
        class="randompage-title"
        @mouseover="isHovering = true"
        @mouseout="isHovering = false"
        :class="{ hovering: isHovering }"
      >
        <a :href="newsItem.url"> {{ newsItem.title }}</a>
      </div>

      <div v-if="newsItem.author">
        Written by:{{ " " }}{{ newsItem.author }}
      </div>
      <br />
      <div class="randompage-description">
        <span class="randompage-small-header">Description</span><br />{{
          newsItem.description
        }}
      </div>
      <div class="randompage-contents">
        <span class="randompage-small-header">Contents</span><br />{{
          newsItem.content
        }}
      </div>
      <div
        class="randompage-read-more"
        @mouseover="hoveringReadMore = true"
        @mouseout="hoveringReadMore = false"
        :class="{ hovering: hoveringReadMore }"
      >
        <a :href="newsItem.url">READ MORE </a>
      </div>
      <div class="randompage-button">
        <button @click="changeRandomNewsItemOnButtonClick">
          Another random news item
        </button>
      </div>
      <div class="randompage-picture">
        <img v-bind:src="newsItem.urlToImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import NewsItemType from "../interfacesforapp";
import { convertNewsItemPublishedTime } from "../methodsForGeneralUse";

@Component
export default class RandomPage extends Vue {
  newsData = [];
  randomNewsItem: NewsItemType[] = [];
  newsItemPublishedTime = "";
  isHovering = false;
  hoveringReadMore = false;
  async mounted() {
    console.log("mounted");

    //fetch the newsData and put it in the vuex store
    await news.fetchNews();
    this.getAllNewsData;
    this.filterArrayByRandomIndex();
    this.newsItemPublishedTime = convertNewsItemPublishedTime(
      this.randomNewsItem[0].publishedAt
    );
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
    const randomNewsItem = this.randomIntFromInterval(
      10,
      this.newsData.length - 1
    );
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
  changeRandomNewsItemOnButtonClick() {
    this.filterArrayByRandomIndex();
  }
}
</script>

<style scoped>
.randompage-container {
  color: black;
  margin-top: 161px;
}

.randompage-title {
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
.randompage-picture {
  display: grid;
  grid-template-columns: 100%;
}

.randompage-picture img {
  grid-column-start: 1;
  grid-column-end: 2;
  width: 100%;
}
.randompage-description,
.randompage-read-more,
.randompage-contents {
  margin-bottom: 5%;
}

.randompage-read-more {
  font-weight: bold;
  margin-bottom: 12%;
}

.randompage-small-header {
  font-weight: bold;
}

.randompage-button button {
  margin-bottom: 5%;
  font-size: 100%;
}
</style>
