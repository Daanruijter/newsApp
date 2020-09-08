<template>
  <div class="detailspage-container">
    {{ this.newsItemPublishedTime }} GMT
    <hr />
    <div
      v-for="newsItem in this.valuesForDetailComponent"
      :key="newsItem.title"
      class="detailspage-data"
    >
      <div class="detailspage-title">
        {{ newsItem.title }}
      </div>
      <div class="detailspage-picture">
        <img v-bind:src="newsItem.urlToImage" />
      </div>
      <hr />
      <div>{{ newsItem.author }} {{ newsItem.publishedAt }}</div>
      <hr />

      <div>{{ newsItem.description }}</div>

      <hr />
      <div>{{ newsItem.url }}</div>
      <hr />

      <hr />
      <div>{{ newsItem.publishedAt }}</div>
      <hr />
      <div>{{ newsItem.content }}</div>
      <hr />
      <div>{{ newsItem.source.name }}</div>
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

import { Vue, Component } from "vue-property-decorator";
import news from "../store/modules/news";

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
      this.convertNewsItemPublishedTime();
    }
  }

  newsData = [];

  //get the newsitem where a user clicked on to go to its detail page from params
  newsItemTitle = this.$route.params.title;
  newsItemPublishedTime = "";
  valuesForDetailComponent: NewsItemType[] = [];

  //populate the newsdata data array (necessary to filter based on the newsItemTitle variable)
  get getAllNewsData() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].newsDataGetter;

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

  //convert the publishedAt timestring to be more concrete
  convertNewsItemPublishedTime() {
    const newsItemPublishedTime = this.valuesForDetailComponent[0].publishedAt;
    const dateString = new Date(newsItemPublishedTime);

    const minutes = dateString.getMinutes();
    const hours = dateString.getHours();

    //get the current day in letters
    const day = dateString.getDay();
    let weekDay = "";

    if (day === 0) {
      weekDay = "Sunday";
    }
    if (day === 1) {
      weekDay = "Monday";
    }
    if (day === 2) {
      weekDay = "Tuesday";
    }
    if (day === 3) {
      weekDay = "Wednesday";
    }
    if (day === 4) {
      weekDay = "Thursday";
    }
    if (day === 5) {
      weekDay = "Friday";
    }
    if (day === 6) {
      weekDay = "Saturday";
    }

    //get the day number in month in letters//
    const dateNumber = dateString.getDate();

    //get the month in letters//
    const month = dateString.getMonth();

    let monthName = "";

    if (month === 0) {
      monthName = "January";
    }
    if (month === 1) {
      monthName = "February";
    }
    if (month === 2) {
      monthName = "March";
    }
    if (month === 3) {
      monthName = "April";
    }
    if (month === 4) {
      monthName = "May";
    }
    if (month === 5) {
      monthName = "June";
    }
    if (month === 6) {
      monthName = "July";
    }
    if (month === 7) {
      monthName = "August";
    }
    if (month === 8) {
      monthName = "September";
    }
    if (month === 9) {
      monthName = "Oktober";
    }
    if (month === 10) {
      monthName = "November";
    }
    if (month === 11) {
      monthName = "December";
    }

    //get the year//
    const year = dateString.getFullYear();

    const convertedDateString =
      weekDay +
      " " +
      dateNumber +
      " " +
      monthName +
      " " +
      year +
      " " +
      hours +
      ":" +
      minutes;
    console.log(convertedDateString);
    this.newsItemPublishedTime = convertedDateString;
    return convertedDateString;
  }
}
</script>

<style scoped>
.detailspage-container {
  color: black;
}
.detailspage-title {
  font-weight: bold;
  color: black;
  margin-bottom: 5%;
}

a {
  text-decoration: none;
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
</style>
