/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="newsfooter-container">
    <div class="newsfooter-sitemap-header"><h2>Sitemap</h2></div>

    <div v-for="route in routes" :key="route.name" class="newsfooter-routes">
      <div
        @click="doStuffOnCLickInSitemap($event)"
        class="newsfooter-individual-routes"
      >
        <router-link v-if="route" :to="route.path">{{
          route.name
        }}</router-link>
      </div>
      <div class="newsfooter-detailspage" v-if="route.name === 'Details'">
        <div :key="item.title" v-for="(item, index) in newsData">
          <router-link
            class="newsfooter-links"
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
    console.log("newsfooter mounted");
    this.getNewsDataFromVuexMethod();

    bus.$on("triggerDataToFetchInFooter", () => {
      console.log("fecthdatainNEWSFOOTER");
      this.getNewsDataFromVuexMethod();
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routeNames = route.options.routes!;
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (i = 0; i < routeNames.length!; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (routeNames[i].name!.includes("Page")) {
        //make sure that the name Page is removed from the string

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = routeNames[i].name!.replace("Page", "");
        routeNames[i].name = res;
      }
    }

    this.routes = routeNames;
    console.log(this.routes[1].name);
  }

  get getNewsDataFromVuex() {
    console.log("kjk");
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
    return null;
  }

  getNewsDataFromVuexMethod() {
    this.newsData = this.$store.getters[
      "vuexModuleDecorators/newsDataModule"
    ].queriedNewsItemsGetter;
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
  //if a user clicks on the categories button, open the categories div in
  doStuffOnCLickInSitemap(event: Event): void {
    const routeText = (event.target as HTMLAnchorElement).text;

    //open the categories div if a user hits the categories button
    if (routeText === "Categories") {
      bus.$emit("openCategoriesDivFromNewsFooter");
    }
    if (
      routeText === "Home" ||
      routeText === "Random" ||
      routeText === "Details"
    ) {
      bus.$emit("closeCategoriesDivFromNewsFooter");
    }

    //load the first item of the details page by triggering the load function in the DetailsPage component
    if (routeText === "Details") {
      bus.$emit(
        "loadFirstElementOfDetailsPage" //hier titel doorgeven//..
      );
    }

    //trigger the addNewsItem function on the random component
    if (routeText === "Random") {
      bus.$emit(
        "triggerAddNewsItem" //hier titel doorgeven//..
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newsfooter-container {
  background-color: black;
  padding-top: 2%;
}
.newsfooter-sitemap-header {
  color: white;
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

a {
  text-decoration: none;
  color: white;
}

.newsfooter-detailspage {
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  color: red;
}
</style>
