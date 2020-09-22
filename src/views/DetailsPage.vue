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
    <!-- three other relevant items -->

    <div class="detailspage-other-relevant-items">
      <h2>More{{" "}}{{ this.newsBase}}{{" news"}}</h2>
      <hr />
      <div
        v-for="newsItem in this.threeRelevantExtraNewsItems"
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
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsItemType from "../interfacesforapp";
// import { bus } from "../main";
import { Vue, Component } from "vue-property-decorator";
//EVEN UITGEZET!!!
// import news from "../store/modules/news";
//EVEN UITGEZET!!!
import { convertNewsItemPublishedTime } from "../methodsForGeneralUse";

interface FetchBase {
  fetchBase: string;
  typeOfFetchBase: string;
}

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    console.log("mounted");

    const fetchBaseData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].fetchBaseObject;

    this.newsBase = fetchBaseData.fetchBase;

    if (fetchBaseData.fetchBase === "Default Country") {
      this.newsBase = "United States";
    }

    // await news.fetchNewsQuery(countryFetchObject);

    // //get the info about what data to fetch

    // bus.$on("selectedCountry", (selectedCountry: string) => {
    //   const countryFetchObject: FetchBase = {
    //     fetchBase: selectedCountry,
    //     typeOfFetchBase: "fetchCountry"
    //   };
    //   const itemsToFetch = countryFetchObject;
    //   console.log(itemsToFetch);
    //   //EVEN UITGEZET!!!
    //   // news.fetchNewsQuery(itemsToFetch);
    //   // //EVEN UITGEZET!!!
    // });

    // bus.$on("selectedNewsCategory", (selectedNewsCategory: string) => {
    //   const newsCategoryFetchObject = {
    //     fetchBase: selectedNewsCategory,
    //     typeOfFetchBase: "fetchNewsCategory"
    //   };
    //   const itemsToFetch = newsCategoryFetchObject;
    //   console.log(itemsToFetch);
    //   //EVEN UITGEZET!!!
    //   // news.fetchNewsQuery(itemsToFetch);
    //   // //EVEN UITGEZET!!!
    // });

    // bus.$on("useInputValueToFetchData", (inputValue: string) => {
    //   const inputFetchObject = {
    //     fetchBase: inputValue,
    //     typeOfFetchBase: "fetchInput"
    //   };

    //   const itemsToFetch = inputFetchObject;
    //   console.log(itemsToFetch);
    //   //EVEN UITGEZET!!!
    //   // news.fetchNewsQuery(itemsToFetch);
    //   // //EVEN UITGEZET!!!
    // });

    //fetch the newsData and put it in the vuex store

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
  newsBase = "";

  //get the newsitem where a user clicked on to go to its detail page from params
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valuesForDetailComponent: NewsItemType[] = [];
  threeRelevantExtraNewsItems: NewsItemType[] = [];

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;

    return null;
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsitems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //populate the newsdata data item by filtering it, saving the newsItem that matches the newsItem a user clicked on to go to its detail page
  get getValuesForDetailComponent() {
    //initiate the variable "indexNotToShowInExtraNewsItems" to save the index from the item that gets displayed
    //use that to exclude it from the extra three items displayed
    let filterDisplayedItemOut = 0;

    //initiate the variable "indexToShowExtraNewsItems" to get the most recent three news extra items

    let indexToShowExtraNewsItems = 3;

    //get the clicked news item from the array
    const valuesForDetailComponentFiltered: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        // save the index of the clicked news item
        if (item.title === this.newsItemTitle) {
          filterDisplayedItemOut = index;
        }
        return item.title === this.newsItemTitle;
      }
    );

    //if the news item displayed is one of them, increase the variable "indexToShowExtraNewsItems" to filter three items out of the array by 1 to display three, not two items
    if (
      filterDisplayedItemOut == 0 ||
      filterDisplayedItemOut == 1 ||
      filterDisplayedItemOut == 2
    ) {
      indexToShowExtraNewsItems += 1;
    }

    const extraValuesForDetailComponent: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        // }
        return (
          index !== filterDisplayedItemOut && index < indexToShowExtraNewsItems
        );
      }
    );

    this.valuesForDetailComponent = valuesForDetailComponentFiltered;
    this.threeRelevantExtraNewsItems = extraValuesForDetailComponent;
    return valuesForDetailComponentFiltered;
  }
}
</script>

<style scoped>
.detailspage-container {
  color: black;
  margin-top: 175px;
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
