<template>
  <div class="detailspage-container">
    <div v-if="this.newsData[0]" class="detailspage-newsdata-loaded">
      <hr class="detailspage-hr-adapt-size" />
      {{ this.valueForDetailComponent[0].publishedAt }} GMT
      <hr class="detailspage-hr-adapt-size" />
      <div
        v-for="newsItem in this.valueForDetailComponent"
        :key="newsItem.title"
        class="detailspage-data"
      >
        <div
          class="detailspage-title"
          @mouseover="isHoveringFirstItem = true"
          @mouseout="isHoveringFirstItem = false"
          :class="{ hovering: isHoveringFirstItem }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>
        <div>
          <i v-if="newsItem.author">
            Written by:{{ " " }}{{ newsItem.author }}</i
          ><i
            ><i v-if="newsItem.author">,</i>{{ " source: "
            }}{{ newsItem.source.name }}</i
          >
        </div>
        <br />
        <div class="detailspage-description-wrapper">
          <span v-if="newsItem.description" class="detailspage-small-header"
            >Description</span
          >
          <br />

          <div v-if="newsItem.description" class="detailspage-description">
            {{ newsItem.description }}
          </div>
        </div>
        <div class="detailspage-contents-wrapper">
          <span v-if="newsItem.content" class="detailspage-small-header"
            >Contents</span
          >
          <br />
          <div v-if="newsItem.content" class="detailspage-contents">
            {{ newsItem.content }}
          </div>
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
          v-for="(newsItem, index) in this.threeRelevantExtraNewsItems"
          :key="newsItem.title"
          class="detailspage-data"
        >
          <div>{{ newsItem.publishedAt }} GMT</div>
          <hr class="detailspage-hr-adapt-size" />

          <div
            class="detailspage-title"
            @mouseover="mouseEnter(index)"
            @mouseout="mouseLeave(index)"
            :class="{ hovering: newsItem.extraThreeItemsDetailsPageHovered }"
          >
            <a :href="newsItem.url">{{ newsItem.title }}</a>
          </div>

          <div>
            <i v-if="newsItem.author">
              Written by:{{ " " }}{{ newsItem.author }}</i
            ><i
              ><i v-if="newsItem.author">,</i>{{ " source: "
              }}{{ newsItem.source.name }}</i
            >
          </div>
          <br />
          <div class="detailspage-description-wrapper">
            <span v-if="newsItem.description" class="detailspage-small-header"
              >Description</span
            >
            <br />

            <div v-if="newsItem.description" class="detailspage-description">
              {{ newsItem.description }}
            </div>
          </div>
          <div v-if="newsItem.content" class="detailspage-contents-wrapper">
            <span v-if="newsItem.content" class="detailspage-small-header"
              >Contents</span
            >
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
    <div v-if="!this.newsData[0]" class="detailspage-newsdata-not-loaded">
      <div class="detailspage-no-newsitems">No news items to show</div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsItemType from "../interfacesforapp";
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import { bus } from "../main";

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    //on mounting, fetch the current newsItem array
    this.processDataForDetailsComponent();

    //if a user clicks an item below the header "details page" in the footer, make sure that the details page gets rerendered with the title where a user clicked on
    bus.$on("triggerdetailspagereload", (title: string) => {
      this.processDataForDetailsComponent(title);
    });

    //if a user clicks on the details button in the footer, make sure that the details page gets rerendered with a default title
    bus.$on("loadFirstElementOfDetailsPage", (title: string) => {
      this.processDataForDetailsComponent(title);
    });
  }
  isHoveringFirstItem = false;
  indexOfHoveredExtraItem: number | null = null;
  newsData = [];
  newsBase = "";

  //get the newsitem where a user clicked on to go to its detail page from params (because there is no parent/child relation between the home and detailspage component)
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valueForDetailComponent: NewsItemType[] = [];
  threeRelevantExtraNewsItems: NewsItemType[] = [];

  //fetch the newsitems and call the this.getValuesForDetailComponent method to display the data on the page
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

    //fetch the data
    await news.fetchNewsQuery(newsCategoryFetchObject);
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    const newsData = (this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter);

    //process the data to display the clicked item and three extra relevant items
    this.getValuesForDetailComponent(newsData, title);

    return newsData;
  }

  //get a random number for the index. Number must be higher than 10, because I don't want to display news items that already got displayed on the homepage.
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
    }

    if (newsData.length !== 0) {
      //get the clicked news item from the array
      const valueForDetailComponentFiltered: NewsItemType[] = newsData.filter(
        (item: NewsItemType) => {
          return titleToFilterItemOut.includes(item.title);
        }
      );

      //filter the newsitems array to get three other most recent items that are not shown on the homepage (so they should have indices 10,11 and 12 )
      const extraValuesForDetailComponent: NewsItemType[] = newsData.filter(
        (item: NewsItemType, index: number) => {
          return index === 10 || index === 11 || index === 12;
        }
      );

      //populate the variables to display the data in the template
      this.valueForDetailComponent = valueForDetailComponentFiltered;
      this.threeRelevantExtraNewsItems = extraValuesForDetailComponent;
    }
    return null;
  }
  mouseEnter(index: number | null): void {
    this.indexOfHoveredExtraItem = index;

    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.threeRelevantExtraNewsItems[index]!;

      item.extraThreeItemsDetailsPageHovered = !item.extraThreeItemsDetailsPageHovered;

      this.$set(this.threeRelevantExtraNewsItems, index, item);
    }
  }
  mouseLeave(index: number | null): void {
    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.threeRelevantExtraNewsItems[index]!;

      item.extraThreeItemsDetailsPageHovered = !item.extraThreeItemsDetailsPageHovered;

      this.$set(this.threeRelevantExtraNewsItems, index, item);
    }
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

.detailspage-no-newsitems {
  color: white;
  font-weight: bold;
}

.detailspage-description-wrapper,
.detailspage-contents-wrapper {
  text-align: left;
}

/* bigger screens */
@media only screen and (min-width: 1000px) {
  .detailspage-container {
    color: black;
    margin-left: 15%;
    width: 70%;
    margin-top: 131px;
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

  .detailspage-small-header {
    text-align: left !important;
    margin-left: 15%;
  }

  .detailspage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* medium screens */
@media only screen and (min-width: 701px) and (max-width: 999px) {
  .detailspage-container {
    color: black;
    padding-top: 1%;
    margin-left: 15%;
    width: 70%;
    margin-top: 131px;
  }

  .detailspage-title {
    font-weight: bold;
    color: black;
    margin-bottom: 5%;
  }

  .detailspage-other-news-bar {
    background-color: blue;
    color: white;
  }

  .detailspage-picture img {
    grid-column-start: 1;
    grid-column-end: 2;
    width: 100%;
  }

  .detailspage-description,
  .detailspage-contents {
    margin-bottom: 5%;
    text-align: left;
  }

  .detailspage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* smaller screens */
@media only screen and (max-width: 700px) {
  .detailspage-container {
    color: black;
    padding-top: 1%;
    margin-top: 138px;
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
  .detailspage-contents {
    margin-bottom: 5%;
    text-align: left;
  }

  .detailspage-newsdata-not-loaded {
    background-color: purple;
    height: 83vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
