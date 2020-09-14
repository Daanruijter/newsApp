<template>
  <div id="app">
    <div id="nav">
      <hr />
      <div class="description">World news</div>
      <div class="description">Your everyday headlines</div>
      <hr />
      <NewsMenu />
    </div>
    <main>
      <router-view />
    </main>

    <NewsFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";

@Component({
  components: { NewsMenu, NewsFooter, DetailsPage }
})
export default class App extends Vue {}
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
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 200;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  @font-face {
    font-family: "steelfish";
    src: local("steelfish"),
      url(./steelfishfont/steelfishrg.ttf) format("truetype");
  }
  .description {
    font-family: "steelfish";
    font-size: 20px;
  }
}
</style>
