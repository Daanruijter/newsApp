<template>
  <div id="app">
    <div id="nav">
      <NewsMenu />
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>-->
    </div>

    <router-view />
    <!-- <DetailsPage /> -->
    <NewsFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";
import news from "./store/modules/news";

@Component({
  components: { NewsMenu, NewsFooter, DetailsPage },
})
export default class App extends Vue {
  async mounted() {
    console.log("mounted");
    await news.fetchNews();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
