<template>
  <div class="detailspage-container">
    <div v-if="this.newsData[0]" class="detailspage-newsdata-loaded">
      <hr v-if="this.newsData[0]" class="detailspage-hr-adapt-size" />
      <div v-if="this.valueForDetailComponent[0].publishedAt">
        {{ this.valueForDetailComponent[0].publishedAt }} GMT
      </div>
      <hr
        v-if="this.valueForDetailComponent[0].publishedAt"
        class="detailspage-hr-adapt-size"
      />
      <div
        v-for="newsItem in this.valueForDetailComponent"
        :key="newsItem.title"
        class="detailspage-data"
      >
        <div
          v-if="newsItem.title"
          class="detailspage-title"
          @mouseover="isHoveringFirstItem = true"
          @mouseout="isHoveringFirstItem = false"
          :class="{ hovering: isHoveringFirstItem }"
        >
          <a :href="newsItem.url">{{ newsItem.title }}</a>
        </div>
        <div>
          <i v-if="newsItem.author && newsItem.title"
            >Written by:{{ " " }}{{ newsItem.author }}</i
          >
          <i v-if="newsItem.source.name && newsItem.author && newsItem.title">
            <i v-if="newsItem.source.name && newsItem.author && newsItem.title"
              >,</i
            >
            {{ " Source: " }}{{ newsItem.source.name }}
          </i>
        </div>
        <br />
        <div class="detailspage-description-wrapper">
          <span
            v-if="newsItem.description && newsItem.title"
            class="detailspage-small-header"
            >Description</span
          >
          <br />

          <div
            v-if="newsItem.description && newsItem.title"
            class="detailspage-description"
          >
            {{ newsItem.description }}
          </div>
        </div>
        <div class="detailspage-contents-wrapper">
          <span
            v-if="newsItem.content && newsItem.title"
            class="detailspage-small-header"
            >Contents</span
          >
          <br />
          <div
            v-if="newsItem.content && newsItem.title"
            class="detailspage-contents"
          >
            {{ newsItem.content }}
          </div>
        </div>

        <div class="detailspage-picture">
          <img
            @error="turnBrokenPictureVariableToTrue"
            v-if="!firstItemPictureNotLoaded"
            v-bind:src="newsItem.urlToImage"
          />
        </div>
      </div>
      <!-- three other relevant items -->

      <div
        v-if="threeRelevantExtraNewsItems[0]"
        class="detailspage-other-relevant-items"
      >
        <div class="detailspage-other-news-bar">
          <h2>More{{ " " }}{{ this.newsBase }}{{ " news" }}</h2>
        </div>
        <hr
          v-if="threeRelevantExtraNewsItems[0]"
          class="detailspage-hr-adapt-size"
        />
        <div
          v-for="(newsItem, index) in this.threeRelevantExtraNewsItems"
          :key="newsItem.title"
          class="detailspage-data"
        >
          <div v-if="newsItem.publishedAt && newsItem.title">
            {{ newsItem.publishedAt }} GMT
          </div>
          <hr
            v-if="newsItem.publishedAt && newsItem.title"
            class="detailspage-hr-adapt-size"
          />

          <div
            v-if="newsItem.title"
            class="detailspage-title"
            @mouseover="mouseEnter(index)"
            @mouseout="mouseLeave(index)"
            :class="{ hovering: newsItem.extraThreeItemsDetailsPageHovered }"
          >
            <a :href="newsItem.url">{{ newsItem.title }}</a>
          </div>

          <div>
            <i v-if="newsItem.author && newsItem.title"
              >Written by:{{ " " }}{{ newsItem.author }}</i
            >
            <i v-if="newsItem.source.name && newsItem.author && newsItem.title">
              <i
                v-if="newsItem.source.name && newsItem.author && newsItem.title"
                >,</i
              >
              {{ " Source: " }}{{ newsItem.source.name }}
            </i>
          </div>
          <br />
          <div class="detailspage-description-wrapper">
            <span v-if="newsItem.description" class="detailspage-small-header"
              >Description</span
            >
            <br />

            <div
              v-if="newsItem.description && newsItem.title"
              class="detailspage-description"
            >
              {{ newsItem.description }}
            </div>
          </div>
          <div
            v-if="newsItem.content && newsItem.title"
            class="detailspage-contents-wrapper"
          >
            <span
              v-if="newsItem.content && newsItem.title"
              class="detailspage-small-header"
              >Contents</span
            >
            <br />
            <div class="detailspage-contents">{{ newsItem.content }}</div>
          </div>

          <div class="detailspage-picture">
            <img
              @error="pushIndicesOfNotLoadedPictures(index)"
              v-if="!extraItemsPictureNotLoaded.includes(index)"
              v-bind:src="newsItem.urlToImage"
            />
          </div>
          <hr
            v-if="newsItem.title && newsItem.title"
            class="detailspage-hr-adapt-size"
          />
        </div>
      </div>
    </div>
    <div v-if="!this.newsData[0]" class="detailspage-newsdata-not-loaded">
      <div class="detailspage-no-newsitems">No news items to show</div>
    </div>
  </div>
