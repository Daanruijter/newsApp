/* eslint-disable @typescript-eslint/no-non-null-assertion */
<template>
  <div class="newsfooter-container">
    <div>
      <div class="newsfooter-sitemap-header">
        <h2>Sitemap</h2>
      </div>

      <div v-for="route in routes" :key="route.name" class="newsfooter-routes">
        <div
          @click="doStuffOnCLickInSitemap($event)"
          class="newsfooter-individual-routes"
        >
          <router-link v-if="route.name !== 'Details'" :to="route.path">
            {{ route.name }}
          </router-link>
          <router-link
            v-if="route.name === 'Details' && newsData[0] !== undefined"
            :to="{ name: 'DetailsPage', params: { title: newsData[0].title } }"
            >{{ route.name }}</router-link
          >
        </div>
        <div class="newsfooter-detilspage-flexer">
          <div class="newsfooter-detailspage" v-if="route.name === 'Details'">
            <div :key="item.title" v-for="(item, index) in newsData">
              <router-link
                class="newsfooter-links"
                :to="{ name: 'DetailsPage', params: { title: item.title } }"
              >
                <div
                  @click="triggerDetailPageToReload(item.title)"
                  v-if="index < 10"
                  class="newsfooter-title"
                  @mouseover="mouseEnter(index)"
                  @mouseout="mouseLeave(index)"
                  :class="{ hovering: item.linksNewsFooterHovered }"
                >
                  {{ item.title }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import route from "../router/index";
import { Component, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import DetailsPage from "../views/DetailsPage.vue";
import NewsItemType from "../interfacesforapp";
import { bus } from "../main";
import news from "../store/modules/news";

export interface FetchNews {
  fetchBase: string;
  typeOfFetchBase: string;
}

@Component
export default class NewsFooter extends Vue {
  routes: RouteConfig[] | undefined = [];
  newsData: NewsItemType[] = [];
  router = new VueRouter({
    routes: [
      // dynamic segments start with a colon
      { path: "/details /:id", component: DetailsPage },
    ],
  });
  indexOfHoveredLink: number | null = null;

  mounted() {
    this.getData();

    bus.$on("triggerDataToFetchInFooter", () => {
      this.getData();
    });

    //change the newsData variable on changes in the random page component
    bus.$on("setNewsDataInNewsFooter", (data: NewsItemType[]) => {
      this.newsData = data;
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const routeNames = route.options.routes!;
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (i = 0; i < routeNames.length!; i++) {
      //make sure that the name Page is removed from the string
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (routeNames[i].name!.includes("Page")) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = routeNames[i].name!.replace("Page", "");
        routeNames[i].name = res;
      }
    }

    this.routes = routeNames;
  }

  //get data from localStorage
  getData() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newsDataFromLocalStorage = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.getItem("newsData")!
    );

    this.newsData = newsDataFromLocalStorage;
  }

  //if a user clicks an item below the header "details page" in de footer, make sure that the details page gets rerendendered with the title where a user clicked on

  triggerDetailPageToReload(item: string) {
    bus.$emit("triggerdetailspagereload", item);
  }
  //if a user clicks on the categories button, open the categories div in
  async doStuffOnCLickInSitemap(event: Event) {
    const routeText = (event.target as HTMLAnchorElement).text;

    //open the categories div if a user hits the categories button
    if (routeText.includes("Categories")) {
      bus.$emit("openCategoriesDivFromNewsFooter");
    }
    if (
      routeText.includes("Home") ||
      routeText.includes("Random") ||
      routeText.includes("Details")
    ) {
      bus.$emit("closeCategoriesDivFromNewsFooter");
    }

    //load the first item of the details page by triggering the load function in the DetailsPage component
    if (routeText.includes("Details")) {
      const newsCategoryFetchObject = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fetchBase: localStorage.getItem("fetchBase")!,

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        typeOfFetchBase: localStorage.getItem("typeOfFetchBase")!,
      };

      await news.fetchNewsQuery(newsCategoryFetchObject);

      const title = this.$store.getters["vuexModuleDecorators/newsDataModule"]
        .queriedNewsItemsGetter[0].title;

      this.newsData = this.$store.getters[
        "vuexModuleDecorators/newsDataModule"
      ].queriedNewsItemsGetter;

      bus.$emit("loadFirstElementOfDetailsPage", title);
    }

    if (routeText.includes("Random")) {
      bus.$emit("triggerRandomPageLogic");
    }
  }
  mouseEnter(index: number | null): void {
    this.indexOfHoveredLink = index;

    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.newsData[index]!;

      item.linksNewsFooterHovered = !item.linksNewsFooterHovered;

      this.$set(this.newsData, index, item);
    }
  }
  mouseLeave(index: number | null): void {
    if (index !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const item = this.newsData[index]!;

      item.linksNewsFooterHovered = !item.linksNewsFooterHovered;

      this.$set(this.newsData, index, item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//general rules

a.router-link-exact-active {
  color: #42b983 !important;
}

.newsfooter-sitemap-header,
.home {
  color: white;
}

a {
  text-decoration: none;
  color: white;
}

.hovering {
  color: blue !important;
}

// bigger screens
@media only screen and (min-width: 1000px) {
  .newsfooter-container {
    background-color: black;
    padding-top: 1%;
    margin-left: 15%;
    width: 70%;
    margin-bottom: 2%;
  }

  .newsfooter-detilspage-flexer {
    display: flex;
    justify-content: center;
  }

  .newsfooter-title {
    font-size: 100%;
    text-align: left;
    padding-top: 0.7%;
    padding-bottom: 0.7%;
    margin-left: 1%;
    color: white;
  }

  .newsfooter-routes a {
    font-size: 110%;
    font-weight: bold;
  }

  .newsfooter-detailspage a {
    font-weight: 100;
    font-size: 95%;
  }
  .newsfooter-detailspage {
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    color: red;
  }
}

// medium screens
@media only screen and (min-width: 701px) and (max-width: 999px) {
  .newsfooter-container {
    background-color: black;
    padding-top: 1%;
    margin-left: 15%;
    width: 70%;
    margin-bottom: 2%;
  }

  .newsfooter-title {
    font-size: 100%;
    text-align: left;
    padding: 0.7%;
    margin-left: 1%;
    color: white;
  }

  .newsfooter-routes a {
    font-size: 110%;
    font-weight: bold;
  }

  .newsfooter-detailspage a {
    font-weight: 100;
    font-size: 95%;
    text-align: left;
  }
  .newsfooter-detailspage {
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    color: red;
  }
}

@media only screen and (max-width: 700px) {
  .newsfooter-container {
    background-color: black;
    padding-top: 2%;
    margin-bottom: 2%;
  }

  .newsfooter-routes a {
    font-size: 110%;
    font-weight: bold;
  }

  .newsfooter-detailspage a {
    font-weight: 100;
    font-size: 100%;
    text-align: left;
  }

  .newsfooter-title {
    text-align: left;
    padding: 2%;
    color: white;
  }

  .newsfooter-detailspage {
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    color: red;
  }
}
</style>
