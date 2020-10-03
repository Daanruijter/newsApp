<template>
  <div class="detailspage-container">
    {{ this.newsItemPublishedTime }} GMT
    <hr />
    <div
      v-for="newsItem in this.valueForDetailComponent"
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
        {{ newsItem.description }}
      </div>
      <div class="detailspage-contents">
        <span class="detailspage-small-header">Contents</span>
        <br />
        {{ newsItem.content }}
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
      <h2>More{{ " " }}{{ this.newsBase }}{{ " news" }}</h2>
      <hr />
      <div
        v-for="newsItem in this.threeRelevantExtraNewsItems"
        :key="newsItem.title"
        class="detailspage-data"
      >
        <div>{{ newsItem.publishedAt }} GMT</div>
        <br />
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
          {{ newsItem.description }}
        </div>
        <div class="detailspage-contents">
          <span class="detailspage-small-header">Contents</span>
          <br />
          {{ newsItem.content }}
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
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import { convertNewsItemPublishedTime } from "../methodsForGeneralUse";
import { bus } from "../main";

interface FetchBase {
  fetchBase: string;
  typeOfFetchBase: string;
}

@Component
export default class DetailsPage extends Vue {
  mounted() {
    console.log("DETAILSPAGE mounted");

    // this.processDataForDetailsComponent();

    //if a user clicks an item below the header "details page" in the footer, make sure that the details page gets rerendered with the title where a user clicked on
    bus.$on("triggerdetailspagereload", (title: string) => {
      console.log(this.newsData);
      this.newsItemTitle = title;
      setTimeout(() => this.processDataForDetailsComponent(), 3000);

      console.log(title);
      console.log("triggerdeailspagetoreload");
    });

    //if a user clicks on the details button in the footer, make sure that the details page gets rerendered with a default title
    bus.$on("loadFirstElementOfDetailsPage", (title: string) => {
      this.newsItemTitle = title;
      this.processDataForDetailsComponent();
      console.log(title);
    });
  }
  isHovering = false;
  hoveringReadMore = false;
  newsData = [];
  newsBase = "";

  //get the newsitem where a user clicked on to go to its detail page from params (because there is no parent/child relation between the home and detailspage component)
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valueForDetailComponent: NewsItemType[] = [];
  threeRelevantExtraNewsItems: NewsItemType[] = [];

  async processDataForDetailsComponent() {
    console.log("processDATAFORTANDOMCOMP");

    //if the news items array is not populated, because of a page reload, fetch it again
    if (Object.keys(this.newsData).length === 0) {
      //get the right info for fetching the data
      const newsCategoryFetchObject = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fetchBase: localStorage.getItem("fetchBase")!,

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        typeOfFetchBase: localStorage.getItem("typeOfFetchBase")!,
      };

      //fetch the data
      await news.fetchNewsQuery(newsCategoryFetchObject);
      this.newsData = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].queriedNewsItemsGetter;

      //get the data in the component
      this.newsBase = newsCategoryFetchObject.fetchBase;

      if (newsCategoryFetchObject.typeOfFetchBase === "Default country") {
        [(this.newsBase = "United States")];
      }
    }

    //get the right detail object for a given newsitem
    await this.getValuesForDetailComponent();
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsitems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //populate the newsdata data item by filtering it, saving the newsItem that matches the newsItem a user clicked on to go to its detail page
  getValuesForDetailComponent() {
    //initiate the variable "indexNotToShowInExtraNewsItems" to save the index from the item that gets displayed
    //use that to exclude it from the extra three items displayed
    let filterDisplayedItemOut = 0;

    //initiate the variable "indexToShowExtraNewsItems" to get the most recent three news extra items

    let indexToShowExtraNewsItems = 3;
    console.log(this.newsData);
    //get the clicked news item from the array
    const valueForDetailComponentFiltered: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        // save the index of the clicked news item
        console.log(this.newsItemPublishedTime.includes(item.title));
        if (this.newsItemTitle.includes(item.title)) {
          filterDisplayedItemOut = index;
        }
        return this.newsItemTitle.includes(item.title);
      }
    );

    console.log(valueForDetailComponentFiltered);
    console.log("valueForDetailComponentFiltered");

    //if the news item displayed is one of them, increase the variable "indexToShowExtraNewsItems" to filter three items out of the array by 1 to display three, not two items
    if (
      filterDisplayedItemOut == 0 ||
      filterDisplayedItemOut == 1 ||
      filterDisplayedItemOut == 2
    ) {
      indexToShowExtraNewsItems += 1;
    }

    //filter the newsitems array to get three other most recent items
    let extraValuesForDetailComponent: NewsItemType[] = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        // }
        return (
          index !== filterDisplayedItemOut && index < indexToShowExtraNewsItems
        );
      }
    );

    //convert the publishedAt timestring to be readable
    if (valueForDetailComponentFiltered[0].publishedAt) {
      this.newsItemPublishedTime = convertNewsItemPublishedTime(
        valueForDetailComponentFiltered[0].publishedAt
      );
    }

    //convert the publishedAt timestring to be readable
    extraValuesForDetailComponent = extraValuesForDetailComponent.map(
      (item: NewsItemType) => {
        if (item.publishedAt) {
          item.publishedAt = convertNewsItemPublishedTime(item.publishedAt);
        }
        return item;
      }
    );

    //populate the variables to display the data in the template
    this.valueForDetailComponent = valueForDetailComponentFiltered;
    this.threeRelevantExtraNewsItems = extraValuesForDetailComponent;

    return valueForDetailComponentFiltered;
  }
}
</script>

<style scoped>
.detailspage-container {
  color: black;
  margin-top: 1%;
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

/* bigger screens */ @media only screen and (min-width: 1000px) {} /* medium
screens */ @media only screen and (min-width: 701px) and (max-width: 999px) {}
/* smaller screens */ @media only screen and (max-width: 700px) {}
