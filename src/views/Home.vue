<template>
  <div class="home">
    <!-- <div>{{ records }}</div> -->
    <!-- <div v-for="tenFirstNewRecords in this.records" :key="tenFirstNewRecords.title">
      <div>{{ newsItem.title }}ss</div>
    </div>-->
  </div>
</template>

<script lang="ts">
console.log("hi");

// import store from "../store";
import { Vue, Component } from "vue-property-decorator";
// import { getModule } from "vuex-module-decorators";
// import MyModule from "@/store/modules/news";

// import store from "../store/index";
// import { getModule } from "vuex-module-decorators";

// console.log("hi");
// import store from "../store/index";
// import news from "../store/modules/news";

// const postsModule = getModule(news);
// const posts = postsModule.news;

// console.log(posts);

@Component

// ({ computed: {mapGetters(['foo']})})
export default class Home extends Vue {
  records = [];

  // get newsData() {
  //   return "sss";
  // }
  // async mounted() {
  //   console.log("mounted");
  //   await news.fetchNews();

  // console.log(news.newsData, "newssdatsaAA");
  // store.dispatch("fetchNews");
  // }

  // test() {
  //   // console.log(news.actions);
  // }
  // mounted() {
  //   console.log("hi");

  //   const url: string =
  //     "http://newsapi.org/v2/top-headlines?" +
  //     "country=au&" +
  //     "apiKey=771f495b60b94bfabf9a9800d4996456";
  //   const req = new Request(url);
  //   fetch(req)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const json = JSON.stringify(data);
  //       console.log(json);
  //     });
  // }
}

// import { mapGetters, mapActions } from "vuex";
// import Vue from "vue";
// import { Store } from "vuex";

// // @ is an alias to /src

// export default Vue.extend({
//   name: "Home",
//   data: function() {
//     return { newsData: [] };
//   },
//   computed: () => {
//     mapGetters(["allNews", "tenFirstNewRecords"]);
//   },

//   methods: {
//     ...mapActions(["fetchNews"]),
//     passDataToDataObject(data: []) {
//       return data;
//     },
//     test() {
//       console.log("test");
//     }
//   },

//   created() {
//     console.log(Store);
//     this.fetchNews();
//     // let newsData = this.$store.state.news.newsData;
//     // console.log(newsData);
//     // this.newsData = newsData;

//     // function filterData(newsItem: object, index: number) {
//     //   if (index < 10) {
//     //     return newsItem;
//     //   }
//     // }

//     // newsData = newsData.filter(filterData);

//     // this.newsData = newsData;
//   }
// });
</script>

<style scoped></style>
