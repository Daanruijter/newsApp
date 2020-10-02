<template>
  <div id="app">
    <div class="app-container">
      <div class="app-newsmenu">
        <NewsMenu />
      </div>
      <div class="app-main">
        <main>
          <router-view />
        </main>
      </div>
      <div class="app-newsfooter">
        <NewsFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import NewsMenu from "@/components/NewsMenu.vue";
import NewsFooter from "@/components/NewsFooter.vue";
import DetailsPage from "@/views/DetailsPage.vue";

@Component({
  components: { NewsMenu, NewsFooter, DetailsPage },
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
  height: 100vw;
}

.app-newsmenu {
  grid-row-start: 1;
  grid-row-end: 2;
  height: 100%;
}
.app-main {
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 3;
}
.app-newsfooter {
  grid-row-start: 3;
  grid-row-end: 4;
}

.app-container {
  display: grid;
  grid-template-rows: 135px auto auto;
  grid-template-columns: 100%;
  height: 100%;
}
@media only screen and (min-width: 1000px) {
  .app-container {
    display: grid;
    grid-template-rows: 135px auto auto;
    grid-template-columns: 100%;
    height: 100%;
  }
}

@media only screen and (max-width: 700px) {
  .app-container {
    display: grid;
    grid-template-rows: 139px auto auto;
    grid-template-columns: 100%;
    height: 100%;
  }
}
</style>
