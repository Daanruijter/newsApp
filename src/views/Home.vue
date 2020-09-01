<template>
  <div class="home">
    <div v-for="tenFirstNewRecords in this.newsData" :key="tenFirstNewRecords.title">
      <div>{{ newsItem.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import { Store } from "vuex";

// @ is an alias to /src

export default Vue.extend({
  name: "Home",
  data: function() {
    return { newsData: [] };
  },
  computed: () => {
    mapGetters(["allNews", "tenFirstNewRecords"]);
  },

  methods: {
    ...mapActions(["fetchNews"]),
    passDataToDataObject(data: []) {
      return data;
    },
    test() {
      console.log("test");
    }
  },

  created() {
    console.log(Store);
    this.fetchNews();
    // let newsData = this.$store.state.news.newsData;
    // console.log(newsData);
    // this.newsData = newsData;

    // function filterData(newsItem: object, index: number) {
    //   if (index < 10) {
    //     return newsItem;
    //   }
    // }

    // newsData = newsData.filter(filterData);

    // this.newsData = newsData;
  }
});
</script>

<style scoped></style>
