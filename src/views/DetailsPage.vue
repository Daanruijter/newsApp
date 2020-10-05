<template>
  <div class="detailspage-container">
    <hr class="detailspage-hr-adapt-size" />
    {{ this.newsItemPublishedTime }} GMT
    <hr class="detailspage-hr-adapt-size" />
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

      <div>
        <i>
          Written by:{{ " " }}{{ newsItem.author }}{{ ", source: "
          }}{{ newsItem.source.name }}</i
        >
      </div>
      <br />
      <div class="detailspage-description-wrapper">
        <span class="detailspage-small-header">Description</span>
        <br />

        <div class="detailspage-description">{{ newsItem.description }}</div>
      </div>
      <div class="detailspage-contents-wrapper">
        <span class="detailspage-small-header">Contents</span>
        <br />
        <div class="detailspage-contents">{{ newsItem.content }}</div>
      </div>

      <div class="detailspage-picture">
        <img v-bind:src="newsItem.urlToImage" />
      </div>
    </div>
    <!-- three other relevant items -->

    <div class="detailspage-other-relevant-items">
      <div class="detailspage-other-news-bar">
        <h2>More{{ " " }}{{ this.newsBase }}{{ " news" }}</h2>
      </div>
      <hr class="detailspage-hr-adapt-size" />
      <div
        v-for="newsItem in this.threeRelevantExtraNewsItems"
        :key="newsItem.title"
        class="detailspage-data"
      >
        <div>{{ newsItem.publishedAt }} GMT</div>
        <hr class="detailspage-hr-adapt-size" />

        <div
          class="detailspage-title"
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          :class="{ hovering: isHovering }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>

        <div>
          <i>
            Written by:{{ " " }}{{ newsItem.author }}{{ ", source: "
            }}{{ newsItem.source.name }}</i
          >
        </div>
        <br />
        <div class="detailspage-description-wrapper">
          <span class="detailspage-small-header">Description</span>
          <br />

          <div class="detailspage-description">{{ newsItem.description }}</div>
        </div>
        <div class="detailspage-contents-wrapper">
          <span class="detailspage-small-header">Contents</span>
          <br />
          <div class="detailspage-contents">{{ newsItem.content }}</div>
        </div>

        <div class="detailspage-picture">
          <img v-bind:src="newsItem.urlToImage" />
        </div>
        <hr class="detailspage-hr-adapt-size" />
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
  async mounted() {
    console.log("DETAILSPAGE mounted");
    //on mounting, fetch the current newsItem array
    this.processDataForDetailsComponent();

    //if a user clicks an item below the header "details page" in the footer, make sure that the details page gets rerendered with the title where a user clicked on
    bus.$on("triggerdetailspagereload", (title: string) => {
      this.processDataForDetailsComponent(title);
    });

    //if a user clicks on the details button in the footer, make sure that the details page gets rerendered with a default title
    bus.$on("loadFirstElementOfDetailsPage", (title: string) => {
      console.log("loadfirstelementofdetailspage");
      this.processDataForDetailsComponent(title);
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

  async processDataForDetailsComponent(
    title?: string
  ): Promise<NewsItemType[]> {
    const newsCategoryFetchObject = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fetchBase: localStorage.getItem("fetchBase")!,

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      typeOfFetchBase: localStorage.getItem("typeOfFetchBase")!,
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.newsBase = localStorage.getItem("fetchBase")!;

    if (this.newsBase === "Default Country") {
      this.newsBase = "United States";
    }

    console.log("processDATAFORTANDOMCOMP");
    //fetch the data
    await news.fetchNewsQuery(newsCategoryFetchObject);
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    const newsData = (this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter);
    console.log(newsData);

    //process the data to display the clicked item and three extra relevant items
    this.getValuesForDetailComponent(newsData, title);

    return newsData;
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display newsItems that already got displayed on the homepage.
  //The random number must also not be higher than the length of the array of newsitems
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //populate the newsdata data item by filtering it, saving the newsItem that matches the newsItem a user clicked on to go to its detail page
  getValuesForDetailComponent(newsData: NewsItemType[], title?: string): null {
    let titleToFilterItemOut = this.newsItemTitle;

    if (title) {
      titleToFilterItemOut = title;
      console.log(titleToFilterItemOut);
    }

    //initiate the variable "indexNotToShowInExtraNewsItems" to save the index from the item that gets displayed
    //use that to exclude it from the extra three items displayed
    let filterDisplayedItemOut = 0;

    //initiate the variable "indexToShowExtraNewsItems" to get the most recent three news extra items

    let indexToShowExtraNewsItems = 3;
    console.log(newsData);
    if (newsData.length !== 0) {
      //get the clicked news item from the array
      const valueForDetailComponentFiltered: NewsItemType[] = newsData.filter(
        (item: NewsItemType, index: number) => {
          // save the index of the clicked news item
          // console.log(this.newsItemPublishedTime.includes(item.title));

          console.log(item.title);
          console.log(titleToFilterItemOut);

          if (titleToFilterItemOut.includes(item.title)) {
            filterDisplayedItemOut = index;
          }
          return titleToFilterItemOut.includes(item.title);
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
      let extraValuesForDetailComponent: NewsItemType[] = newsData.filter(
        (item: NewsItemType, index: number) => {
          // }
          return (
            index !== filterDisplayedItemOut &&
            index < indexToShowExtraNewsItems
          );
        }
      );

      //convert the publishedAt timestring to be readable
      if (
        valueForDetailComponentFiltered.length !== 0 &&
        valueForDetailComponentFiltered[0].publishedAt
      ) {
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
    }
    return null;
  }
}
</script>

<style scoped>
/* general rules */
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

.detailspage-read-more {
  font-weight: bold;
}

.detailspage-small-header {
  font-weight: bold;
}

/* bigger screens */
@media only screen and (min-width: 1000px) {
  .detailspage-container {
    color: black;
    margin-left: 15%;
    width: 70%;
  }

  .detailspage-other-news-bar {
    background-color: blue;
    margin: 2% 15% 2% 15%;
    color: white;
  }

  .detailspage-hr-adapt-size {
    margin-left: 15%;
    margin-top: 2%;
    margin-right: 15%;
    margin-bottom: 2%;
  }

  .detailspage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 2%;
    font-size: 125%;
  }

  .detailspage-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    margin-left: 35%;
    margin-right: 35%;
    width: 35%;
  }

  .detailspage-description,
  .detailspage-contents {
    margin-bottom: 2%;
    margin-left: 15%;
    margin-right: 15%;
    text-align: left;
  }
}
/* medium screens */
@media only screen and (min-width: 701px) and (max-width: 999px) {
  .detailspage-container {
    color: black;
    padding-top: 1%;
    margin-left: 15%;
    width: 70%;
  }

  .detailspage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
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
}
/* smaller screens */
@media only screen and (max-width: 700px) {
  .detailspage-container {
    color: black;
    padding-top: 1%;
  }

  .detailspage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
  }

  .detailspage-other-news-bar {
    background-color: blue;
    margin: 2% 0% 2% 0%;
    color: white;
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
}
</style>
