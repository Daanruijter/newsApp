<template>
  <div class="newsfooter-container">
    <div v-for="route in routes" :key="route.name" class="newsfooter-routes">
      <div>
        <router-link v-if="route" :to="route.path">{{
          route.name
        }}</router-link>
      </div>
      <div class="home" v-if="route.name === 'DetailsPage'">
        <div :key="item.title" v-for="(item, index) in newsData">
          <router-link
            :to="{ name: 'DetailsPage', params: { title: item.title } }"
            ><div
              @click="triggerDetailPageToReload(item.title)"
              v-if="index < 10"
              class="title"
            >
              {{ item.title }}
            </div></router-link
          >
        </div>
      </div>
    </div>
  </div>

  <!-- v-for="(newsItem, index) in this.newsDataToDisplay" -->
</template>

<script lang="ts">
import route from "../router/index";
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import DetailsPage from "../views/DetailsPage.vue";
import NewsItemType from "../interfacesforapp";
import { bus } from "../main";

// import news from "../store/modules/news";

// interface Routes {

// }

@Component
export default class NewsFooter extends Vue {
  @Prop() private msg!: string;
  routes: RouteConfig[] | undefined = [];
  newsData: NewsItemType[] = [];
  router = new VueRouter({
    routes: [
      // dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage },
    ],
  });

  mounted() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    this.routes = route.options.routes;
    console.log(this.routes);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // route.options.routes!.map((item) => {
    //   console.log(item);
    // });
  }

  get fetchNews() {
    console.log("kjk");
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    return null;
  }

  //add the news source if it's not shown
  addNewsSource(): void {
    let newsDataFiltered = this.newsData.filter(
      (item: NewsItemType, index: number) => {
        return index < 10;
      }
    );
    newsDataFiltered = newsDataFiltered.map((item: NewsItemType) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        !item.title.includes(item.source.name!) &&
        item.source.name !== null
      ) {
        item.title = item.title + " - " + item.source.name;
      }
      return item;
    });
    this.newsData = newsDataFiltered;
  }

  //if a user clicks an item below the header "details page" in de footer, make sure that the details page gets rerendendered with the title where a user clicked on

  triggerDetailPageToReload(item: string) {
    bus.$emit("triggerdetailspagereload", item);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newsfooter-container {
  background-color: black;
}

.home {
  color: white;
}

.title {
  font-size: 75%;
  text-align: left;
  padding: 2%;

  color: white;
}
</style>