</template>

<script lang="ts">
export interface FetchNews {
  fetchBase: string;
  typeOfFetchBase: string;
}
import NewsItemType from "../interfacesforapp";
import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";
import { bus } from "../main";
import createSitemap from "../methodsForGeneralUse";

@Component
export default class DetailsPage extends Vue {
  async mounted() {
    //On mounting, fetch the current newsItem array
    this.processDataForDetailsComponent();

    //If a user clicks on a dynamic sitemap link in the footer, make sure that the Details Page gets rerendered with the help of the title where a user clicked on
    bus.$on("triggerdetailspagereload", (title: string) => {
      this.processDataForDetailsComponent(title);
    });

    //If a user clicks on the details button in the footer, make sure that the Details Page gets rerendered with relevant items
    bus.$on("loadFirstElementOfDetailsPage", (title: string) => {
      this.processDataForDetailsComponent(title);
    });
  }

  //STATE
  isHoveringFirstItem = false;
  indexOfHoveredExtraItem: number | null = null;
  newsData = [];
  newsBase = "";

  //Get the newsitem where a user clicked on to go to its detail page from params (because there is no parent/child relation between the home and Details Page component)
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valueForDetailComponent: NewsItemType[] = [];
  threeRelevantExtraNewsItems: NewsItemType[] = [];

  firstItemPictureNotLoaded = false;
  extraItemsPictureNotLoaded: number[] = [];

  //Fetch the news items and call the this.getValuesForDetailComponent method to display the data on the page
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

    //Fetch the data
    await news.fetchNewsQuery(newsCategoryFetchObject);

    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;

    const newsData = (this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter);

    //Process the data to display the (on the homepage or the newsfooter) clicked item and three extra relevant items
    this.getValuesForDetailComponent(newsData, title);

    return newsData;
  }

  //Populate the variables that hold the data to be displayed, by filtering the newsItem array with the help of the title of the clicked news item.
  async getValuesForDetailComponent(newsData: NewsItemType[], title?: string) {
    //This.newsItemTitle gets the title from params
    let titleToFilterItemOut = this.newsItemTitle;
    let valueForDetailComponentFiltered: NewsItemType[] = [];

    console.log(this.newsItemTitle);

    //Title comes from a click on the details button in the newfooter. The "bus" passes it through
    //If that happens, titleToFilterItemOut must be equal to that title
    if (title) {
      titleToFilterItemOut = title;
    }

    if (newsData.length !== 0) {
      //Get the clicked news item from the array
      valueForDetailComponentFiltered = newsData.filter(
        (item: NewsItemType) => {
          console.log(titleToFilterItemOut.includes(item.title));
          console.log(titleToFilterItemOut);
          console.log(item.title);
          return titleToFilterItemOut.includes(item.title);
        }
      );

      //Filter the news items array to get three other most recent items that are not shown on the homepage (so they should have indices 10, 11 and 12 )
      const extraValuesForDetailComponent: NewsItemType[] = newsData.filter(
        (item: NewsItemType, index: number) => {
          return index === 10 || index === 11 || index === 12;
        }
      );

      //Populate the variables to display the data in the template
      this.valueForDetailComponent = valueForDetailComponentFiltered;
      this.threeRelevantExtraNewsItems = extraValuesForDetailComponent;
    }

    //If a user goes from the details page to the random page and comes back to the details page, the newsData array has been changed,
    //so I need to fetch the right data again and do a similar procedure to get them displayed
    if (valueForDetailComponentFiltered.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let newsCategoryFetchObject: FetchNews = {
        fetchBase: "",
        typeOfFetchBase: "",
      };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (localStorage.getItem("fetchBaseForDetailsComponent")!) {
        newsCategoryFetchObject = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fetchBase: localStorage.getItem("fetchBaseForDetailsComponent")!,

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          typeOfFetchBase: localStorage.getItem(
            "newsCategoryForDetailsComponent"
          )!,
        };

        this.newsBase = newsCategoryFetchObject.fetchBase;

        await news.fetchNewsQuery(newsCategoryFetchObject);

        this.newsData = this.$store.getters[
          "vuexModuleDecorators/newsDataModule"
        ].queriedNewsItemsGetter;

        //Get the data from vuex in the newsFooter component
        bus.$emit("triggerDataToFetchInFooter");
        valueForDetailComponentFiltered = this.newsData.filter(
          (item: NewsItemType) => {
            return titleToFilterItemOut.includes(item.title);
          }
        );
      }

      //Filter the newsitems array to get three other most recent items that are not shown on the homepage (so they should have indices 10, 11 and 12 )
      const extraValuesForDetailComponent: NewsItemType[] = this.newsData.filter(
        (item: NewsItemType, index: number) => {
          return index === 10 || index === 11 || index === 12;
        }
      );

      //Populate the variables to display the data in the template
      this.valueForDetailComponent = valueForDetailComponentFiltered;
      this.threeRelevantExtraNewsItems = extraValuesForDetailComponent;
    }

    if (process.env.NODE_ENV === "production") {
      //Create a sitemap with the title put on the details page url
      createSitemap(this.newsData, titleToFilterItemOut);
      return null;
    }
  }

  //Hide a picture of the first item on the page if it's broken/does not load
  turnBrokenPictureVariableToTrue() {
    this.firstItemPictureNotLoaded = true;
  }

  //Hide a picture if an extra item has a broken one
  pushIndicesOfNotLoadedPictures(index: number) {
    if (!this.extraItemsPictureNotLoaded.includes(index))
      this.extraItemsPictureNotLoaded.push(index);
  }

  //Create a hovering effect for the links if a user enters a link with his mouse
  mouseEnter(index: number | null): void {
    this.indexOfHoveredExtraItem = index;

    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.threeRelevantExtraNewsItems[index]!;

      item.extraThreeItemsDetailsPageHovered = !item.extraThreeItemsDetailsPageHovered;

      //Add extraThreeItemsDetailsPageHovered as a property to the news array with a boolean that is set to true, indicating that the link with "index" is hovered
      this.$set(this.threeRelevantExtraNewsItems, index, item);
    }
  }

  //Undo the hovering effect for the links if a user leaves the link with his mouse
  mouseLeave(index: number | null): void {
    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.threeRelevantExtraNewsItems[index]!;

      item.extraThreeItemsDetailsPageHovered = !item.extraThreeItemsDetailsPageHovered;

      //Set extraThreeItemsDetailsPageHovered to false
      this.$set(this.threeRelevantExtraNewsItems, index, item);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    font-size: 105%;
    text-align: center;
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
    text-align: left;
    font-size: 105%;
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
    text-align: left;
    font-size: 105%;
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
